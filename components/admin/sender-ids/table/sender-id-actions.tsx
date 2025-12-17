
"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { useUpdateSenderIdStatusMutation } from "@/lib/features/senderIds/senderIdsApi";
import { SenderIdRequest, SenderIdStatus } from "@/lib/features/senderIds/types";
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
import { Textarea } from "@/components/ui/textarea";

export function SenderIdActions({ request }: { request: SenderIdRequest }) {
  const [updateStatus, { isLoading }] = useUpdateSenderIdStatusMutation();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleUpdateStatus = async (status: SenderIdStatus) => {
    try {
      if (status === SenderIdStatus.REJECTED && !rejectionReason) {
        toast.error("Rejection reason is required.");
        return;
      }
      await updateStatus({
        id: request._id,
        updateSenderIdDto: { status, rejectionReason },
      }).unwrap();
      toast.success(`Sender ID request ${status.toLowerCase()}d!`);
      setIsRejectModalOpen(false);
    } catch (err) {
      toast.error(err.data?.message || "Failed to update sender ID status.");
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
          {request.status === SenderIdStatus.PENDING && (
            <>
              <DropdownMenuItem onClick={() => handleUpdateStatus(SenderIdStatus.APPROVED)} disabled={isLoading}>
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsRejectModalOpen(true)}>
                Reject
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          {request.status !== SenderIdStatus.PENDING && (
              <DropdownMenuItem disabled>Status: {request.status}</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Sender ID Request</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="rejectionReason">Reason for Rejection</Label>
            <Textarea
              id="rejectionReason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter reason for rejection"
            />
          </div>
          <Button onClick={() => handleUpdateStatus(SenderIdStatus.REJECTED)} disabled={isLoading || !rejectionReason}>
            {isLoading ? "Rejecting..." : "Confirm Rejection"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
