"use client";
import { apiUrl } from "@/apiConfig";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
//import { zodResolver } from "@hookform/resolvers/zod";
//import * as z from "zod";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordValidationSchema } from "../../validation/forgotPasswordValidation";
import { error } from "console";
//import { emailValidationSchema } from "./validation/email_aloneValidation";
import { Divide } from "lucide-react";

type zodInputs = {
  email: string;
  password: string;

  confirmPassword: string;
};
type Inputs = {
  email: string;
  password: string;

  confirmPassword: string;
};

export default function ChangeForgotPassword(RecivedEmail: any) {
  // const Email = props.email;
  // const { name, age, isAdmin } = props;

  const [formSection, setFormSection] = useState("start");
  const [errorInfo, setErrorInfo] = useState("");
  const [usedEmail, setUsedEmail] = useState("");
  const [code, setCode] = useState("");

  const { toast } = useToast();
  const { push } = useRouter();

  //setUsedEmail(RecivedEmail);
  const {
    register,
    //handleEmailSubmit,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<zodInputs>({
    defaultValues: {
      email: RecivedEmail.email,
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(forgotPasswordValidationSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    //this line is included so that 'confirm password' is not sent to server
    const { confirmPassword, ...formData } = data;
    console.log(formData.email);
    fetch(`${apiUrl}/login_register/reset_forgot_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log("first");
        console.log("res: " + response.status);
        //  console.log(formData);

        if (response.status == 201) {
          console.log("wrk");
          setErrorInfo("");
          //setUsedEmail(formData.email);
          console.log("Email: " + formData.email);
          setFormSection("code");
          toast({
            title: `Success!`,
            description: `You can Log in.`,
          });
          window.location.href = "/login";
        }
        if (response.status == 500) {
          console.log("nt wrk");
          setErrorInfo("Wrong Email address!");
        }
        // if (response.status == 201) {
        //  setFormSection("code");

        //return response.json();
        //console.log(response.json());
        // }
        throw new Error(
          "Error: ", //response.status
        );
      })
      .then((responseData) => {
        // Handle the response data
        console.log(responseData);

        // push("/login");
      })
      .catch((error) => {
        // Handle any errors during the request
        console.error("Error:", error);
      });
  };

  const handleCheckConfirmationSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${apiUrl}/login_register/reset_forgot_password`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: code, email: RecivedEmail }),
        },
      )
        .then((response) => {
          console.log("Email: " + RecivedEmail);
          console.log("first");
          console.log("resss: " + response.status);
          //  console.log(formData);

          if (response.status == 201) {
            console.log("wrk");
            setErrorInfo("");
            //   setErrorInfo("");
            // setUsedEmail(formData.email);
            //  console.log("Email: " + formData.email);
            //  setFormSection("code");
          }
          if (response.status == 501) {
            console.log("nt wrk");
            setErrorInfo("Incorrect Code!");
            //   setErrorInfo("Wrong Email address!");
          }
          // if (response.status == 201) {
          //  setFormSection("code");

          //return response.json();
          //console.log(response.json());
          // }
          throw new Error(
            "Error: ", //response.status
          );
        })

        .catch((error) => {
          // Handle any errors during the request
          console.error("Error:", error);
        });
    } catch {}
  };
  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            id="password"
            className={`w-full px-4 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
            type="password"
            placeholder="Enter new password"
            disabled={isSubmitting}
            {...register("password")}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password?.message && (
            <p id="password-error" className="text-red-500 text-xs">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            className={`w-full px-4 py-2 border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
            type="password"
            placeholder="Confirm new password"
            disabled={isSubmitting}
            {...register("confirmPassword")}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={
              errors.confirmPassword ? "confirmPassword-error" : undefined
            }
          />
          {errors.confirmPassword?.message && (
            <p id="confirmPassword-error" className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-10 rounded-lg flex items-center justify-center transition-colors ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-primaryColor text-white hover:bg-primaryColor/90"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
