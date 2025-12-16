"use client";

import { AuthGuard } from "@/components/AuthGuard";
import AuthHeader from "@/components/layout/AuthHeader";
import FooterBar from "@/components/layout/FooterBar";
import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isRightSidebarVisible, setRightSidebarVisible] = useState(false);

  const toggleRightSidebar = () => {
    setRightSidebarVisible((prev) => !prev);
  };

  return (
    <AuthGuard>
      <div className="lg:grid min-h-screen grid-cols-[269px_1fr] max-lg:mt-31.25">
        <Sidebar />
        <div className="flex flex-col md:flex-1 relative lg:px-12 lg:pl-31.75">
          <AuthHeader />
          <div className="p-4 md:p-6 lg:p-8 lg:px-0 items-center justify-center rounded w-full  min-h-screen overflow-y-auto">
            {children}
          </div>
          <FooterBar />
        </div>
        {/* {isRightSidebarVisible  && <RightSideBar />} */}
      </div>
    </AuthGuard>
  );
}
