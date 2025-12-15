import { apiSlice } from "../../api/apiSlice";
import { UpdateOnboardingDto } from "./types";

export const accountApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<GetProfileApiResponse, GetProfileApiArg>({
      query: () => ({ url: `/account/profile` }),
    }),

    getOnboardingDetails: build.query<
      GetOnboardingDetailsApiResponse,
      GetOnboardingDetailsApiArg
    >({
      query: () => ({ url: `/account/onboarding` }),
    }),

    updateOnboardingDetails: build.mutation<
      UpdateOnboardingDetailsApiResponse,
      UpdateOnboardingDetailsApiArg
    >({
      query: (queryArg) => ({
        url: `/account/onboarding`,
        method: "PATCH",
        body: queryArg.updateOnboardingDto,
      }),
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
  useGetProfileQuery,
  useGetOnboardingDetailsQuery,
  useUpdateOnboardingDetailsMutation,
  useGenerateUploadUrlQuery,
  useGetTransactionsQuery,
  useGenerateApiKeyMutation,
} = accountApi;

export type GetProfileApiResponse =
  /** status 200 User profile retrieved. */ any;
export type GetProfileApiArg = void;
export type GetOnboardingDetailsApiResponse = unknown;
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
export type GetTransactionsApiResponse = unknown;
export type GetTransactionsApiArg = void;
export type GenerateApiKeyApiResponse =
  /** status 200 New API key generated. Store it securely! */ {
    apiKey?: string;
  };
export type GenerateApiKeyApiArg = void;
