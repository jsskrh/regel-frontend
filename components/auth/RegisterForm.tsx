"use client";

import { useRegisterMutation } from "@/lib/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { Button } from "../ui/button";

const signupSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .regex(
        /^[a-zA-Z0-9_ ]+$/,
        "Name can only contain letters, numbers, and underscores"
      ),
    email: z
      .string()
      .email(
        "Please enter a valid email address (e.g., user@regeltechnology.com)"
      ),
    phoneNumber: z
      .string()
      .regex(
        /^\\+\d{13}$/,
        "Phone number must be in E.164 format (e.g., +2348012345678)"
      ),
    terms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must accept the terms and conditions"
      ),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export function RegisterForm() {
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phoneNumber: "",
    terms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      signupSchema.parse(formData);
      await register({ createUserDto: formData }).unwrap();
      toast.success("Sign up successful");
      setFormData({
        password: "",
        confirmPassword: "",
        name: "",
        email: "",
        phoneNumber: "",
        terms: false,
      });
      router.push("/login");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        err.issues.forEach((error) => {
          if (error.path[0]) {
            formattedErrors[error.path[0]] = error.message;
          }
        });
        setErrors(formattedErrors);
      } else if (err.data && err.data.message) {
        toast.error(err.data.message);
      } else {
        console.error("Failed to register: ", err);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="me@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phoneNumber">Phone</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+2348012345678"
            maxLength={14}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            className="w-5 h-5"
            name="terms"
            checked={formData.terms}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, terms: checked as boolean })
            }
          />

          <Label htmlFor="termsAndConditions">I agree to the</Label>
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-default"
            target="_blank"
          >
            Terms of Service
          </Link>
          <Label htmlFor="termsAndConditions">and</Label>
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-default"
            target="_blank"
          >
            Privacy Policy
          </Link>
        </div>
        {errors.terms && <p className="text-red-500">{errors.terms}</p>}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={!formData.terms || isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </CardFooter>
      <CardFooter className="flex-col">
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-default"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-default"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <p className="text-center text-sm mt-4">
          Already a Member?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
