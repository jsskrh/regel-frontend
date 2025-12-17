import { User } from "../account/accountApi";

export type UpdateActiveProviderDto = {
  /** The name of the active SMS provider */
  provider: "termii" | "africastalking";
};
export type UpdateUserDto = {
  /** The MongoDB Object ID of the role to assign to the user (optional) */
  role?: string;
  /** The new balance for the user (optional) */
  balance?: number;
};
export type CreateRoleDto = {
  /** The unique name of the role */
  name: string;
  /** An array of MongoDB Object IDs for permissions assigned to this role */
  permissions: string[];
};
export type UpdateRoleDto = {
  /** The new unique name of the role (optional) */
  name?: string;
  /** An array of MongoDB Object IDs for permissions to update (optional) */
  permissions?: string[];
};
export type CreatePermissionDto = {
  /** The action this permission allows (e.g., create, read, update, delete, manage) */
  action: string;
  /** The subject this permission applies to (e.g., User, Campaign, Role) */
  subject: string;
};

export interface DashboardStats {
    totalUsers: number;
    activeUsers: number;
    newSignups: number;
    inactiveUsers: number;
    totalCampaigns: number;
    totalSmsSent: number;
    totalFundsInSystem: number;
}

export type AdminUser = User;