import { apiSlice } from "../../api/apiSlice";
import { MessageActivityDto } from "./types";

export interface UserSummary {
  balance: number;
  totalMessages: number;
  totalContacts: number;
  totalContactLists: number;
}

export interface MessageActivity {
  date: string;
  Success: number;
  Pending: number;
  Failed: number;
}

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUserSummary: build.query<GetUserSummaryApiResponse, void>({
      query: () => ({ url: `/analytics/summary` }),
    }),
    getMessageActivity: build.query<GetMessageActivityApiResponse, MessageActivityDto>({
      query: (params) => ({
        url: `/analytics/message-activity`,
        params,
      }),
    }),
  }),
});

export const {
  useGetUserSummaryQuery,
  useGetMessageActivityQuery,
} = analyticsApi;

export type GetUserSummaryApiResponse = UserSummary;
export type GetMessageActivityApiResponse = MessageActivity[];