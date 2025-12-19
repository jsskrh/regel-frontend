"use client";

import { DocsNav } from "@/components/layout/DocsNav";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/layout/SearchBar";

const DocsHeader = () => {
  return (
    <header className="w-full flex items-center z-10 mb-12.5 h-20">
      <div className="p-4 fixed top-0 lg:px-0 flex justify-between items-center max-lg:w-full lg:left-[269px] lg:right-0 bg-white gap-x-7.5 pt-7.5 px-6 lg:px-12 border-b border-neutral-200">
        <Link href={`/`} className="flex items-center lg:hidden">
          <Image
            className="size-10"
            src="/logo.png"
            alt="Regel technology logo"
            width={40}
            height={40}
            priority
          />
        </Link>
        <div className="flex-1 max-w-112.5">
          <SearchBar />
        </div>
        <div className="flex items-center gap-x-4">
          <DocsNav />
        </div>
      </div>
    </header>
  );
};

export default DocsHeader;
