import { apiSlice } from "../../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<RegisterApiResponse, RegisterApiArg>({
      query: (queryArg) => ({
        url: `/auth/register`,
        method: "POST",
        body: queryArg.createUserDto,
      }),
    }),

    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: `/auth/login`,
        method: "POST",
        body: queryArg.loginDto,
      }),
    }),

    logout: build.mutation<LogoutApiResponse, LogoutApiArg>({
      query: () => ({ url: `/auth/logout`, method: "POST" }),
    }),

    refreshToken: build.mutation<RefreshTokenApiResponse, RefreshTokenApiArg>({
      query: () => ({ url: `/auth/refresh`, method: "POST" }),
    }),

    forgotPassword: build.mutation<
      ForgotPasswordApiResponse,
      ForgotPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: queryArg.forgotPasswordDto,
      }),
    }),

    resetPassword: build.mutation<
      ResetPasswordApiResponse,
      ResetPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/reset-password/${queryArg.token}`,
        method: "POST",
        body: queryArg.resetPasswordDto,
      }),
    }),

    googleAuth: build.query<GoogleAuthApiResponse, GoogleAuthApiArg>({
      query: () => ({ url: `/auth/google` }),
    }),

    githubAuth: build.query<GithubAuthApiResponse, GithubAuthApiArg>({
      query: () => ({ url: `/auth/github` }),
    }),

    getProfile: build.query<GetProfileApiResponse, GetProfileApiArg>({
      query: () => ({ url: `/auth/profile` }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGoogleAuthQuery,
  useGithubAuthQuery,
  useGetProfileQuery,
} = authApi;

export type RegisterApiResponse =
  /** status 201 User registered successfully. */ any;
export type RegisterApiArg = {
  createUserDto: CreateUserDto;
};
export type LoginApiResponse = /** status 200 User logged in successfully. */ {
  accessToken?: string;
  refreshToken?: string;
};
export type LoginApiArg = {
  loginDto: LoginDto;
};
export type LogoutApiResponse = unknown;
export type LogoutApiArg = void;
export type RefreshTokenApiResponse =
  /** status 200 Access token refreshed successfully */ {
    accessToken?: string;
  };
export type RefreshTokenApiArg = void;
export type ForgotPasswordApiResponse = unknown;
export type ForgotPasswordApiArg = {
  forgotPasswordDto: ForgotPasswordDto;
};
export type ResetPasswordApiResponse = unknown;
export type ResetPasswordApiArg = {
  token: string;
  resetPasswordDto: ResetPasswordDto;
};
export type GoogleAuthApiResponse = unknown;
export type GoogleAuthApiArg = void;
export type GithubAuthApiResponse = unknown;
type GithubAuthApiArg = void;
export type GetProfileApiResponse = unknown;
export type GetProfileApiArg = void;
export type CreateUserDto = {
  /** The full name of the user */
  name: string;
  /** The email address of the user */
  email: string;
  /** The user password (at least 8 characters) */
  password: string;
  /** The user's company name (optional) */
  company?: string;
};
export type LoginDto = {
  email: string;
  password: string;
};
export type ForgotPasswordDto = {
  /** The email address of the user requesting a password reset */
  email: string;
};
export type ResetPasswordDto = {
  /** The new password for the user (at least 8 characters) */
  password: string;
};
