import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="h-10 border w-full border-gray-300 rounded-lg px-2.5 py-1.5">
      {/* <SearchIcon className="h-4 w-4 mr-2.5" /> */}
      <Input
        type="search"
        placeholder="Search here..."
        className="w-full h-full border-0 shadow-none font-normal text-sm leading-[145%]"
      />
    </div>
  );
};

export default SearchBar;
