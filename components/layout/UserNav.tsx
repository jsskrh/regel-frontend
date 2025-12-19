"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, ReceiptText, LogOut, X } from "lucide-react";
import { useGetAccountQuery } from "@/lib/features/account/accountApi";
import { useLogoutMutation } from "@/lib/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/features/auth/authSlice";

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

const nav = [
  {
    title: "",
    items: [
      { title: "Home", path: "/dashboard", icon: "home.svg" },
      {
        title: "Users",
        path: "/adminUsers/users",
        icon: "user-group.svg",
        visible: ["superAdmin", "admin"],
      },
    ],
  },
  {
    title: "Contacts",
    items: [
      {
        title: "Registered contacts",
        path: "/contacts",
        icon: "mail-check.svg",
        visible: ["superAdmin", "admin", "user"],
      },
      {
        title: "Add new contacts",
        path: "/contacts/add",
        icon: "user.svg",
        visible: ["superAdmin", "admin", "user"],
      },
      {
        title: "Groups",
        path: "/contacts/groups",
        icon: "user-group.svg",
        visible: ["superAdmin", "admin", "user"],
      },
      {
        title: "Add new group",
        path: "/contacts/groups/add",
        icon: "users.svg",
        visible: ["superAdmin", "admin", "user"],
      },
    ],
  },
  {
    title: "SMS",
    items: [
      {
        title: "Create new sms",
        path: "/sms/send",
        icon: "mail-add.svg",
        visible: ["superAdmin", "admin", "user"],
      },
      {
        title: "Create new otp",
        path: "/clients/otp/send",
        icon: "mail-add.svg",
        visible: ["superAdmin", "admin", "user"],
      },
      { title: "Inbox", path: "/dashboard", icon: "message-alt.svg" },
      {
        title: "Sent items",
        path: "/inbox",
        icon: "send-alt.svg",
        visible: ["superAdmin", "admin", "user"],
      },
    ],
  },
  {
    title: "Billing",
    items: [
      {
        title: "Billing information",
        path: "/billing",
        icon: "receipt.svg",
        visible: ["superAdmin", "admin", "user"],
      },
      {
        title: "Settings",
        path: "/clients/profile/user",
        icon: "settings.svg",
      },
      {
        title: "API keys",
        path: "/developer/api-key",
        icon: "settings.svg",
        visible: ["superAdmin", "admin", "user"],
      },
      {
        title: "Documentation",
        path: "/developer/docs",
        icon: "receipt.svg",
        visible: ["superAdmin", "admin", "user"],
      },
      {
        title: "Customer support",
        path: "/dashboard",
        icon: "customer-service.svg",
      },
    ],
  },
];

export function UserNav() {
  const { data: user } = useGetAccountQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const pathname = usePathname();

  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
      router.push("/login");
    } catch (err) {
      console.error("Failed to logout: ", err);
    }
  };

  const handleNavItemClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const allNavItems = nav.flatMap((section) => section.items);

    const currentItem = allNavItems.find((item) => item.path === pathname);

    const page = currentItem ? currentItem.title : "Dashboard";

    setCurrentPage(page);
  }, [pathname]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="mx-4 mb-3 bg-[#F9FAFB] border border-[#D1D5DB] rounded-lg relative p-3 flex items-center justify-between gap-x-2 hover:bg-unset lg:sr-only"
        >
          <span className="text-sm leading-[125%] text-[#6B7280]">
            {currentPage}
          </span>
          <Image
            className={`size-4.5 transition-all ${isOpen ? "rotate-180" : ""}`}
            src="/icons/chevron-down.svg"
            alt="chevron down icon"
            width={10}
            height={10}
            priority
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="max-lg:w-screen border-0 rounded-none max-lg:h-[calc(100vh-60px)] p-3 mt-2 border-t border-t-neutral-200 max-lg:overflow-y-scroll max-lg:pb-40"
        align="end"
        forceMount
      >
        {/* <DropdownMenuGroup className="lg:sr-only px-1 pb-3 pt-0 flex items-center gap-x-3">
          <SearchBar />
        </DropdownMenuGroup> */}

        <DropdownMenuGroup className="p-3 gap-y-6 flex-1 lg:sr-only flex flex-col border rounded-lg border-[#e5e7eb] bg-[#f9fbfc]">
          {nav.map((section) => (
            <div
              key={section.title}
              className="flex flex-col gap-y-4 items-start"
            >
              {section.title && (
                <div className="uppercase font-semibold text-xs leading-[145%] tracking-[-5%] text-[#231F20]">
                  {section.title}
                </div>
              )}
              <div className="flex flex-col gap-y-4">
                {section.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.path}
                    onClick={handleNavItemClick}
                  >
                    <DropdownMenuItem
                      className={`flex items-center gap-x-2 font-semibold max-lg:text-sm tracking-[-5%] leading-[145%] p-0 ${
                        pathname === item.path ? "text-[#12533A]" : "text-black"
                      }`}
                    >
                      <Image
                        className="size-5 lg:size-6"
                        src={`/icons/${item.icon}`}
                        alt={`${item.title} icon`}
                        width={24}
                        height={24}
                        priority
                      />
                      <span>{item.title}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <DropdownMenuItem
            className="flex flex-col gap-y-4 items-start p-0"
            onClick={handleLogout}
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

        <DropdownMenuGroup className="p-3 gap-y-6 flex-1 flex flex-col sr-only lg:not-sr-only rounded-lg">
          <DropdownMenuItem
            className="flex flex-col gap-y-4 items-start"
            onClick={handleLogout}
            onSelect={(e) => e.preventDefault()} // Prevent auto-closing on click
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
