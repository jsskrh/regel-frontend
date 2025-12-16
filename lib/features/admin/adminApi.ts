import { apiSlice } from "../../api/apiSlice";
import {
  UpdateActiveProviderDto,
  UpdateUserDto,
  CreateRoleDto,
  UpdateRoleDto,
  CreatePermissionDto,
} from "./types";

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

    getAllUsers: build.query<GetAllUsersApiResponse, GetAllUsersApiArg>({
      query: () => ({ url: `/admin/users` }),
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
    }),

    deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
      query: (queryArg) => ({
        url: `/admin/users/${queryArg.id}`,
        method: "DELETE",
      }),
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
      GetTransactionsApiResponse,
      GetTransactionsApiArg
    >({
      query: () => ({ url: `/admin/transactions` }),
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
export type GetAllUsersApiResponse =
  /** status 200 List of users retrieved. */ any;
export type GetAllUsersApiArg = void;
export type GetUserApiResponse = /** status 200 User details retrieved. */ any;
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
export type GetDashboardStatsApiResponse =
  /** status 200 Dashboard statistics retrieved. */ any;
export type GetDashboardStatsApiArg = void;
export type GetAllTransactionsApiResponse = unknown;
export type GetTransactionsApiArg = void;