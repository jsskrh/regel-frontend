
export interface Transaction {
    _id: string;
    userId: string;
    status: string;
    reference: string;
    currency: string;
    amount: number;
    createdAt: string;
  }

export interface OnboardingDetails {
    company?: string;
    website?: string;
    cacDocumentUrl?: string;
    samplePromotionalMessage?: string;
    sampleTransactionalMessage?: string;
    estimatedMonthlySms?: number;
    isComplete: boolean; // Assuming there is a flag for completion
}

export type UpdateOnboardingDto = {
    company?: string;
    website?: string;
    cacDocumentUrl?: string;
    samplePromotionalMessage?: string;
    sampleTransactionalMessage?: string;
    estimatedMonthlySms?: number;
};
