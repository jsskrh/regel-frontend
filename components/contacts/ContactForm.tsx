"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useCreateContactMutation,
  useFindContactByIdQuery,
  useUpdateContactMutation,
  useCreateBulkContactsMutation,
} from "@/lib/features/contacts/contactsApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const contactSchema = z.object({
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
  phoneNumber: z
    .string()
    .min(10, "Phone number is required")
    .max(20)
    .refine((value) => /^\+\d+$/.test(value.trim()), {
      message:
        "Phone number must start with + followed by a country code (e.g., +234...)",
    }),
});

const ContactForm = ({ contactId }: { contactId?: string }) => {
  const router = useRouter();
  const isEdit = !!contactId;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: contactData, isLoading: isContactLoading } =
    useFindContactByIdQuery({ id: contactId! }, { skip: !isEdit });

  const [createContact, { isLoading: isCreating }] = useCreateContactMutation();
  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();
  const [createBulkContacts, { isLoading: isBulkCreating }] =
    useCreateBulkContactsMutation();

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    if (isEdit && contactData) {
      form.reset({
        firstName: contactData.firstName || "",
        lastName: contactData.lastName || "",
        phoneNumber: contactData.phoneNumber || "",
      });
    }
  }, [contactData, form, isEdit]);

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    try {
      if (isEdit) {
        await updateContact({
          id: contactId!,
          updateContactDto: data,
        }).unwrap();
        toast.success("Contact updated successfully!");
      } else {
        await createContact({ createContactDto: data }).unwrap();
        toast.success("Contact created successfully!");
      }
      router.push("/contacts");
    } catch (error) {
      console.error("Error:", error?.message);
      toast.error(error?.data?.message || "An error occurred.");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      toast.error("Please upload a valid CSV file.");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target?.result as string;
      if (!text) {
        toast.error("Failed to read file.");
        setIsUploading(false);
        return;
      }

      const lines = text.split(/\r\n|\n/).filter((line) => line.trim() !== "");
      const contacts = lines.map((line) => {
        const [phoneNumber, firstName, lastName] = line.split(",").map((s) => s.trim());
        return {
          phoneNumber,
          firstName: firstName || undefined,
          lastName: lastName || undefined,
        };
      });

      // Simple validation for phone numbers
      const validContacts = contacts.filter((c) =>
        /^\+\d+$/.test(c.phoneNumber)
      );

      if (validContacts.length === 0) {
        toast.error("No valid contacts found in the CSV. Ensure phone numbers start with + and country code.");
        setIsUploading(false);
        return;
      }

      try {
        await createBulkContacts({
          createBulkContactsDto: { contacts: validContacts },
        }).unwrap();
        toast.success(`${validContacts.length} contacts uploaded successfully!`);
        router.push("/contacts");
      } catch (error) {
        console.error("Bulk upload error:", error);
        toast.error(error?.data?.message || "Failed to upload contacts.");
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    };

    reader.onerror = () => {
      toast.error("Error reading file.");
      setIsUploading(false);
    };

    reader.readAsText(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  if (isContactLoading) {
    return <p>Loading contact...</p>;
  }

  return (
    <Card>
      <CardContent className="p-4 lg:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid gap-2 relative">
                    <FormLabel className="text-sm font-medium leading-[145%]">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage className="absolute -bottom-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="grid gap-2 relative">
                    <FormLabel className="text-sm font-medium leading-[145%]">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage className="absolute -bottom-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="grid gap-2 relative">
                    <FormLabel className="text-sm font-medium leading-[145%]">
                      Phone number <span>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. +2341234567890" {...field} />
                    </FormControl>
                    <FormMessage className="absolute -bottom-3" />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-8 flex justify-end border-t border-t-[#E5E7EB] pt-5 gap-4">
              {!isEdit && (
                <>
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isUploading || isCreating || isBulkCreating}
                    onClick={triggerFileUpload}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    {isUploading ? "Uploading..." : "Upload CSV"}
                  </Button>
                </>
              )}
              <Button
                type="submit"
                size="sm"
                disabled={isCreating || isUpdating || isUploading || isBulkCreating}
                className="bg-[#12533A] rounded-lg text-white text-sm font-medium"
              >
                {isCreating || isUpdating
                  ? "Saving..."
                  : isEdit
                    ? "Update contact"
                    : "Create contact"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
