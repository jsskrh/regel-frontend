"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fetchCampaignsByUser } from "@/actions/campaign";
import { Message, columns } from "./columns";
import { DataTable } from "@/components/common/data-table";
import { DataTableToolbar } from "@/components/common/data-table-toolbar";
import { DataTablePagination } from "@/components/common/data-table-pagination";

const Messages = () => {
  const { data: session } = useSession();
  const [smsHistory, setSmsHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = session?.user?.id;
  const [groups, setGroups] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: smsHistory,
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
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // useEffect(() => {
  //   if (id) {
  //     const fetchData = async () => {
  //       try {
  //         const res = await fetchCampaignsByUser(
  //           id,
  //           pagination.pageIndex + 1,
  //           pagination.pageSize
  //         );

  //         setSmsHistory(res.campaigns);
  //       } catch (error) {
  //         console.error("Error fetching smsHistory:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchData();
  //   } else {
  //     console.error("No user ID found.");
  //     setLoading(false);
  //   }
  // }, [id, pagination.pageIndex, pagination.pageSize]);

  return (
    <div className="mb-6 space-y-5">
      <DataTableToolbar
        data={smsHistory}
        table={table}
        placeholder="Search SMS"
        buttonText="Send new SMS"
        col="title"
        link="/clients/sms/add"
      />
      <DataTable columns={columns} data={smsHistory} table={table} />
      <DataTablePagination table={table} />
    </div>
  );
};

export default Messages;
