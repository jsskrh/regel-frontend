
"use client";

import { useGetUserSummaryQuery } from "@/lib/features/analytics/analyticsApi";
import Image from "next/image";

const DataCards = () => {
  const { data: summary, isLoading } = useGetUserSummaryQuery();

  const cards = [
    {
      title: "Wallet balance",
      value: `₦${summary?.balance?.toFixed(2) ?? 0}`,
      percentInc: null, // Not available in the new summary
      icon: "money.svg",
      percentText: summary?.balance > 3 ? "Adequate balance" : "Inadequate balance",
    },
    {
      title: "Total sms sent",
      value: summary?.totalMessages,
      percentInc: null, // Not available
      icon: "chat.svg",
      percentText: "", // Not available
    },
    {
      title: "Regeistered contacts",
      value: `${summary?.totalContacts ?? 0} contacts`,
      percentInc: null, // Not available
      icon: "user.svg",
      percentText: "", // Not available
    },
    {
      title: "Regeistered groups",
      value: `${summary?.totalContactLists ?? 0} groups`,
      percentInc: null, // Not available
      icon: "user-group.svg",
      percentText: "", // Not available
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 mb-8.5">
      {cards.map((card) => (
        <Card data={card} key={card.title} isLoading={isLoading} />
      ))}
    </div>
  );
};

const Card = ({ data, isLoading }) => {
  return (
    <div
      className={`p-4 rounded-xl gap-x-4 justify-between flex items-center border border-gray-200 relative ${
        isLoading ? "animate-pulse" : ""
      }`}
    >
      {isLoading ? (
        <div className="space-y-2 truncate">
          <div className="flex items-center h-5">
            <div className="h-2 rounded w-25 bg-gray-200"></div>
          </div>
          <div className="flex items-center h-6">
            <div className="h-4 rounded w-30 bg-gray-200"></div>
          </div>
          <p className="inline-flex items-center gap-1 text-[#04802E] text-xs leading-[145%] h-4.25">
            <span className="tracking-[-0.5%] bg-[#EEFBF4] rounded-[0.625rem] w-9.5 h-2 px-1 flex items-center gap-x-0.5"></span>
            <span className="whitespace-nowrap h-2 w-25 bg-[#EEFBF4]"></span>
          </p>
        </div>
      ) : (
        <div className="space-y-2 truncate">
          <p className="text-[#08261C] text-sm leading-[145%] whitespace-nowrap">
            {data.title}
          </p>
          <p className="font-semibold text-xl leading-[120%] tracking-[-2%] whitespace-nowrap">
            {data.value ?? 0}
          </p>
          {data.percentInc !== null && (
            <p className="inline-flex items-center gap-1 text-[#04802E] text-xs leading-[145%]">
              <span className="tracking-[-0.5%] bg-[#EEFBF4] rounded-[0.625rem] px-1 flex items-center gap-x-0.5">
                <Image
                  className={`size-3`}
                  src="/icons/graph.svg"
                  alt="graph icon"
                  width={12}
                  height={12}
                  priority
                />
                {data.percentInc ?? 0}%
              </span>
              <span className="whitespace-nowrap">{data.percentText}</span>
            </p>
          )}
        </div>
      )}

      {isLoading ? (
        <div className="size-10 bg-gray-200 rounded-full" />
      ) : (
        <div className="size-10 border-gray-200 border flex items-center justify-center rounded-full absolute top-1/2 -translate-y-1/2 right-4">
          <Image
            className={`size-5`}
            src={`/icons/${data.icon}`}
            alt={`${data.title} icon`}
            width={20}
            height={20}
            priority
          />
        </div>
      )}
    </div>
  );
};

export default DataCards;
