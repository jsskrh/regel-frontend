"use client";

import { useRouter } from "next/navigation";
import { MoreVertical } from "lucide-react";
import { useDeleteContactMutation } from "@/lib/features/contacts/contactsApi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const ContactActions = ({ contactId }: { contactId: string }) => {
  const router = useRouter();
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await deleteContact({ id: contactId }).unwrap();
      toast.success("Contact deleted successfully!");
    } catch (err) {
      toast.error(
        err.data?.message || "An error occurred while deleting the contact"
      );
      console.error("Error deleting contact:", err);
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
          onClick={() => router.push(`/contacts/edit/${contactId}`)}
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

export default ContactActions;
