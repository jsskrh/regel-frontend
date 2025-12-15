
"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !isAuthenticated) {
      router.push("/login");
    }
  }, [isClient, isAuthenticated, router]);

  if (!isClient || !isAuthenticated) {
    return <p>Loading...</p>; // Or a spinner, or null
  }

  return <>{children}</>;
}
