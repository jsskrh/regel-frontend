import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to Regel</h1>
      <p>
        <Link href="/login">Login</Link> or{" "}
        <Link href="/register">Register</Link>
      </p>
    </main>
  );
}
