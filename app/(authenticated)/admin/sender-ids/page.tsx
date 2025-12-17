
import { AdminGuard } from "@/components/auth/AdminGuard";
import PageHeader from "@/components/common/PageHeader";
import { SenderIdsTable } from "@/components/admin/sender-ids/table";

export default function AdminSenderIdsPage() {
  return (
    <AdminGuard>
      <div>
        <PageHeader heading="Sender ID Requests" description="Manage all sender ID requests" />
        <SenderIdsTable />
      </div>
    </AdminGuard>
  );
}
