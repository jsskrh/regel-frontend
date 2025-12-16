
export interface Contact {
  _id: string;
  userId: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
  
export type CreateContactListDto = {
    /** The unique name of the contact list */
    name: string;
    /** A description for the contact list (optional) */
    description?: string;
    /** An array of MongoDB Object IDs of contacts to initially include (optional) */
    contacts?: string[];
};
export type AddRemoveContactsToListDto = {
    /** An array of MongoDB Object IDs of contacts to add or remove from the list */
    contactIds: string[];
};
export type UpdateContactListDto = {
    /** The new unique name for the contact list (optional) */
    name?: string;
    /** The new description for the contact list (optional) */
    description?: string;
};
export type CreateContactDto = {
    /** The phone number of the contact in E.164 format */
    phoneNumber: string;
    /** The first name of the contact (optional) */
    firstName?: string;
    /** The last name of the contact (optional) */
    lastName?: string;
};
export type UpdateContactDto = {
    /** The new phone number of the contact in E.164 format (optional) */
    phoneNumber?: string;
    /** The new first name of the contact (optional) */
    firstName?: string;
    /** The new last name of the contact (optional) */
    lastName?: string;
};
