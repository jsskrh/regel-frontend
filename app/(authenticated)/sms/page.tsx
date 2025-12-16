import PageHeader from "@/components/common/PageHeader";
import MessagesTable from "@/components/sms/table/index";

export default function SmsHistory() {
  return (
    <div>
      <PageHeader
        title="Sent SMS"
        description="Manage your sms history"
        className="mb-6"
      />
      <MessagesTable />
    </div>
  );
}
