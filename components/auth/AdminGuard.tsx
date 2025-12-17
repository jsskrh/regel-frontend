"use client";

import { useGetAccountQuery } from "@/lib/features/account/accountApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFindAllRolesQuery, Role } from "@/lib/features/admin/adminApi";

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const { data: user, isLoading: isUserLoading } = useGetAccountQuery();
    // Only fetch roles if user data is available
    const { data: roles, isLoading: isRolesLoading } = useFindAllRolesQuery(undefined, {
        skip: !user // Skip if user data is not yet loaded
    });
    const router = useRouter();

    const userRoleName = roles?.find((role: Role) => role._id === user?.role)?.name;

    useEffect(() => {
        // Redirect if user is loaded, roles are loaded, and user is NOT an admin
        if (!isUserLoading && !isRolesLoading && user && userRoleName !== 'admin') {
            router.push("/dashboard");
        }
    }, [isUserLoading, isRolesLoading, user, userRoleName, router]);

    // Show loading state until user and roles are loaded OR if user is loaded but roles are still loading
    if (isUserLoading || (user && isRolesLoading)) {
        return <p>Loading or checking admin status...</p>;
    }

    // If user is not an admin after all checks, show unauthorized message or redirect (already handled in useEffect)
    // This is for the initial render before useEffect kicks in
    if (!user || userRoleName !== 'admin') {
        return null; // Or a generic unauthorized message, useEffect will redirect
    }

    return <>{children}</>;
}