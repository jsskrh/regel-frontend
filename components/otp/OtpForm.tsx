
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSendOtpMutation } from "@/lib/features/otp/otpApi";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { SuccessfulPopup } from "@/components/SuccessfulPopup"; // Import the new popup component
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAccountQuery } from "@/lib/features/account/accountApi"; // To get balance

const PER_OTP_COST = 8; // Assuming 8 naira per SMS

const otpSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number is required")
    .max(20)
    .refine((value) => /^\+\d+$/.test(value.trim()), {
      message: "Phone number must start with + followed by a country code.",
    }),
  messageTemplate: z
    .string()
    .min(1, "Message template is required")
    .refine((value) => value.includes("<OTP>"), {
      message: "Message template must include <OTP> placeholder.",
    }),
});

export default function OtpForm() {
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const { data: accountDetails } = useGetAccountQuery(); // Fetch account details for balance
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      phoneNumber: "",
      messageTemplate: "Your OTP is <OTP>",
    },
  });

  const onSubmit = async (data: z.infer<typeof otpSchema>) => {
    try {
      await sendOtp({ sendOtpDto: data }).unwrap();
      toast.success("OTP sent successfully!");
      setIsPopupOpen(true);
      // Optionally reset form
      form.reset({
        phoneNumber: "",
        messageTemplate: "Your OTP is <OTP>",
      });
    } catch (error) {
      toast.error(error.data?.message || "Failed to send OTP.");
    }
  };

  return (
    <>
      <Card>
        <CardContent className="p-4 lg:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+234..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="messageTemplate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message Template</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <SuccessfulPopup
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          router.push("/sms"); // Redirect to SMS history after closing popup
        }}
        title="OTP Sent!"
        message="Your One-Time Password was sent successfully."
        buttonTitle="Go to SMS History"
        balance={accountDetails?.balance}
        smsCost={PER_OTP_COST}
      />
    </>
  );
}
