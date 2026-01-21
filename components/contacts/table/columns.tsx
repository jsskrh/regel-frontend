"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/ui/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import ContactActions from "./contact-actions";
import { Contact } from "@/lib/features/contacts/types";

export const columns: ColumnDef<Contact>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const fullName = `${row.original.firstName || ""} ${row.original.lastName || ""}`.trim();
      return (
        <div className="text-[#101928] text-sm leading-[145%]">
          {fullName || "N/A"}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone no" />
    ),
    cell: ({ row }) => (
      <div className="text-[#101928] text-sm leading-[145%]">
        {row.getValue("phoneNumber")}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contact = row.original;
      return <ContactActions contactId={contact._id} />;
    },
  },
];