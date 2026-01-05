"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useSendSingleSmsMutation,
  useCreateCampaignMutation,
} from "@/lib/features/messaging/messagingApi";
import { useFindAllContactListsQuery } from "@/lib/features/contacts/contactsApi";
import { useGetAccountQuery } from "@/lib/features/account/accountApi";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BalanceInfo from "@/components/common/BalanceInfo";
import { useEffect, useState } from "react";

const PER_SMS_COST = 6;

const singleSmsSchema = z.object({
  to: z.string().min(1, "Recipient phone number is required."),
  from: z.string().optional(),
  message: z.string().min(1, "Message is required."),
});

const campaignSchema = z.object({
  name: z.string().min(1, "Campaign name is required."),
  from: z.string().optional(),
  message: z.string().min(1, "Message is required."),
  contactListId: z.string().optional(),
  phoneNumbers: z.string().optional(), // Textarea for comma-separated numbers
});

export function SmsForm() {
  const [activeTab, setActiveTab] = useState("single");
  const [smsCost, setSmsCost] = useState(PER_SMS_COST);

  const [sendSingleSms, { isLoading: isSendingSingle }] =
    useSendSingleSmsMutation();
  const [createCampaign, { isLoading: isCreatingCampaign }] =
    useCreateCampaignMutation();
  const { data: contactLists = [] } = useFindAllContactListsQuery();
  const { data: accountDetails } = useGetAccountQuery();

  const singleSmsForm = useForm({
    resolver: zodResolver(singleSmsSchema),
    defaultValues: { to: "", from: "", message: "" },
  });

  const campaignForm = useForm({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: "",
      from: "",
      message: "",
      contactListId: "",
      phoneNumbers: "",
    },
  });

  const campaignRecipients = campaignForm.watch("phoneNumbers");
  const campaignContactList = campaignForm.watch("contactListId");

  useEffect(() => {
    if (activeTab === "single") {
      setSmsCost(PER_SMS_COST);
    } else {
      const manualRecipients =
        campaignRecipients?.split(",").filter(Boolean).length || 0;
      const list = contactLists.find((cl) => cl._id === campaignContactList);
      const listRecipients = list?.contacts.length || 0;
      setSmsCost((manualRecipients + listRecipients) * PER_SMS_COST);
    }
  }, [activeTab, campaignRecipients, campaignContactList, contactLists]);

  const onSingleSmsSubmit = async (data: z.infer<typeof singleSmsSchema>) => {
    try {
      await sendSingleSms({ sendSingleSmsDto: data }).unwrap();
      toast.success("SMS sent successfully!");
      singleSmsForm.reset();
    } catch (error) {
      toast.error(error.data?.message || "Failed to send SMS.");
    }
  };

  const onCampaignSubmit = async (data: z.infer<typeof campaignSchema>) => {
    try {
      const phoneNumbers =
        data.phoneNumbers
          ?.split(",")
          .map((s) => s.trim())
          .filter(Boolean) || [];
      await createCampaign({
        createCampaignDto: { ...data, phoneNumbers },
      }).unwrap();
      toast.success("Campaign created successfully!");
      campaignForm.reset();
    } catch (error) {
      toast.error(error.data?.message || "Failed to create campaign.");
    }
  };

  const contactListOptions = contactLists.map((list) => ({
    label: list.name,
    value: list._id,
  }));

  return (
    <div>
      <BalanceInfo
        score={smsCost}
        maxScore={accountDetails?.balance}
        amount={accountDetails?.balance}
      />
      <Tabs defaultValue="single" onValueChange={setActiveTab} className="mt-6">
        <TabsList>
          <TabsTrigger value="single">Single SMS</TabsTrigger>
          <TabsTrigger value="campaign">Campaign</TabsTrigger>
        </TabsList>

        <TabsContent value="single">
          <Card>
            <CardContent className="p-4">
              <Form {...singleSmsForm}>
                <form
                  onSubmit={singleSmsForm.handleSubmit(onSingleSmsSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={singleSmsForm.control}
                    name="to"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipient</FormLabel>
                        <FormControl>
                          <Input placeholder="+234..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={singleSmsForm.control}
                    name="from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sender ID (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Sender ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={singleSmsForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSendingSingle}>
                    {isSendingSingle ? "Sending..." : "Send SMS"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaign">
          <Card>
            <CardContent className="p-4">
              <Form {...campaignForm}>
                <form
                  onSubmit={campaignForm.handleSubmit(onCampaignSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={campaignForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Summer Promo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={campaignForm.control}
                    name="from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sender ID (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Sender ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={campaignForm.control}
                    name="contactListId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact List</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a contact list" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {contactLists.map((list) => (
                              <SelectItem key={list._id} value={list._id}>
                                {list.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={campaignForm.control}
                    name="phoneNumbers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Or Enter Phone Numbers</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter numbers separated by commas"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={campaignForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isCreatingCampaign}>
                    {isCreatingCampaign ? "Creating..." : "Create Campaign"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
