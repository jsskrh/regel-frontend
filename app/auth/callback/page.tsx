"use client";

import { useGetAccountQuery } from "@/lib/features/account/accountApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthCallbackPage = () => {
  const { data: user, isLoading, isSuccess } = useGetAccountQuery();
  const router = useRouter();

  const isComplete =
    user &&
    user.company &&
    user.website &&
    user.cacDocumentUrl &&
    user.samplePromotionalMessage &&
    user.sampleTransactionalMessage &&
    user.estimatedMonthlySms;

  useEffect(() => {
    if (isSuccess && user) {
      if (isComplete) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    }
  }, [isSuccess, user, isComplete, router]);

  return <p>Please wait...</p>;
};

export default AuthCallbackPage;
