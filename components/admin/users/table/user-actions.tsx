
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical } from "lucide-react";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useFindAllRolesQuery,
} from "@/lib/features/admin/adminApi";
import { AdminUser } from "@/lib/features/admin/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UserActions({ user }: { user: AdminUser }) {
  const router = useRouter();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const { data: roles } = useFindAllRolesQuery();
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete user ${user.name}?`
    );
    if (isConfirmed) {
      try {
        await deleteUser({ id: user._id }).unwrap();
        toast.success("User deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete user.");
      }
    }
  };

  const handleRoleChange = async () => {
    try {
      await updateUser({ id: user._id, updateUserDto: { role: selectedRole } }).unwrap();
      toast.success("User role updated successfully!");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to update user role.");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
            Edit Role
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete} disabled={isDeleting}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role for {user.name}</DialogTitle>
          </DialogHeader>
          <div>
            <Label>Role</Label>
            <Select onValueChange={setSelectedRole} defaultValue={selectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles?.map((role) => (
                  <SelectItem key={role._id} value={role._id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleRoleChange} disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
