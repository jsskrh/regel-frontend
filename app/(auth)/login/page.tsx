"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container relative h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/register"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Signup
      </Link>
      <div
        className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
        style={{
          backgroundImage: `url('/heroes/otp.jpg')`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-zinc-900/30" />
        <Link
          href="/"
          className="relative z-20 flex items-center text-2xl font-medium"
        >
          <Image
            src="/logo.png"
            alt="Regel company logo"
            width={100}
            height={100}
            className="mr-2 h-10 w-10"
          />
          Regel Technology
        </Link>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <q className="text-lg font-medium italic">
              "Their SMS platform has revolutionized our customer engagement."
            </q>
            <footer className="text-sm font-normal">
              &mdash; Emily Chen, Marketing Manager at ABC Inc.
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 w-full flex items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}