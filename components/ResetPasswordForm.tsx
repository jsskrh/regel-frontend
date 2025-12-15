
"use client";

import { useAuthControllerResetPasswordMutation } from "@/lib/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [resetPassword, { isLoading, error, isSuccess }] = useAuthControllerResetPasswordMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword({ token, resetPasswordDto: { password } }).unwrap();
      router.push("/login");
    } catch (err) {
      console.error("Failed to reset password: ", err);
    }
  };

  if (isSuccess) {
    return <p>Password has been reset successfully. You can now log in.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Resetting..." : "Reset Password"}
      </button>
      {error && <p>Error: {"message" in error ? error.message : "An error occurred"}</p>}
    </form>
  );
}
