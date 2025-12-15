
export type UpdateOnboardingDto = {
  /** The user's company name */
  company?: string;
  /** The company's website URL */
  website?: string;
  /** URL to the uploaded CAC document */
  cacDocumentUrl?: string;
  /** Sample promotional SMS message */
  samplePromotionalMessage?: string;
  /** Sample transactional SMS message */
  sampleTransactionalMessage?: string;
  /** Estimated monthly SMS volume */
  estimatedMonthlySms?: number;
};
