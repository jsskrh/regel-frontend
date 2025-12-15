import { apiSlice } from "../../api/apiSlice";

export const paymentsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    initializePayment: build.mutation<
      InitializePaymentApiResponse,
      InitializePaymentApiArg
    >({
      query: (queryArg) => ({
        url: `/payments/initialize`,
        method: "POST",
        body: queryArg.initializePaymentDto,
      }),
    }),

    handlePaystackCallback: build.query<
      HandlePaystackCallbackApiResponse,
      HandlePaystackCallbackApiArg
    >({
      query: (queryArg) => ({
        url: `/payments/paystack/callback`,
        params: {
          reference: queryArg.reference,
        },
      }),
    }),

    handlePaystackWebhook: build.mutation<
      HandlePaystackWebhookApiResponse,
      HandlePaystackWebhookApiArg
    >({
      query: (queryArg) => ({
        url: `/payments/paystack/webhook`,
        method: "POST",
        headers: {
          "x-paystack-signature": queryArg["x-paystack-signature"],
        },
      }),
    }),
  }),
});

export const {
  useInitializePaymentMutation,
  useHandlePaystackCallbackQuery,
  useHandlePaystackWebhookMutation,
} = paymentsApi;

export type InitializePaymentApiResponse =
  /** status 200 Payment initialization successful, returns Paystack authorization URL. */ {
    authorization_url?: string;
  };
export type InitializePaymentApiArg = {
  initializePaymentDto: InitializePaymentDto;
};
export type HandlePaystackCallbackApiResponse =
  /** status 200 Payment verification complete. */ {
    message?: string;
    status?: string;
  };
export type HandlePaystackCallbackApiArg = {
  reference: string;
};
export type HandlePaystackWebhookApiResponse = unknown;
export type HandlePaystackWebhookApiArg = {
  "x-paystack-signature": string;
};
export type InitializePaymentDto = {
  /** The amount to fund the account, in local currency units (e.g., Naira) */
  amount: number;
};
