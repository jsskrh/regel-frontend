
"use client";

import PageHeader from "@/components/common/PageHeader";
import OtpForm from "@/components/otp/OtpForm";
import BalanceInfo from "@/components/common/BalanceInfo"; // Import the common BalanceInfo
import { useGetAccountQuery } from "@/lib/features/account/accountApi";

const PER_OTP_COST = 8; // Assuming 8 naira per SMS

export default function AddOtp() {
  const { data: accountDetails } = useGetAccountQuery();
  const currentBalance = accountDetails?.balance ?? 0;

  return (
    <div className="space-y-6 relative">
      <PageHeader title="Send OTP" description="Create new OTP" />
      <BalanceInfo score={PER_OTP_COST} maxScore={currentBalance} />
      <OtpForm />
    </div>
  );
}
