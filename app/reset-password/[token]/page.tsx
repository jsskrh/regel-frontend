
import { ResetPasswordForm } from "@/components/ResetPasswordForm";

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  return (
    <div>
      <h1>Reset Password</h1>
      <ResetPasswordForm token={params.token} />
    </div>
  );
}
