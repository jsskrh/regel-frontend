"use client";

import { UserNav } from "./UserNav";
import { ProfileNav } from "./ProfileNav";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBar from "./SearchBar";
import { useGetAccountQuery } from "@/lib/features/account/accountApi";

const AuthHeader = () => {
  const { data: user } = useGetAccountQuery();

  return (
    <header className="w-full flex max-lg:flex-col lg:items-center z-10 max-lg:fixed top-0">
      <div className="p-4 lg:px-0 flex justify-between items-center w-full bg-white">
        <div className="flex-1 max-w-112.5 sr-only lg:not-sr-only">
          <SearchBar />
        </div>
        <div className="lg:sr-only font-medium flex flex-col">
          <span className="leading-[150%] text-[#111928]">{user?.name}</span>
          <span className="text-xs leading-[140%] tracking-[1%] text-[#666666]">
            Regel ID: {user?._id.slice(19, 6)}
          </span>
        </div>
        <div className="flex items-center gap-x-4">
          <Link href={`/`} className="flex">
            <Image
              className="size-6.50"
              src="/icons/bell-black.svg"
              alt="notification icon"
              width={25.83}
              height={25.83}
              priority
            />
          </Link>

          <div className="flex items-center gap-x-2">
            {user && (
              <Avatar className="size-8">
                <AvatarImage
                  src={user?.avatar}
                  alt="Me"
                  onError={(event) =>
                    console.error("Error loading image:", event)
                  }
                />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            <ProfileNav />
          </div>
        </div>
      </div>

      <UserNav />
    </header>
  );
};

export default AuthHeader;
