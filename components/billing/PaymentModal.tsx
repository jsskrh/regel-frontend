
"use client";

import { useState } from "react";
import { useInitializePaymentMutation } from "@/lib/features/payments/paymentsApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function PaymentModal() {
  const [amount, setAmount] = useState(0);
  const [initializePayment, { isLoading }] = useInitializePaymentMutation();
  const router = useRouter();

  const handlePayment = async () => {
    try {
      const result = await initializePayment({ initializePaymentDto: { amount } }).unwrap();
      if (result.authorization_url) {
        router.push(result.authorization_url);
      }
    } catch (err) {
      toast.error(err.data?.message || "An error occurred during payment initialization.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Fund Wallet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Fund your wallet</DialogTitle>
          <DialogDescription>
            Enter the amount you want to add to your wallet.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handlePayment} disabled={isLoading}>
            {isLoading ? "Initializing..." : "Proceed to Payment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
