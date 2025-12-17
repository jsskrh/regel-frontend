import PageHeader from "@/components/common/PageHeader";
import { SmsForm } from "@/components/sms/SmsForm";

export default function AddSms() {
  return (
    <div className="space-y-6 relative">
      <PageHeader title="Send SMS" description="Create new SMS" />
      <SmsForm />
    </div>
  );
}