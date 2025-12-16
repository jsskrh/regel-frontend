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

export type InitializePaymentDto = {
    /** The amount to fund the account, in local currency units (e.g., Naira) */
    amount: number;
};