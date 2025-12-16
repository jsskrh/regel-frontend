export type Recipient = {
    messageId: string;
    number: string;
    cost: string;
    status: string;
    statusCode: number;
  };
  
  export type Campaign = { // This was Campaign before, now Campaign type is not needed in this context.
    _id: string;
    senderId: string;
    title: string;
    message: string;
    status: string;
    type: string;
    from: string;
    unicode: boolean;
    credit: number;
    recipients: Recipient[];
    createdAt: string;
    updatedAt: string;
  };

export type Message = { // This was SingleMessage before
    _id: string;
    userId: string;
    from: string;
    to: string;
    body: string;
    status: string;
    cost: number;
    provider: string;
    currency: string;
    providerMessageId?: string;
    externalStatusCode?: string;
    externalStatusText?: string;
    error?: string; // For FAILED messages
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type CreateCampaignDto = {
    /** The name of the campaign */
    name: string;
    /** The message content of the campaign */
    message: string;
    /** The ID of an existing contact list to send messages to (optional) */
    contactListId?: string;
    /** An array of phone numbers to send messages to (optional, overrides contactListId) */
    phoneNumbers?: string[];
  };
  
  export type SendSingleSmsDto = {
    /** The recipient's phone number in E.164 format */
    to: string;
    /** The content of the SMS message */
    message: string;
    /** The sender ID (optional) */
    from?: string;
  };