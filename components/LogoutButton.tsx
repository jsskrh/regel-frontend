"use client";

import { useLogoutMutation } from "@/lib/features/auth/authApi";
import { logout } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export function LogoutButton() {
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
      router.push("/login");
    } catch (err) {
      console.error("Failed to logout: ", err);
    }
  };

  return (
    <button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}
