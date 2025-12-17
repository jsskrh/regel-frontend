
import { AdminGuard } from "@/components/auth/AdminGuard";
import { UserDashboard } from "@/components/admin/UserDashboard";
import PageHeader from "@/components/common/PageHeader";

export default function AdminUsersPage() {
  return (
    <AdminGuard>
      <div>
        <PageHeader heading="User Dashboard" />
        <UserDashboard />
      </div>
    </AdminGuard>
  );
}
