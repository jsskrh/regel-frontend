"use client";

import { useFindAllContactListsQuery } from "@/lib/features/contacts/contactsApi";
import { useState } from "react";
import Image from "next/image";
import SectionHeader from "../common/SectionHeader"; // Correct import path
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assuming this exists

const Groups = () => {
  const {
    data: contactLists,
    isLoading,
    error,
  } = useFindAllContactListsQuery();

  if (isLoading) return <p>Loading contact lists...</p>;
  if (error) return <p>Error loading contact lists.</p>;

  return (
    <div className="space-y-6 mb-6">
      <SectionHeader title="Groups" path="/contacts/groups" />
      <div className="border border-[#F0F2F5] rounded-[0.625rem] p-6 px-3.5 lg:px-9 grid grid-cols-4 lg:grid-cols-10 gap-5">
        {contactLists &&
          contactLists.map(
            (
              group // Renamed to contactLists
            ) => (
              <div
                className="flex items-center text-center flex-col gap-y-2"
                key={group?._id}
              >
                <Avatar className="size-12">
                  <AvatarImage src={group?.avatar} alt="" />
                  <AvatarFallback className="bg-[#12533A] text-lg font-semibold leading-[145%] text-white">
                    {group?.name
                      ?.split(" ")
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold text-xs leading-[145%]">
                  {group?.name}
                </span>
                <span className="text-xs leading-[145%] whitespace-nowrap">
                  {group?.contacts.length} contacts
                </span>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Groups;
