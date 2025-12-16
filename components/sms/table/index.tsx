"use client";

import { useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import { useGetMessagesQuery } from "@/lib/features/messaging/messagingApi";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { DataTableToolbar } from "@/components/ui/data-table-toolbar";
import { DataTablePagination } from "@/components/ui/data-table-pagination";

const MessagesTable = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: response, isLoading } = useGetMessagesQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });
  const messages = response?.data || [];
  const totalMessages = response?.total || 0;

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: messages,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    onPaginationChange: setPagination,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // Need to manually handle pagination
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    pageCount: Math.ceil(totalMessages / pagination.pageSize), // Set pageCount for manual pagination
    manualPagination: true,
  });

  if (isLoading) {
    return <p>Loading messages...</p>;
  }

  return (
    <div className="mb-6 space-y-5">
      <DataTableToolbar
        table={table}
        placeholder="Search SMS"
        buttonText="Send new SMS"
        link="/sms/add"
      />
      <DataTable columns={columns} data={messages} table={table} />
      <DataTablePagination table={table} />
    </div>
  );
};

export default MessagesTable;
