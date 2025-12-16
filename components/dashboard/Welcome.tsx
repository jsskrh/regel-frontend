"use client";

import { useGetAccountQuery } from "@/lib/features/account/accountApi";

const Welcome = () => {
  const { data: user } = useGetAccountQuery();

  return (
    <div className="flex flex-col gap-y-1 mb-6">
      <h2 className="text-2xl leading-[120%] tracking-[-2%] font-semibold">
        Welcome {user?.name},
      </h2>
      <p className="text-gray-600 leading-[145%]">It’s a sunny day today 😊</p>
    </div>
  );
};

export default Welcome;
