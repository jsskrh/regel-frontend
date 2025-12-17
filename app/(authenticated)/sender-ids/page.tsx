
import PageHeader from "@/components/common/PageHeader";
import { OnboardingGuard } from "@/components/onboarding/OnboardingGuard";
import { SenderIdRequestForm } from "@/components/sender-ids/SenderIdRequestForm";
import { SenderIdsTable } from "@/components/sender-ids/table";

export default function SenderIdsPage() {
  return (
    <OnboardingGuard>
      <div>
        <div className="flex justify-between items-center mb-6">
            <PageHeader
            title="Sender IDs"
            description="Manage your sender IDs"
            />
            <SenderIdRequestForm />
        </div>
        <SenderIdsTable />
      </div>
    </OnboardingGuard>
  );
}
