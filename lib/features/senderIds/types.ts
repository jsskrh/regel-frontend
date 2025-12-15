
export type RequestSenderIdDto = {
  /** The desired Sender ID (3-11 alphanumeric characters) */
  senderId: string;
};
export type UpdateSenderIdDto = {
  /** The new status of the sender ID request. */
  status: "PENDING" | "APPROVED" | "REJECTED";
  /** Reason for rejecting the Sender ID request (required if status is REJECTED). */
  rejectionReason?: string;
};
