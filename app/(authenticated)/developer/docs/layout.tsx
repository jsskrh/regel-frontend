"use client";

import { useState } from "react";
import DocsHeader from "@/components/layout/DocsHeader";
import FooterBar from "@/components/layout/FooterBar";
import RightSideBar from "@/components/layout/RightSidebar";
import Sidebar from "@/components/layout/Sidebar";
import { AuthGuard } from "@/components/AuthGuard";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isRightSidebarVisible, setRightSidebarVisible] = useState(false);

  const toggleRightSidebar = () => {
    setRightSidebarVisible((prev) => !prev);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen grid-cols-[269px_1fr] max-md:mt-15 pb-5">
        {/* <Sidebar /> */}
        <div className="flex flex-col gap-7.5 md:flex-1 relative lg:pl-0">
          <DocsHeader />
          <div className="p-4 md:p-6 lg:p-8 lg:px-12 pt-0 items-center justify-center rounded w-full min-h-screen overflow-y-auto">
            {children}
          </div>
          <FooterBar />
        </div>
        {/* {isRightSidebarVisible && <RightSideBar />} */}
      </div>
    </AuthGuard>
  );
};

export default DashboardLayout;
