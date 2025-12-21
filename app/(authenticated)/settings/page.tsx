
import PageHeader from "@/components/common/PageHeader";
import { ProfileForm } from "@/components/settings/ProfileForm";
import { PasswordForm } from "@/components/settings/PasswordForm";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences."
        className="mb-6"
      />
      <div className="grid gap-6">
        <ProfileForm />
        <PasswordForm />
      </div>
    </div>
  );
}
