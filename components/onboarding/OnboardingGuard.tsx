"use client";

import { useGetOnboardingDetailsQuery } from "@/lib/features/account/accountApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { data: onboardingDetails, isLoading, isSuccess } = useGetOnboardingDetailsQuery();
  const router = useRouter();

  useEffect(() => {
    // Wait until the query is successful and then check the status
    if (isSuccess && onboardingDetails && !onboardingDetails.isComplete) {
      router.push("/onboarding");
    }
  }, [isSuccess, onboardingDetails, router]);

  // If loading, show a loading indicator
  if (isLoading) {
    return <p>Loading onboarding status...</p>;
  }

  // If the query is successful and onboarding is complete, show the children
  if (isSuccess && onboardingDetails?.isComplete) {
    return <>{children}</>;
  }
  
  // In other cases (e.g., redirecting), show a loading/placeholder message
  return <p>Verifying onboarding status...</p>;
}