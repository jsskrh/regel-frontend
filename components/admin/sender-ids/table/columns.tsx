
"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/ui/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { SenderIdRequest, SenderIdStatus } from "@/lib/features/senderIds/types";
import { SenderIdActions } from "./sender-id-actions";
import moment from "moment";

export const columns: ColumnDef<SenderIdRequest>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "senderIdString",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sender ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("senderIdString")}</div>,
  },
  {
    accessorKey: "userId.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Name" />
    ),
    cell: ({ row }) => <div>{row.original.userId.name}</div>,
  },
  {
    accessorKey: "userId.email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Email" />
    ),
    cell: ({ row }) => <div>{row.original.userId.email}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <span
          className="text-xs capitalize leading-[150%] font-medium px-2.5 py-0.5 rounded-md"
          style={{
            color:
              row.getValue("status") === SenderIdStatus.APPROVED
                ? "#12533A"
                : row.getValue("status") === SenderIdStatus.PENDING
                  ? "#723B13"
                  : "#9B1C1C",
            backgroundColor:
              row.getValue("status") === SenderIdStatus.APPROVED
                ? "#EEFBF4"
                : row.getValue("status") === SenderIdStatus.PENDING
                  ? "#FDF6B2"
                  : "#FDE8E8",
          }}
        >
          {row.getValue("status")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested At" />
    ),
    cell: ({ row }) => <div>{moment(row.getValue("createdAt")).format("ll")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <SenderIdActions request={row.original} />,
  },
];
