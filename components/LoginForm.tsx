"use client";

import { useLoginMutation } from "@/lib/features/auth/authApi";
import { setTokens } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ loginDto: { email, password } }).unwrap();
      if (result.accessToken && result.refreshToken) {
        dispatch(
          setTokens({
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
          })
        );
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Failed to login: ", err);
    }
  };

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
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {error && (
        <p>Error: {"message" in error ? error.message : "An error occurred"}</p>
      )}
    </form>
  );
}
