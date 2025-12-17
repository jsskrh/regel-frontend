"use client";

import { useGetAccountQuery } from "@/lib/features/account/accountApi";
import { useFindAllRolesQuery, Role } from "@/lib/features/admin/adminApi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  {
    title: "",
    items: [{ title: "Home", path: "/dashboard", icon: "home.svg" }],
  },
  {
    title: "Admin",
    items: [
      {
        title: "Users",
        path: "/admin/users",
        icon: "user-group.svg",
        role: "admin",
      },
      {
        title: "Sender ID Requests",
        path: "/admin/sender-ids",
        icon: "id-card.svg",
        role: "admin",
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
      },
      {
        title: "Add new contacts",
        path: "/contacts/add",
        icon: "user.svg",
      },
      {
        title: "Groups",
        path: "/contacts/groups",
        icon: "user-group.svg",
      },
      {
        title: "Add new group",
        path: "/contacts/groups/add",
        icon: "users.svg",
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
      },
      {
        title: "Create new otp",
        path: "/otp/send",
        icon: "mail-add.svg",
      },
      { title: "Inbox", path: "/inbox", icon: "message-alt.svg" },
      {
        title: "Sent items",
        path: "/sms",
        icon: "send-alt.svg",
      },
      {
        title: "Sender IDs",
        path: "/sender-ids",
        icon: "id-card.svg",
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
      },
      { title: "Settings", path: "/dashboard", icon: "settings.svg" },
      {
        title: "API keys",
        path: "/developer/api-key",
        icon: "settings.svg",
      },
      {
        title: "Documentation",
        path: "/docs/api",
        icon: "receipt.svg",
      },
      {
        title: "Customer support",
        path: "/dashboard",
        icon: "customer-service.svg",
      },
    ],
  },
];

const Sidebar = () => {
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useGetAccountQuery();
  console.log(user);

  // Determine if user has a role that might be admin
  // Only fetch roles if user has a role field (could be admin)
  const shouldFetchRoles = user && user.role;

  const {
    data: roles,
    isLoading: isRolesLoading,
    error: rolesError,
  } = useFindAllRolesQuery(undefined, { skip: !shouldFetchRoles });

  const pathname = usePathname();

  // Find the role name for the current user based on the role ID
  // If roles query was skipped or failed, assume user is not admin
  const userRoleName = roles?.find(
    (role: Role) => role._id === user?.role
  )?.name;

  const filteredNav = nav
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        if (item.role) {
          // Compare with role name - only show if user has matching role
          return userRoleName === item.role;
        }
        return true;
      }),
    }))
    .filter((section) => section.items.length > 0);

  // Only show loading if user is loading, or if we're fetching roles for a user with a role
  if (isUserLoading || (shouldFetchRoles && isRolesLoading)) {
    return <p>Loading sidebar...</p>;
  }

  // Only show error for user loading errors, ignore roles errors for normal users
  if (userError) {
    return <p>Error loading user data.</p>;
  }

  return (
    <div className="relative sr-only lg:not-sr-only bg-[#F9FBFC] border-r border-[#EDF2F7]">
      <div className="flex flex-col h-full">
        <div className="sticky top-0 z-10 h-screen overflow-y-scroll">
          <div className="px-8 pt-11.5 flex items-center justify-between mb-6.25">
            <div className="font-medium flex flex-col">
              <span className="leading-[150%] text-[#111928]">
                {user?.name}
              </span>
              <span className="text-xs leading-[140%] tracking-[1%] text-[#666666]">
                Regel ID: {user?._id?.slice(18, 24)}
              </span>
            </div>
            <Image
              className="size-6 ml-auto"
              src="/icons/chevron-down.svg"
              alt="chevron down icon"
              width={24}
              height={24}
              priority
            />
          </div>

          <div className="px-8 gap-y-6 flex flex-col">
            {filteredNav.map((section) => (
              <div key={section.title} className="flex flex-col gap-y-4">
                {section.title && (
                  <div className="uppercase font-semibold text-xs leading-[145%] tracking-[-5%] text-[#231F20]">
                    {section.title}
                  </div>
                )}
                <div className="flex flex-col gap-y-4">
                  {section.items.map((item) => (
                    <Link key={item.title} href={item.path}>
                      <div
                        className={`flex items-center max-lg:text-sm gap-x-2 font-semibold tracking-[-5%] leading-[145%] ${
                          pathname === item.path
                            ? "text-[#12533A]"
                            : "text-black"
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
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
