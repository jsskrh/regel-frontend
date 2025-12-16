"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useCreateContactMutation,
  useFindContactByIdQuery,
  useUpdateContactMutation,
  useFindAllContactListsQuery,
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
import { Combobox } from "@/components/ui/combobox";
import { toast } from "sonner";

const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required").max(50),
  lastName: z.string().min(2, "Last name is required").max(50),
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

  const { data: contactData, isLoading: isContactLoading } =
    useFindContactByIdQuery({ id: contactId! }, { skip: !isEdit });

  const [createContact, { isLoading: isCreating }] = useCreateContactMutation();
  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();

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
      console.error("Error:", error.message);
      toast.error(error.data?.message || "An error occurred.");
    }
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
                      First Name <span>*</span>
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
                      Last Name <span>*</span>
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
            <div className="mt-8 flex justify-end border-t border-t-[#E5E7EB] pt-5">
              <Button
                type="submit"
                size="sm"
                disabled={isCreating || isUpdating}
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
