import { apiSlice } from "../../api/apiSlice";
import {
  CreateCampaignDto,
  SendSingleSmsDto,
  Campaign,
  Message,
} from "./types"; // Changed SingleMessage to Message
import { PaginationQueryDto, PaginatedResponse } from "@/lib/utils/types";

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
      invalidatesTags: ["Campaigns"],
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
      invalidatesTags: ["Messages"], // Invalidate messages after sending a single SMS
    }),

    getCampaigns: build.query<GetCampaignsApiResponse, GetCampaignsApiArg>({
      query: (paginationQuery) => ({
        url: `/admin/campaigns`, // Assuming campaigns are fetched from /admin/campaigns for user
        params: paginationQuery,
      }),
      providesTags: ["Campaigns"],
    }),

    getMessages: build.query<GetMessagesApiResponse, GetMessagesApiArg>({
      query: (paginationQuery) => ({
        url: `/messaging`,
        params: paginationQuery,
      }),
      providesTags: ["Messages"],
    }),
  }),
});

export const {
  useCreateCampaignMutation,
  useSendSingleSmsMutation,
  useGetCampaignsQuery,
  useGetMessagesQuery,
} = messagingApi;

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
export type GetCampaignsApiResponse = PaginatedResponse<Campaign>;
export type GetCampaignsApiArg = PaginationQueryDto;

export type GetMessagesApiResponse = PaginatedResponse<Message>; // Changed SingleMessage to Message
export type GetMessagesApiArg = PaginationQueryDto;
