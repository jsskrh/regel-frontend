
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useGetAccountQuery,
  useUpdateProfileMutation,
} from "@/lib/features/account/accountApi";
import { UpdateProfileDto } from "@/lib/features/account/types";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  company: z.string().optional(),
});

export function ProfileForm() {
  const { data: user, isLoading: isUserLoading } = useGetAccountQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const form = useForm<UpdateProfileDto>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      company: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        company: user.company || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (data: UpdateProfileDto) => {
    try {
      await updateProfile({ updateProfileDto: data }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.data?.message || "Failed to update profile.");
    }
  };

  if (isUserLoading) {
    return <p>Loading profile...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your personal information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
