export interface Transaction {
    _id: string;
    userId: string;
    status: string;
    reference: string;
    currency: string;
    amount: number;
    createdAt: string;
  }

export type UpdateOnboardingDto = {
    company?: string;
    website?: string;
    cacDocumentUrl?: string;
    samplePromotionalMessage?: string;
    sampleTransactionalMessage?: string;
    estimatedMonthlySms?: number;
};