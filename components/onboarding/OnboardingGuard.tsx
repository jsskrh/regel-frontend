
"use client";

import { useGetOnboardingDetailsQuery } from "@/lib/features/account/accountApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { data: onboardingDetails, isLoading } = useGetOnboardingDetailsQuery();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && onboardingDetails && !onboardingDetails.isComplete) {
      router.push("/onboarding");
    }
  }, [isLoading, onboardingDetails, router]);

  if (isLoading || !onboardingDetails || !onboardingDetails.isComplete) {
    return <p>Loading...</p>; // Or a spinner
  }

  return <>{children}</>;
}
