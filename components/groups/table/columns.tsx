
"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "@/components/ui/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import GroupActions from "./group-actions";
import { ContactList } from "@/lib/features/contacts/contactsApi";

export const columns: ColumnDef<ContactList>[] = [
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
    cell: ({ row }) => (
      <div className="text-[#101928] text-sm leading-[145%]">
        {row.getValue("name")}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "contacts",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number of Contacts" />
    ),
    cell: ({ row }) => (
      <div className="text-[#101928] text-sm leading-[145%]">
        {row.original.contacts?.length ?? 0}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="text-[#101928] text-sm leading-[145%]">
        {row.getValue("description")}
      </div>
    ),
    enableSorting: true,
    enableHiding: true, // Assuming description might be long, so allowing it to be hidden by default
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const group = row.original;
      return <GroupActions groupId={group._id} />;
    },
  },
];
