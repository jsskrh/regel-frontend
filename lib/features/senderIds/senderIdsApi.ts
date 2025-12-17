import { apiSlice } from "../../api/apiSlice";
import { RequestSenderIdDto, UpdateSenderIdDto, SenderIdRequest, SenderIdStatus } from "./types";
import { PaginatedResponse } from "@/lib/utils/types"; // Assuming SenderId requests are paginated as well

export const senderIdsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    findAllForUser: build.query<
      FindAllForUserApiResponse,
      FindAllForUserApiArg
    >({
      query: () => ({ url: `/sender-ids` }),
    }),

    requestSenderId: build.mutation<
      RequestSenderIdApiResponse,
      RequestSenderIdApiArg
    >({
      query: (queryArg) => ({
        url: `/sender-ids/request`,
        method: "POST",
        body: queryArg.requestSenderIdDto,
      }),
      invalidatesTags: ["SenderIds"], // Invalidate all sender IDs after a new request
    }),

    findAll: build.query<FindAllApiResponse, FindAllApiArg>({
      query: () => ({ url: `/sender-ids/all` }),
      providesTags: ["SenderIds"],
    }),

    updateSenderIdStatus: build.mutation<
      UpdateSenderIdStatusApiResponse,
      UpdateSenderIdStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/sender-ids/${queryArg.id}/status`,
        method: "PATCH",
        body: queryArg.updateSenderIdDto,
      }),
      invalidatesTags: ["SenderIds"], // Invalidate all sender IDs after status update
    }),
  }),
});

export const {
  useFindAllForUserQuery,
  useRequestSenderIdMutation,
  useFindAllQuery,
  useUpdateSenderIdStatusMutation,
} = senderIdsApi;

export type FindAllForUserApiResponse = SenderIdRequest[];
export type FindAllForUserApiArg = void;
export type RequestSenderIdApiResponse = unknown; // Assuming it returns a simple success message
export type RequestSenderIdApiArg = {
  requestSenderIdDto: RequestSenderIdDto;
};
export type FindAllApiResponse = SenderIdRequest[];
export type FindAllApiArg = void;
export type UpdateSenderIdStatusApiResponse = SenderIdRequest; // Returns the updated request
export type UpdateSenderIdStatusApiArg = {
  id: string;
  updateSenderIdDto: UpdateSenderIdDto;
};