
"use client";

import { useRouter } from "next/navigation";
import { MoreVertical } from "lucide-react";
import { useDeleteContactListMutation } from "@/lib/features/contacts/contactsApi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const GroupActions = ({ groupId }: { groupId: string }) => {
  const router = useRouter();
  const [deleteGroup, { isLoading }] = useDeleteContactListMutation();

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this group?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await deleteGroup({ id: groupId }).unwrap();
      toast.success("Group deleted successfully!");
    } catch (err) {
      toast.error(
        err.data?.message || "An error occurred while deleting the group"
      );
      console.error("Error deleting group:", err);
    }
  };

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
      <DropdownMenuContent className="border-neutral-200" align="end">
        <DropdownMenuItem
          onClick={() => router.push(`/contacts/groups/edit/${groupId}`)}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GroupActions;
