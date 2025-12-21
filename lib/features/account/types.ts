
export interface Transaction {
    _id: string;
    userId: string;
    type: "DEBIT" | "CREDIT";
    amount: number;
    status: string;
    description: string;
    reference: string;
    gateway: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

export type UpdateOnboardingDto = {
    company?: string;
    website?: string;
    cacDocumentUrl?: string;
    samplePromotionalMessage?: string;
    sampleTransactionalMessage?: string;
    estimatedMonthlySms?: number;
};

export type UpdateProfileDto = {
    name?: string;
    company?: string;
};

export type ChangePasswordDto = {
    currentPassword: string;
    newPassword: string;
};
