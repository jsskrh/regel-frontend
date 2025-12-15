import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setTokens, logout } from "../features/auth/authSlice";
import type { RootState } from "../store"; // This will be created later

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000", // TODO: use env variable
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        headers: {
          authorization: `Bearer ${(api.getState() as RootState).auth.refreshToken}`,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const newAccessToken = (refreshResult.data as { accessToken: string })
        .accessToken;
      const newRefreshToken = (api.getState() as RootState).auth.refreshToken!;
      api.dispatch(
        setTokens({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};
