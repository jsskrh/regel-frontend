import { apiSlice } from "../../api/apiSlice";
import {
  CreateContactListDto,
  AddRemoveContactsToListDto,
  UpdateContactListDto,
  CreateContactDto,
  UpdateContactDto,
  Contact
} from "./types";

export interface ContactList {
  _id: string;
  name: string;
  description?: string;
  avatar?: string; // Optional avatar
  contacts: string[]; // Changed from contactIds
}

export const contactsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    findAllContactLists: build.query<
      FindAllContactListsApiResponse,
      FindAllContactListsApiArg
    >({
      query: () => ({ url: `/contacts/lists` }),
      providesTags: ["ContactLists"],
    }),

    createContactList: build.mutation<
      CreateContactListApiResponse,
      CreateContactListApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/lists`,
        method: "POST",
        body: queryArg.createContactListDto,
      }),
      invalidatesTags: ["ContactLists"],
    }),

    addContactsToList: build.mutation<
      AddContactsToListApiResponse,
      AddContactsToListApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/lists/${queryArg.listId}/contacts`,
        method: "POST",
        body: queryArg.addRemoveContactsToListDto,
      }),
      invalidatesTags: ["ContactLists"],
    }),

    removeContactsFromList: build.mutation<
      RemoveContactsFromListApiResponse,
      RemoveContactsFromListApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/lists/${queryArg.listId}/contacts`,
        method: "DELETE",
        body: queryArg.addRemoveContactsToListDto,
      }),
      invalidatesTags: ["ContactLists"],
    }),

    findContactListById: build.query<
      FindContactListByIdApiResponse,
      FindContactListByIdApiArg
    >({
      query: (queryArg) => ({ url: `/contacts/lists/${queryArg.id}` }),
    }),

    updateContactList: build.mutation<
      UpdateContactListApiResponse,
      UpdateContactListApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/lists/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateContactListDto,
      }),
      invalidatesTags: ["ContactLists"],
    }),

    deleteContactList: build.mutation<
      DeleteContactListApiResponse,
      DeleteContactListApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/lists/${queryArg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ContactLists"],
    }),

    findAllContacts: build.query<
      FindAllContactsApiResponse,
      FindAllContactsApiArg
    >({
      query: () => ({ url: `/contacts` }),
      providesTags: ["Contacts"],
    }),

    createContact: build.mutation<
      CreateContactApiResponse,
      CreateContactApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts`,
        method: "POST",
        body: queryArg.createContactDto,
      }),
      invalidatesTags: ["Contacts"],
    }),

    findContactById: build.query<
      FindContactByIdApiResponse,
      FindContactByIdApiArg
    >({
      query: (queryArg) => ({ url: `/contacts/${queryArg.id}` }),
    }),

    updateContact: build.mutation<
      UpdateContactApiResponse,
      UpdateContactApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateContactDto,
      }),
      invalidatesTags: ["Contacts"],
    }),

    deleteContact: build.mutation<
      DeleteContactApiResponse,
      DeleteContactApiArg
    >({
      query: (queryArg) => ({
        url: `/contacts/${queryArg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useFindAllContactListsQuery,
  useCreateContactListMutation,
  useAddContactsToListMutation,
  useRemoveContactsFromListMutation,
  useFindContactListByIdQuery,
  useUpdateContactListMutation,
  useDeleteContactListMutation,
  useFindAllContactsQuery,
  useCreateContactMutation,
  useFindContactByIdQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi;

export type FindAllContactListsApiResponse = ContactList[];
export type FindAllContactListsApiArg = void;
export type CreateContactListApiResponse = unknown;
export type CreateContactListApiArg = {
  createContactListDto: CreateContactListDto;
};
export type AddContactsToListApiResponse = unknown;
export type AddContactsToListApiArg = {
  listId: string;
  addRemoveContactsToListDto: AddRemoveContactsToListDto;
};
export type RemoveContactsFromListApiResponse = unknown;
export type RemoveContactsFromListApiArg = {
  listId: string;
  addRemoveContactsToListDto: AddRemoveContactsToListDto;
};
export type FindContactListByIdApiResponse = unknown;
export type FindContactListByIdApiArg = {
  id: string;
};
export type UpdateContactListApiResponse = unknown;
export type UpdateContactListApiArg = {
  id: string;
  updateContactListDto: UpdateContactListDto;
};
export type DeleteContactListApiResponse = unknown;
export type DeleteContactListApiArg = {
  id: string;
};
export type FindAllContactsApiResponse = Contact[];
export type FindAllContactsApiArg = void;
export type CreateContactApiResponse = unknown;
export type CreateContactApiArg = {
  createContactDto: CreateContactDto;
};
export type FindContactByIdApiResponse = unknown;
export type FindContactByIdApiArg = {
  id: string;
};
export type UpdateContactApiResponse = unknown;
export type UpdateContactApiArg = {
  id: string;
  updateContactDto: UpdateContactDto;
};
export type DeleteContactApiResponse = unknown;
export type DeleteContactApiArg = {
  id: string;
};