import { apiSlice } from "../../api/apiSlice";
import { RequestSenderIdDto, UpdateSenderIdDto } from "./types";

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
    }),

    findAll: build.query<FindAllApiResponse, FindAllApiArg>({
      query: () => ({ url: `/sender-ids/all` }),
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
    }),
  }),
});

export const {
  useFindAllForUserQuery,
  useRequestSenderIdMutation,
  useFindAllQuery,
  useUpdateSenderIdStatusMutation,
} = senderIdsApi;

export type FindAllForUserApiResponse = unknown;
export type FindAllForUserApiArg = void;
export type RequestSenderIdApiResponse = unknown;
export type RequestSenderIdApiArg = {
  requestSenderIdDto: RequestSenderIdDto;
};
export type FindAllApiResponse = unknown;
export type FindAllApiArg = void;
export type UpdateSenderIdStatusApiResponse = unknown;
export type UpdateSenderIdStatusApiArg = {
  id: string;
  updateSenderIdDto: UpdateSenderIdDto;
};
