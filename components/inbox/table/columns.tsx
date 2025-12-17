"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import moment from "moment";
import DataTableColumnHeader from "@/components/common/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { Checkbox } from "@/components/common/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/common/dropdown-menu";

export type Recipient = {
  messageId: string;
  number: string;
  cost: string;
  status: string;
  statusCode: number;
};

export type Message = {
  _id: string;
  senderId: string;
  title: string;
  message: string;
  status: string;
  type: string;
  from: string;
  unicode: boolean;
  credit: number;
  recipients: Recipient[];
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Message>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="text-[#101928] text-sm leading-[145%] whitespace-nowrap">
        {row.getValue("title")}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "from",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sender ID" />
    ),
    cell: ({ row }) => (
      <div className="text-[#101928] text-sm leading-[145%]">
        {row.getValue("from")}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => (
      <div className="text-[#101928] text-sm leading-[145%]">
        {row.getValue("type")}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "message",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Message" />
    ),
    cell: ({ row }) => (
      <div className="min-w-78 flex flex-col text-sm leading-[145%] text-[#666666]">
        <span className="text-[#08261C] font-medium">{row.original.title}</span>
        <span className="line-clamp-1">{row.getValue("message")}</span>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span
          className="text-xs capitalize leading-[150%] font-medium px-2.5 py-0.5 rounded-md"
          style={{
            color:
              row.getValue("status") === "sent"
                ? "#12533A"
                : row.getValue("status") === "pending"
                  ? "#723B13"
                  : "#9B1C1C",
            backgroundColor:
              row.getValue("status") === "sent"
                ? "#EEFBF4"
                : row.getValue("status") === "pending"
                  ? "#FDF6B2"
                  : "#FDE8E8",
          }}
        >
          {row.getValue("status")}
        </span>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sent at" />
    ),
    cell: ({ row }) => (
      <div className="text-[#101928] text-sm leading-[145%] whitespace-nowrap">
        {moment(row.getValue("createdAt")).format("ll")}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="size-8 p-0 border-[#E4E7EC] rounded-md"
            >
              <span className="sr-only">Open menu</span>
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem> */}
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
            {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
