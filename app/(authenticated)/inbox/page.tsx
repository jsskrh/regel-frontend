import PageHeader from "@/components/common/PageHeader";
import MessagesTable from "@/components/sms/table/index";

export default function SmsHistory() {
  return (
    <div>
      <PageHeader
        title="Sent SMS"
        description="Manage replies from campaign"
        className="mb-6"
      />
      <MessagesTable />
    </div>
  );
}
