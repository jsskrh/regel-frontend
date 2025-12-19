import Link from "next/link";
import {
  MessagesSquare,
  Search,
  LayoutDashboard,
  ShoppingCart,
  UsersRound,
  Settings,
  ChevronRight,
  CircleChevronUpIcon,
} from "lucide-react";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SideNavItem } from "@/routes";
import { useSession } from "next-auth/react";

const SideNavBar = () => {
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenuItems, setActiveMenuItems] = useState({});

  const userRole = session?.user?.role;

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSubmenu = (title) => {
    setActiveMenuItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div
      className={cn(
        "flex-col items-center relative border-r border-r-border pb-10 hidden md:block p-4 top-0 left-0 md:transition-width duration-500 ease-out",
        isCollapsed ? "w-22" : "w-64"
      )}
    >
      {/* Toggle button */}
      <div className="absolute right-[-20px] top-7 rounded-full p-1 bg-slate-100">
        {/* <Button
          onClick={toggleSidebar}
          variant="secondary"
          className="rounded-full px-2 bg-red-500"
        >
          <ChevronRight className={isCollapsed ? "" : "  rotate-180"} />
        </Button> */}
        <ChevronRight
          className={isCollapsed ? "" : "  rotate-180"}
          onClick={toggleSidebar}
        />
      </div>

      {/* Profile */}
      <div
        className={cn(
          "flex h-[52px] items-center justify-center",
          isCollapsed ? "h-[52px]" : "px-2"
        )}
      >
        <Button
          variant="outline"
          role="combobox"
          className={cn("flex justify-between w-full ")}
        >
          <Avatar className="mr-2 h-8 w-8">
            <AvatarImage src="/regel.jpeg" alt="Me" className="" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {isCollapsed ? null : (
            <>
              <span className="hidden md:block">Regel</span>
              <CircleChevronUpIcon className="ml-auto h-5 w-5 shrink-0 opacity-50" />
            </>
          )}
        </Button>
      </div>

      <Separator className="my-2" />

      <Nav isCollapsed={isCollapsed} links={SideNavItem} userRole={userRole} />

      {!isCollapsed && (
        <div className="flex justify-center absolute bottom-0 left-0 right-0 m-4">
          <Card className="pb-3 md:block">
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SideNavBar;
