import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageOptions = Array.from({ length: pageCount }, (_, i) => i + 1);

  const getPaginationNumbers = () => {
    if (pageCount <= 7) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, "...", pageCount - 2, pageCount - 1, pageCount];
    }

    if (currentPage >= pageCount - 2) {
      return [1, 2, 3, "...", pageCount - 2, pageCount - 1, pageCount];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      pageCount,
    ];
  };

  const paginationNumbers = getPaginationNumbers();

  return (
    <div className="flex items-center justify-center px-2 border-t border-t-[#F0F2F5] pt-2">
      <div className="flex items-center space-x-6">
        <div className="flex w-[100px] items-center justify-center text-sm font-semibold leading-[145%]">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            className="size-9 p-0 rounded-md border-[#D0D5DD]"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <Minus />
          </Button>
          {paginationNumbers.map((pageNum, index) =>
            pageNum === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="size-6 flex items-center justify-center"
              >
                ...
              </span>
            ) : (
              <Button
                key={`page-${pageNum}`}
                variant="outline"
                className={`size-6 p-0 text-sm leading-[145%] rounded-md ${
                  currentPage === pageNum
                    ? "border-[#12533a] text-[#12533a]"
                    : "border-transparent text-[#98A2B3]"
                }`}
                onClick={() => table.setPageIndex(Number(pageNum) - 1)}
              >
                {pageNum}
              </Button>
            )
          )}
          <Button
            variant="outline"
            className="size-9 p-0 rounded-md border-[#D0D5DD]"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <Plus />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <p className="text-sm leading-[145%]">Go to page</p>
          <Select
            value={`${table.getState().pagination.pageIndex + 1}`}
            onValueChange={(value) => {
              table.setPageIndex(Number(value) - 1);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue
                placeholder={table.getState().pagination.pageIndex + 1}
              />
            </SelectTrigger>
            <SelectContent side="top" className="max-h-48 overflow-y-auto">
              {pageOptions.map((pageNum) => (
                <SelectItem key={pageNum} value={`${pageNum}`}>
                  {pageNum}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
