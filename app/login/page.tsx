
import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <p>
        <Link href="/forgot-password">Forgot your password?</Link>
      </p>
    </div>
  );
}
