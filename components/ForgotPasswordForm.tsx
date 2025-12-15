
"use client";

import { useAuthControllerForgotPasswordMutation } from "@/lib/features/auth/authApi";
import { useState } from "react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading, error, isSuccess }] = useAuthControllerForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword({ forgotPasswordDto: { email } }).unwrap();
    } catch (err) {
      console.error("Failed to send password reset email: ", err);
    }
  };

  if (isSuccess) {
    return <p>If an account with that email exists, a password reset link has been sent.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Password Reset Email"}
      </button>
      {error && <p>Error: {"message" in error ? error.message : "An error occurred"}</p>}
    </form>
  );
}
