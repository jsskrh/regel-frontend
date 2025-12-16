import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Contacts", "ContactLists", "Account", "Transactions", "Messages", "Campaigns", "Onboarding"],
  endpoints: () => ({}),
});