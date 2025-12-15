"use client";

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { LogoutButton } from "../LogoutButton";

const Nav = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Bulk SMS",
      href: "#bulkSms",
      description:
        "Send unlimited messages to your customers at the click of a button.",
    },
    {
      title: "OTP Notifications",
      href: "#otp",
      description: "Enable verification by sending secure one-time passcodes.",
    },
    {
      title: "International Airtime & E-sim",
      href: "#airtime",
      description: "Coming soon",
    },
  ];

  return (
    <div className="grid justify-items-end">
      {isAuthenticated && <Sidebar />}

      <div className="max-lg:hidden flex items-center">
        {!isAuthenticated ? (
          <>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-base font-normal">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] bg-white gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#whoWeAre" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} bg-transparent font-normal! text-base!`}
                    >
                      Who we are
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#howItWorks" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} bg-transparent font-normal! text-base!`}
                    >
                      How it works
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-4 ml-4">
              <Link href="/login">
                <Button className="text-black" variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="" variant="black" size="sm">
                  Sign up
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4 ml-4">
            <Link href="/dashboard">
              <Button className="text-black" variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
            <LogoutButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
