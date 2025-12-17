
"use client";

import { useGetAccountQuery } from "@/lib/features/account/accountApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFindAllRolesQuery, Role } from "@/lib/features/admin/adminApi";

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const { data: user, isLoading: isUserLoading } = useGetAccountQuery();
    const { data: roles, isLoading: isRolesLoading } = useFindAllRolesQuery();
    const router = useRouter();

    const userRoleName = roles?.find((role: Role) => role._id === user?.role)?.name;

    useEffect(() => {
        if (!isUserLoading && !isRolesLoading && userRoleName !== 'admin') {
            router.push("/dashboard");
        }
    }, [isUserLoading, isRolesLoading, userRoleName, router]);

    if (isUserLoading || isRolesLoading || userRoleName !== 'admin') {
        return <p>Loading or checking admin status...</p>;
    }

    return <>{children}</>;
}
