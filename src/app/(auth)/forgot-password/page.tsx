"use client";
import { apiUrl } from "@/apiConfig";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailValidationSchema } from "../../validation/email_aloneValidation";
import { Mail, KeyRound, ArrowRight, Check, Info } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import ChangeForgotPassword from "./reset_password";

// Updated type definition to match the form data
type FormInputs = {
  email: string;
};

export default function ForgotPassword() {
  const [formSection, setFormSection] = useState("start");
  const [errorInfo, setErrorInfo] = useState("");
  const [usedEmail, setUsedEmail] = useState("");
  const [code, setCode] = useState("");

  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: { email: "" },
    resolver: zodResolver(emailValidationSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    fetch(`${apiUrl}/login_register/sendconfirmationforgotpassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 201) {
          setErrorInfo("");
          setUsedEmail(data.email);
          setFormSection("code");
          toast({
            title: "Success!",
            description: "Verification code sent to your email",
          });
        } else {
          setErrorInfo("Email address not found");
          toast({
            title: "Error",
            description: "Email address not found in our records",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCheckConfirmationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${apiUrl}/login_register/check_confirmation_forgotPassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, email: usedEmail }),
        },
      );

      if (response.status === 201) {
        setErrorInfo("");
        setFormSection("password");
        toast({
          title: "Success!",
          description: "Code verified successfully",
        });
      } else {
        setErrorInfo("Invalid verification code");
        toast({
          title: "Error",
          description: "Please check your code and try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-3">
            {/* Form Section */}
            <div className="md:col-span-2 p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Reset Your Password
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Enter your email and we&apos;ll send you instructions to
                    reset your password
                  </p>
                </div>

                {errorInfo && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-red-500 mr-2" />
                      <p className="text-red-700">{errorInfo}</p>
                    </div>
                  </div>
                )}

                {formSection === "start" && (
                  <motion.form
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-primaryColor" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        className={`w-full px-4 py-2 border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                        placeholder="Enter your email address"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primaryColor text-white rounded-lg hover:bg-primaryColor/90 transition-colors"
                    >
                      <span>Send Reset Instructions</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.form>
                )}

                {formSection === "code" && (
                  <motion.form
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                    onSubmit={handleCheckConfirmationSubmit}
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <KeyRound className="w-4 h-4 mr-2 text-primaryColor" />
                        Verification Code
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors"
                        placeholder="Enter the code sent to your email"
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primaryColor text-white rounded-lg hover:bg-primaryColor/90 transition-colors"
                    >
                      <span>Verify Code</span>
                      <Check className="w-4 h-4" />
                    </button>
                  </motion.form>
                )}

                {formSection === "password" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <ChangeForgotPassword email={usedEmail} />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Banner */}
            <div className="relative bg-gradient-to-br from-primaryColor to-blue-600 p-8 flex flex-col justify-center items-center text-white">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute transform -rotate-45 -right-32 -top-32 w-64 h-64 rounded-full bg-white/10"></div>
                <div className="absolute transform -rotate-45 -left-32 -bottom-32 w-64 h-64 rounded-full bg-white/10"></div>
              </div>

              <div className="relative z-10 text-center">
                <div className="mb-8">
                  <img
                    src="/common_files/main/fayida_logo.png"
                    alt="Fayida"
                    className="h-16 mx-auto"
                  />
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  Remember Your Password?
                </h3>
                <p className="mb-8 text-white/90">
                  Sign in to access your account and continue learning
                </p>

                <Link href="/login">
                  <button className="px-6 py-2 bg-white text-primaryColor rounded-lg font-medium hover:bg-white/90 transition-colors">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
