import { apiSlice } from "../../api/apiSlice";

export const messagingApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createCampaign: build.mutation<
      CreateCampaignApiResponse,
      CreateCampaignApiArg
    >({
      query: (queryArg) => ({
        url: `/messaging/campaigns`,
        method: "POST",
        body: queryArg.createCampaignDto,
      }),
    }),

    sendSingleSms: build.mutation<
      SendSingleSmsApiResponse,
      SendSingleSmsApiArg
    >({
      query: (queryArg) => ({
        url: `/messaging/sms/send-single`,
        method: "POST",
        body: queryArg.sendSingleSmsDto,
      }),
    }),
  }),
});

export const { useCreateCampaignMutation, useSendSingleSmsMutation } =
  messagingApi;

export type CreateCampaignApiResponse =
  /** status 201 Campaign created successfully and queued for processing. */ {
    message?: string;
    campaignId?: string;
  };
export type CreateCampaignApiArg = {
  createCampaignDto: CreateCampaignDto;
};
export type SendSingleSmsApiResponse =
  /** status 200 Single SMS sent successfully. */ {
    message?: string;
    messageId?: string;
    status?: string;
  };
export type SendSingleSmsApiArg = {
  sendSingleSmsDto: SendSingleSmsDto;
};
export type CreateCampaignDto = {
  /** The name of the campaign */
  name: string;
  /** The message content of the campaign */
  message: string;
  /** The ID of an existing contact list to send messages to (optional) */
  contactListId?: string;
  /** An array of phone numbers to send messages to (optional, overrides contactListId) */
  phoneNumbers?: string[];
};
export type SendSingleSmsDto = {
  /** The recipient's phone number in E.164 format */
  to: string;
  /** The content of the SMS message */
  message: string;
  /** The sender ID (optional) */
  from?: string;
};
