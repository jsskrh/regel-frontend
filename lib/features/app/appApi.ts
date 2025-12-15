import { apiSlice } from "../../api/apiSlice";

export const appApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    GetHello: build.query<GetHelloApiResponse, GetHelloApiArg>({
      query: () => ({ url: `/` }),
    }),
  }),
});

export const { useGetHelloQuery } = appApi;

export type GetHelloApiResponse = unknown;
export type GetHelloApiArg = void;
