
import { User } from "../account/accountApi"; // Assuming this User type is appropriate

export type RequestSenderIdDto = {
  /** The desired Sender ID (3-11 alphanumeric characters) */
  senderId: string;
};

export enum SenderIdStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export type UpdateSenderIdDto = {
  /** The new status of the sender ID request. */
  status: SenderIdStatus;
  /** Reason for rejecting the Sender ID request (required if status is REJECTED). */
  rejectionReason?: string;
};

export interface SenderIdRequest {
    _id: string;
    userId: User; // User object instead of string ID
    senderIdString: string; // Renamed from senderId
    status: SenderIdStatus;
    rejectionReason?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
