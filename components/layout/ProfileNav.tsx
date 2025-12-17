"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, ReceiptText, LogOut, X } from "lucide-react";
import SearchBar from "./SearchBar";
import { useGetAccountQuery } from "@/lib/features/account/accountApi";
import { useLogoutMutation } from "@/lib/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/features/auth/authSlice";
import { apiSlice } from "@/lib/api/apiSlice";

const menuItems = [
  {
    label: "Profile",
    href: "/clients/profile/edit",
    icon: <CircleUser className="size-5" />,
  },
  {
    label: "Billing",
    href: "/billing",
    icon: <ReceiptText className="size-5" />,
  },
];

export function ProfileNav() {
  const { data: user } = useGetAccountQuery();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutMutation({}).unwrap();
      dispatch(logout());
      dispatch(apiSlice.util.resetApiState());
      router.push("/login");
    } catch (err) {
      console.error("Failed to logout: ", err);
    }
  };

  const handleNavItemClick = () => {
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger asChild>
        {user && (
          <Button
            variant="ghost"
            className="relative p-0 flex items-center gap-x-2 hover:bg-unset sr-only lg:not-sr-only"
          >
            <Image
              className={`size-4.5 transition-all ${
                isOpen ? "rotate-180" : ""
              }`}
              src="/icons/chevron-down.svg"
              alt="chevron down icon"
              width={18}
              height={18}
              priority
            />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="max-lg:w-screen border-0 rounded-none max-lg:h-[calc(100vh-60px)] p-3 mt-2 border-t border-t-neutral-200 max-lg:overflow-y-scroll max-lg:pb-20"
        align="end"
        forceMount
      >
        <DropdownMenuGroup className="lg:sr-only px-1 pb-3 pt-0 flex items-center gap-x-3">
          <SearchBar />
        </DropdownMenuGroup>

        <DropdownMenuGroup className="p-3 gap-y-6 flex-1 flex flex-col sr-only lg:not-sr-only rounded-lg">
          <DropdownMenuItem
            className="flex flex-col gap-y-4 items-start"
            onClick={handleLogout}
            onSelect={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-y-4">
              <div
                className={`flex items-center gap-x-2 font-semibold tracking-[-5%] leading-[145%] text-[#FF5E15]`}
              >
                <Image
                  className="size-6"
                  src={`/icons/log-out.svg`}
                  alt={`sign out icon`}
                  width={24}
                  height={24}
                  priority
                />
                <span>Sign out</span>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
