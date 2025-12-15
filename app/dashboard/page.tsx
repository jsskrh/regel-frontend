
import { AuthGuard } from "@/components/AuthGuard";
import { LogoutButton } from "@/components/LogoutButton";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        <LogoutButton />
      </div>
    </AuthGuard>
  );
}
