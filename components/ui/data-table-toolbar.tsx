import Link from "next/link";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  placeholder?: string;
  button?: string;
  link?: string;
  col: string;
}

export function DataTableToolbar<TData>({
  data,
  table,
  placeholder = "Search",
  buttonText = "Add",
  button,
  col = "name",
  link = "",
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col-reverse gap-y-4 lg:flex-row lg:items-center lg:justify-between border-b border-b-[#F0F2F5] pb-2">
      <div className="flex flex-1 items-center space-x-2">
        <div className="h-9 border w-full lg:w-[250px] flex items-center justify-center border-gray-300 rounded-lg px-2.5 py-1.5">
          {/* <SearchIcon className="h-4 w-4 mr-2.5" /> */}
          <Input
            placeholder={placeholder}
            value={(table.getColumn(col)?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              const value = event.target.value;
              table.getColumn(col)?.setFilterValue(value);
            }}
            className="h-9 w-full lg:w-[250px] border-0 shadow-none"
          />
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-2 lg:px-3 border-[#F0F2F5]"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex gap-x-2">
        {button ?? (
          <Link href={link}>
            <Button
              variant="primary"
              className=" font-medium text-sm leading-[150%] bg-[#12533A] h-9 rounded-lg text-white"
            >
              <Plus className="size-3" />
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
