import { apiSlice } from "../../api/apiSlice";

export const otpApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    sendOtp: build.mutation<SendOtpApiResponse, SendOtpApiArg>({
      query: (queryArg) => ({
        url: `/otp/send`,
        method: "POST",
        body: queryArg.sendOtpDto,
      }),
    }),

    verifyOtp: build.mutation<VerifyOtpApiResponse, VerifyOtpApiArg>({
      query: (queryArg) => ({
        url: `/otp/verify`,
        method: "POST",
        body: queryArg.verifyOtpDto,
      }),
    }),
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation } = otpApi;

export type SendOtpApiResponse =
  /** status 200 OTP sent successfully (true/false in success field). */ {
    message?: string;
    success?: boolean;
  };
export type SendOtpApiArg = {
  sendOtpDto: SendOtpDto;
};
export type VerifyOtpApiResponse =
  /** status 200 OTP verified successfully (true/false in success field). */ {
    message?: string;
    success?: boolean;
  };
export type VerifyOtpApiArg = {
  verifyOtpDto: VerifyOtpDto;
};
export type SendOtpDto = {
  /** The recipient's phone number in E.164 format */
  phoneNumber: string;
  /** The message template for the OTP. "<OTP>" will be replaced with the actual code. */
  messageTemplate: string;
};
export type VerifyOtpDto = {
  /** The recipient's phone number in E.164 format */
  phoneNumber: string;
  /** The One-Time Password to verify */
  otp: string;
};
