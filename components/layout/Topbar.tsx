import Link from "next/link";
import { Search, Menu, ChevronRightIcon } from "lucide-react";
import { UserNav } from "./UserNav";

const Topbar = ({ onToggleSidebar }) => {
  return (
    <header className="h-14 bg-white border-b border-gray-200 sr-only md:not-sr-only">
      <div className="container w-full px-4 flex items-center justify-between md:flex-row flex-col">
        <div className=" flex items-center space-x-4">
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <div className="relative py-2 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 border py-1  border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <UserNav />
          {/* <ThemeToggle /> */}
          {/* <Button variant="outline" size="xs" onClick={onToggleSidebar}>
            <ChevronRightIcon className="h-4 w-4" />
          </Button> */}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
