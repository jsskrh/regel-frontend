import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useSession } from "next-auth/react";
import { CircleUser, ReceiptText, X, Search, ChevronDown } from "lucide-react";
import { SideNavItem as links } from "@/routes";

const AuthNav = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const filteredLinks = useMemo(() => {
    return links.filter((link) => link.visible.includes(user?.role));
  }, [links, user?.role]);

  return (
    <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
      <DropdownMenuTrigger asChild>
        {user && (
          <Button variant="ghost" className="relative size-6 rounded-full p-0">
            {isOpen ? (
              <X className="size-6" />
            ) : (
              <Image
                className="size-6 ml-auto"
                src="/icons/burger.svg"
                alt="burger icon"
                width={24}
                height={24}
                priority
              />
            )}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-screen border-0 rounded-none h-[calc(100vh-60px)] p-3 mt-3 border-t border-t-neutral-200"
        align="end"
        forceMount
      >
        <DropdownMenuGroup className="py-3 gap-2">
          <Button className="mx-3 pl-2.5 pr-3 inline-flex gap-2 h-9 text-sm w-[calc(100%-24px)] justify-start bg-white border-[0.8px] border-neutral-200 min-h-10 shadow-xs">
            <Search className="size-5" />
            <span className="flex self-center leading-0">Search</span>
          </Button>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="gap-1 p-3">
          {filteredLinks.map((item) =>
            item.submenu ? (
              <DropdownMenuSubGroup
                item={item}
                key={item.title}
                role={user?.role}
              />
            ) : (
              <Link href={item.href} key={item.title}>
                <DropdownMenuItem className="p-0 pl-3 pr-1 h-10">
                  <div className="flex items-center gap-x-2">
                    <item.icon className="size-5" />
                    {item.title}
                  </div>
                </DropdownMenuItem>
              </Link>
            )
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const DropdownMenuSubGroup = ({ item, role }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        onClick={(e) => e.stopPropagation()}
        className="w-full"
      >
        <DropdownMenuItem className="p-0 pl-3 pr-1 h-10 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <item.icon className="size-5" />
            {item.title}
          </div>
          <ChevronDown className="size-5" />
        </DropdownMenuItem>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-1 mt-1 pl-3">
        {item.subMenuItems
          .filter((subitem) => subitem.visible.includes(role))
          .map((subitem) => (
            <Link href={subitem.href} key={subitem.title}>
              <DropdownMenuItem className="p-0 pl-3 pr-1 h-10">
                <div className="flex items-center gap-x-2">
                  <item.icon className="size-5" />
                  {subitem.title}
                </div>
              </DropdownMenuItem>
            </Link>
          ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AuthNav;
