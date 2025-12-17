
"use client";

import { useGetDashboardStatsQuery } from "@/lib/features/admin/adminApi";
import { CardDetails } from "@/components/ui/card";
import { Activity, UserPlus, Users, UserX } from "lucide-react";
import { UsersTable } from "./users/table";

export function UserDashboard() {
  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  const cardData = [
    {
      title: "Total Users",
      icon: Users,
      value: stats?.totalUsers ?? 0,
      description: "All registered users",
      iconColor: "text-blue-500",
    },
    {
      title: "Active Users",
      icon: Activity,
      value: stats?.activeUsers ?? 0,
      description: "Users active in the last 30 days",
      iconColor: "text-green-500",
    },
    {
      title: "New Sign-ups",
      icon: UserPlus,
      value: stats?.newSignups ?? 0,
      description: "Users signed up in the last 30 days",
      iconColor: "text-yellow-500",
    },
    {
      title: "Inactive Users",
      icon: UserX,
      value: stats?.inactiveUsers ?? 0,
      description: "Users not active in the last 30 days",
      iconColor: "text-red-500",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((data, index) => (
          <CardDetails
            key={index}
            title={data.title}
            icon={data.icon}
            iconColor={data.iconColor}
          >
            <div className="text-2xl font-bold">{data.value}</div>
            <p className="text-xs text-muted-foreground">{data.description}</p>
          </CardDetails>
        ))}
      </div>
      <UsersTable />
    </section>
  );
}
