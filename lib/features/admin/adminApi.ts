
import { apiSlice } from "../../api/apiSlice";
import {
  UpdateActiveProviderDto,
  UpdateUserDto,
  CreateRoleDto,
  UpdateRoleDto,
  CreatePermissionDto,
  DashboardStats,
  AdminUser,
} from "./types";
import { User } from "../account/accountApi";
import { Transaction } from "../payments/types";
import { PaginatedResponse, PaginationQueryDto } from "@/lib/utils/types";

export interface Role {
  _id: string;
  name: string;
  permissions: string[];
}

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getActiveProvider: build.query<
      GetActiveProviderApiResponse,
      GetActiveProviderApiArg
    >({
      query: () => ({ url: `/admin/settings/active-provider` }),
    }),

    updateActiveProvider: build.mutation<
      UpdateActiveProviderApiResponse,
      UpdateActiveProviderApiArg
    >({
      query: (queryArg) => ({
        url: `/admin/settings/active-provider`,
        method: "PATCH",
        body: queryArg.updateActiveProviderDto,
      }),
    }),

    getAllUsers: build.query<GetAllUsersApiResponse, void>({
      query: () => ({ url: `/admin/users` }),
      providesTags: ["Users"],
    }),

    getUser: build.query<GetUserApiResponse, GetUserApiArg>({
      query: (queryArg) => ({ url: `/admin/users/${queryArg.id}` }),
    }),

    updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
      query: (queryArg) => ({
        url: `/admin/users/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateUserDto,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
      query: (queryArg) => ({
        url: `/admin/users/${queryArg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    createRole: build.mutation<CreateRoleApiResponse, CreateRoleApiArg>({
      query: (queryArg) => ({
        url: `/admin/roles`,
        method: "POST",
        body: queryArg.createRoleDto,
      }),
    }),

    findAllRoles: build.query<FindAllRolesApiResponse, FindAllRolesApiArg>({
      query: () => ({ url: `/admin/roles` }),
    }),

    updateRole: build.mutation<UpdateRoleApiResponse, UpdateRoleApiArg>({
      query: (queryArg) => ({
        url: `/admin/roles/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateRoleDto,
      }),
    }),

    deleteRole: build.mutation<DeleteRoleApiResponse, DeleteRoleApiArg>({
      query: (queryArg) => ({
        url: `/admin/roles/${queryArg.id}`,
        method: "DELETE",
      }),
    }),

    createPermission: build.mutation<
      CreatePermissionApiResponse,
      CreatePermissionApiArg
    >({
      query: (queryArg) => ({
        url: `/admin/permissions`,
        method: "POST",
        body: queryArg.createPermissionDto,
      }),
    }),

    findAllPermissions: build.query<
      FindAllPermissionsApiResponse,
      FindAllPermissionsApiArg
    >({
      query: () => ({ url: `/admin/permissions` }),
    }),

    getDashboardStats: build.query<
      GetDashboardStatsApiResponse,
      GetDashboardStatsApiArg
    >({
      query: () => ({ url: `/admin/stats` }),
    }),

    getAllTransactions: build.query<
      GetAllTransactionsApiResponse,
      GetAllTransactionsApiArg
    >({
      query: (paginationQuery) => ({
        url: `/admin/transactions`,
        params: paginationQuery,
      }),
    }),
  }),
});

export const {
  useGetActiveProviderQuery,
  useUpdateActiveProviderMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateRoleMutation,
  useFindAllRolesQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useCreatePermissionMutation,
  useFindAllPermissionsQuery,
  useGetDashboardStatsQuery,
  useGetAllTransactionsQuery,
} = adminApi;

export type GetActiveProviderApiResponse = unknown;
export type GetActiveProviderApiArg = void;
export type UpdateActiveProviderApiResponse = unknown;
export type UpdateActiveProviderApiArg = {
  updateActiveProviderDto: UpdateActiveProviderDto;
};
export type GetAllUsersApiResponse = AdminUser[];
export type GetAllUsersApiArg = void;
export type GetUserApiResponse = AdminUser;
export type GetUserApiArg = {
  id: string;
};
export type UpdateUserApiResponse = unknown;
export type UpdateUserApiArg = {
  id: string;
  updateUserDto: UpdateUserDto;
};
export type DeleteUserApiResponse = unknown;
export type DeleteUserApiArg = {
  id: string;
};
export type CreateRoleApiResponse = unknown;
export type CreateRoleApiArg = {
  createRoleDto: CreateRoleDto;
};
export type FindAllRolesApiResponse = Role[];
export type FindAllRolesApiArg = void;
export type UpdateRoleApiResponse = unknown;
export type UpdateRoleApiArg = {
  id: string;
  updateRoleDto: UpdateRoleDto;
};
export type DeleteRoleApiResponse = unknown;
export type DeleteRoleApiArg = {
  id: string;
};
export type CreatePermissionApiResponse = unknown;
export type CreatePermissionApiArg = {
  createPermissionDto: CreatePermissionDto;
};
export type FindAllPermissionsApiResponse = unknown;
export type FindAllPermissionsApiArg = void;
export type GetDashboardStatsApiResponse = DashboardStats;
export type GetDashboardStatsApiArg = void;
export type GetAllTransactionsApiResponse = PaginatedResponse<Transaction>;
export type GetAllTransactionsApiArg = PaginationQueryDto;
