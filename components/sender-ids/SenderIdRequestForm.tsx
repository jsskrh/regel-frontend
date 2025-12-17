
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRequestSenderIdMutation } from "@/lib/features/senderIds/senderIdsApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useState } from "react";

const senderIdSchema = z.object({
  senderId: z.string().min(3, "Sender ID must be at least 3 characters").max(11, "Sender ID must be at most 11 characters"),
});

export function SenderIdRequestForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [requestSenderId, { isLoading }] = useRequestSenderIdMutation();

  const form = useForm({
    resolver: zodResolver(senderIdSchema),
    defaultValues: { senderId: "" },
  });

  const onSubmit = async (data: z.infer<typeof senderIdSchema>) => {
    try {
      await requestSenderId({ requestSenderIdDto: data }).unwrap();
      toast.success("Sender ID request submitted successfully!");
      form.reset();
      setIsOpen(false);
    } catch (error) {
      toast.error(error.data?.message || "Failed to request sender ID.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Request Sender ID</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request New Sender ID</DialogTitle>
          <DialogDescription>
            Enter the sender ID you would like to request.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="senderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sender ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., MyCompany" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Request"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
