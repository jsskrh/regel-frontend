import PageHeader from "@/components/common/PageHeader";
import { OnboardingGuard } from "@/components/onboarding/OnboardingGuard";

export default function SenderIdsPage() {
  return (
    <OnboardingGuard>
      <div>
        <PageHeader
          title="Sender IDs"
          description="Manage your sender IDs"
          className="mb-6"
        />
        {/* Sender ID content will go here */}
        <p>This page is protected by the onboarding guard.</p>
      </div>
    </OnboardingGuard>
  );
}