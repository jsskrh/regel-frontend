import { apiSlice } from "../../api/apiSlice";
import { UpdateOnboardingDto } from "./types";
import { Transaction } from "../payments/types";
import { PaginatedResponse } from "@/lib/utils/types";

export interface User {
  _id: string;
  name: string;
  email: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  role: string;
  apiKeyId?: string;
  company?: string;
  website?: string;
  cacDocumentUrl?: string;
  samplePromotionalMessage?: string;
  sampleTransactionalMessage?: string;
  estimatedMonthlySms?: number;
}

export interface GetTransactionsApiResponse {
    data: Transaction[];
    total: number;
}

export const accountApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAccount: build.query<User, void>({
      query: () => ({ url: `/account/profile` }),
      providesTags: ["Account"],
    }),
    getOnboardingDetails: build.query<User, void>({
      query: () => ({ url: `/account/onboarding` }),
      providesTags: ["Onboarding"],
    }),
    updateOnboardingDetails: build.mutation<void, { updateOnboardingDto: UpdateOnboardingDto }>({
      query: (queryArg) => ({
        url: `/account/onboarding`,
        method: "PATCH",
        body: queryArg.updateOnboardingDto,
      }),
      invalidatesTags: ["Onboarding", "Account"],
    }),
    generateUploadUrl: build.query<
      GenerateUploadUrlApiResponse,
      GenerateUploadUrlApiArg
    >({
      query: (queryArg) => ({
        url: `/account/generate-upload-url`,
        params: {
          fileName: queryArg.fileName,
          fileType: queryArg.fileType,
        },
      }),
    }),
    getTransactions: build.query<
      GetTransactionsApiResponse,
      GetTransactionsApiArg
    >({
      query: () => ({ url: `/account/transactions` }),
      providesTags: ["Transactions"],
    }),
    generateApiKey: build.mutation<
      GenerateApiKeyApiResponse,
      GenerateApiKeyApiArg
    >({
      query: () => ({ url: `/account/api-key`, method: "POST" }),
    }),
  }),
});

export const {
  useGetAccountQuery,
  useGetOnboardingDetailsQuery,
  useUpdateOnboardingDetailsMutation,
  useLazyGenerateUploadUrlQuery,
  useGetTransactionsQuery,
  useGenerateApiKeyMutation,
} = accountApi;

export type GetAccountApiResponse = User;
export type GetAccountApiArg = void;
export type GetOnboardingDetailsApiResponse = User;
export type GetOnboardingDetailsApiArg = void;
export type UpdateOnboardingDetailsApiResponse = unknown;
export type UpdateOnboardingDetailsApiArg = {
  updateOnboardingDto: UpdateOnboardingDto;
};
export type GenerateUploadUrlApiResponse =
  /** status 200 Pre-signed URL generated. */ {
    signedUrl?: string;
    finalFileUrl?: string;
  };
export type GenerateUploadUrlApiArg = {
  /** The name of the file to be uploaded. */
  fileName: string;
  /** The MIME type of the file to be uploaded. */
  fileType: string;
};
export type GetTransactionsApiArg = void;
export type GenerateApiKeyApiResponse =
  /** status 200 New API key generated. Store it securely! */ {
    apiKey?: string;
  };
export type GenerateApiKeyApiArg = void;