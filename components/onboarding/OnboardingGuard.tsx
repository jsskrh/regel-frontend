"use client";

import { useGetAccountQuery } from "@/lib/features/account/accountApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, isSuccess } = useGetAccountQuery();
  const router = useRouter();

  const isComplete = user &&
    user.company &&
    user.website &&
    user.cacDocumentUrl &&
    user.samplePromotionalMessage &&
    user.sampleTransactionalMessage &&
    user.estimatedMonthlySms;

  useEffect(() => {
    if (isSuccess && !isComplete) {
      router.push("/onboarding");
    }
  }, [isSuccess, isComplete, router]);

  if (isLoading) {
    return <p>Loading onboarding status...</p>;
  }

  if (isSuccess && isComplete) {
    return <>{children}</>;
  }
  
  return <p>Verifying onboarding status...</p>;
}