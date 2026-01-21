"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useCreateContactListMutation,
  useFindAllContactsQuery,
  useFindContactListByIdQuery,
  useUpdateContactListMutation,
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
import { MultiSelect } from "@/components/common/MultiSelect";
import { toast } from "sonner";

const groupSchema = z.object({
  name: z.string().min(2, "Name is required").max(30),
  description: z.string().optional(),
  contacts: z.array(z.string()).optional(),
});

const GroupForm = ({ groupId }: { groupId?: string }) => {
  const router = useRouter();
  const isEdit = !!groupId;

  const { data: contactsData, isLoading: isLoadingContacts } = useFindAllContactsQuery();
  const { data: groupData, isLoading: isLoadingGroup } = useFindContactListByIdQuery(
    { id: groupId! },
    { skip: !isEdit }
  );

  const [createGroup, { isLoading: isCreating }] = useCreateContactListMutation();
  const [updateGroup, { isLoading: isUpdating }] = useUpdateContactListMutation();

  const form = useForm({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: "",
      description: "",
      contacts: [],
    },
  });

  useEffect(() => {
    if (isEdit && groupData) {
      form.reset({
        name: groupData.name || "",
        description: groupData.description || "",
        contacts: groupData.contacts || [],
      });
    }
  }, [groupData, form, isEdit]);

  const contactOptions =
    contactsData?.map((contact) => {
      const fullName = `${contact.firstName || ""} ${contact.lastName || ""}`.trim();
      return {
        label: fullName || contact.phoneNumber,
        value: contact._id,
      };
    }) || [];

  const onSubmit = async (data: z.infer<typeof groupSchema>) => {
    try {
      if (isEdit) {
        await updateGroup({ id: groupId!, updateContactListDto: data }).unwrap();
        toast.success("Group updated successfully!");
      } else {
        await createGroup({ createContactListDto: data }).unwrap();
        toast.success("Group created successfully!");
      }
      router.push("/contacts/groups");
    } catch (error) {
      toast.error(error.data?.message || "An error occurred.");
    }
  };

  if (isLoadingContacts || isLoadingGroup) {
    return <p>Loading...</p>;
  }

  return (
    <Card>
      <CardContent className="p-4 lg:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid gap-2 relative">
                    <FormLabel className="text-sm font-medium leading-[145%]">
                      Group name <span>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Marketing Leads" {...field} />
                    </FormControl>
                    <FormMessage className="absolute -bottom-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grid gap-2 relative">
                    <FormLabel className="text-sm font-medium leading-[145%]">
                      Short description
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="A short description of the group" {...field} />
                    </FormControl>
                    <FormMessage className="absolute -bottom-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contacts"
                render={({ field }) => (
                  <FormItem className="grid gap-2 relative col-span-2">
                    <FormLabel className="text-sm font-medium leading-[145%]">
                      Add members
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={contactOptions}
                        onValueChange={field.onChange}
                        value={field.value}
                        placeholder="Select contacts"
                        variant="default"
                        animation={2}
                        maxCount={3}
                      />
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
                  ? "Update group"
                  : "Create group"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GroupForm;