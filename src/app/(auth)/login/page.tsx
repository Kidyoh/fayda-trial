"use client";
import { apiUrl } from "@/apiConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { signInInfoSchema } from "../../validation/signinValidation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Phone, ArrowRight, Loader2 } from "lucide-react";
import { setAccessToken } from "../../../lib/tokenManager";
import { motion } from "framer-motion";

type SignInMethod = "email" | "phone";

interface SignInInputs {
  email?: string;
  phoneNumber?: string;
  password: string;
}

export default function LoginPage() {
  const [signInMethod, setSignInMethod] = useState<SignInMethod>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<SignInInputs>({
    defaultValues: {
      email: "",
      phoneNumber: "",
      password: "",
    },
    resolver: zodResolver(signInInfoSchema),
  });

  const { push } = useRouter();

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const responseData = await response.json();
      console.log(responseData);

      // Handle the new response structure
      if (responseData.success && responseData.data) {
        setAccessToken(responseData.data.accessToken);
      } else {
        throw new Error("Invalid response structure");
      }

      toast({
        title: "Success!",
        description: "Login successful. Redirecting...",
      });

      window.location.href = "/";
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <img
          className="mx-auto h-16 w-auto"
          src="/common_files/main/fayida_logo.png"
          alt="Fayida Academy"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to continue your learning journey
        </p>
      </motion.div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10"
        >
          <div className="flex justify-center space-x-4 mb-8">
            <button
              type="button"
              onClick={() => {
                setSignInMethod("email");
                clearErrors();
              }}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                signInMethod === "email"
                  ? "bg-primaryColor text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Mail className="w-5 h-5 mr-2" />
              Email
            </button>
            <button
              type="button"
              onClick={() => {
                setSignInMethod("phone");
                clearErrors();
              }}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                signInMethod === "phone"
                  ? "bg-primaryColor text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Phone className="w-5 h-5 mr-2" />
              Phone
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-600">{errors.root.message}</p>
              </div>
            )}

            {signInMethod === "email" ? (
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    {...register("email")}
                    type="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primaryColor focus:border-primaryColor"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone number
                </label>
                <div className="mt-1">
                  <input
                    {...register("phoneNumber")}
                    type="tel"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primaryColor focus:border-primaryColor"
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primaryColor focus:border-primaryColor"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-primaryColor hover:text-primaryColor/80"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primaryColor hover:bg-primaryColor/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  New to Fayida?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/signup">
                <button className="w-full flex justify-center items-center px-4 py-2 border-2 border-primaryColor rounded-lg text-sm font-medium text-primaryColor hover:bg-primaryColor/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor">
                  Create an account
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
