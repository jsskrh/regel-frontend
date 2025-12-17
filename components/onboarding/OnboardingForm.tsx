"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useGetOnboardingDetailsQuery,
  useUpdateOnboardingDetailsMutation,
} from "@/lib/features/account/accountApi";
import { UpdateOnboardingDto } from "@/lib/features/account/types";
import { useEffect } from "react";
import { toast } from "sonner";
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
import { FileUpload } from "@/components/common/FileUpload";

const onboardingSchema = z.object({
  company: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  cacDocumentUrl: z.string().url().optional().or(z.literal("")),
  samplePromotionalMessage: z.string().optional(),
  sampleTransactionalMessage: z.string().optional(),
  estimatedMonthlySms: z.number().positive().optional(),
});

export function OnboardingForm() {
  const { data: onboardingDetails, isLoading: isLoadingDetails } =
    useGetOnboardingDetailsQuery();
  const [updateDetails, { isLoading: isUpdating }] =
    useUpdateOnboardingDetailsMutation();

  const form = useForm<UpdateOnboardingDto>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      company: "",
      website: "",
      cacDocumentUrl: "",
      samplePromotionalMessage: "",
      sampleTransactionalMessage: "",
      estimatedMonthlySms: 0,
    },
  });

  useEffect(() => {
    if (onboardingDetails) {
      form.reset(onboardingDetails);
    }
  }, [onboardingDetails, form]);

  const onSubmit = async (data: UpdateOnboardingDto) => {
    try {
      await updateDetails({ updateOnboardingDto: data }).unwrap();
      toast.success("Onboarding details updated successfully!");
    } catch (error) {
      toast.error(error.data?.message || "An error occurred.");
    }
  };

  if (isLoadingDetails) {
    return <p>Loading onboarding details...</p>;
  }

  return (
    <Card className="pt-8">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
                <FormLabel>CAC Document</FormLabel>
                <FileUpload onUploadSuccess={(url) => form.setValue("cacDocumentUrl", url)} />
                {form.watch("cacDocumentUrl") && <p className="text-sm text-green-600">Document uploaded: {form.watch("cacDocumentUrl")}</p>}
                <FormMessage />
            </FormItem>
            <FormField
              control={form.control}
              name="samplePromotionalMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sample Promotional Message</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sampleTransactionalMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sample Transactional Message</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estimatedMonthlySms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Monthly SMS</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}