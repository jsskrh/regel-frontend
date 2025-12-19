import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  House,
  Fingerprint,
  Columns2,
  TicketX,
  Send,
  BadgeCheck,
  ListCheck,
  LayoutDashboard,
} from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";

const nav = [
  {
    title: "",
    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <LayoutDashboard className="size-5" />,
      },
      {
        title: "Introduction",
        path: "/developer/docs",
        icon: <House className="size-5" />,
      },
      {
        title: "Authentication",
        path: "/developer/docs/authentication",
        icon: <Fingerprint className="size-5" />,
      },
      {
        title: "Pagination",
        path: "/developer/docs/pagination",
        icon: <Columns2 className="size-5" />,
      },
      {
        title: "Errors",
        path: "/developer/docs/errors",
        icon: <TicketX className="size-5" />,
      },
    ],
  },
  {
    title: "OTP",
    items: [
      {
        title: "Send OTP",
        path: "/developer/docs/endpoints/otp#sendOtp",
        icon: <Send className="size-5" />,
      },
      {
        title: "Verify OTP",
        path: "/developer/docs/endpoints/otp#verifyOtp",
        icon: <BadgeCheck className="size-5" />,
      },
      //   {
      //     title: "Check OTP Status",
      //     path: "/developer/docs/endpoints/otp#checkOtpStatus",
      //     icon: <ListCheck className="size-5" />,
      //   },
    ],
  },
  {
    title: "SMS",
    items: [
      {
        title: "Send SMS",
        path: "/developer/docs/endpoints/sms#sendSms",
        icon: <Send className="size-5" />,
      },
    ],
  },
];

export function DocsNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    setIsOpen(false);
    signOut({ callbackUrl: "/" });
  };

  const handleNavItemClick = () => {
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative p-0 flex items-center gap-x-2 hover:bg-unset"
        >
          <Image
            className={`size-4.5 transition-all ${isOpen ? "rotate-180" : ""}`}
            src="/icons/chevron-down.svg"
            alt="chevron down icon"
            width={18}
            height={18}
            priority
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 border-0 rounded-none max-lg:h-[calc(100vh-60px)] p-3 mt-2 border-t border-t-neutral-200 max-lg:overflow-y-scroll max-lg:pb-20"
        align="end"
        forceMount
      >
        <DropdownMenuGroup className="p-3 gap-y-6 flex-1 flex flex-col border rounded-lg border-[#e5e7eb] bg-[#f9fbfc]">
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
                      {item.icon}
                      <span>{item.title}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
