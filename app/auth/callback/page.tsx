
"use client";

import { useGetOnboardingDetailsQuery } from "@/lib/features/account/accountApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthCallbackPage = () => {
    const { data: onboardingDetails, isLoading } = useGetOnboardingDetailsQuery();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && onboardingDetails) {
            if (onboardingDetails.isComplete) {
                router.push("/dashboard");
            } else {
                router.push("/onboarding");
            }
        }
    }, [isLoading, onboardingDetails, router]);

    return <p>Please wait...</p>;
};

export default AuthCallbackPage;
