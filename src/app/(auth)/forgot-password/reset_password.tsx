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
          "Error: " //response.status
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
        }
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
            "Error: " //response.status
          );
        })

        .catch((error) => {
          // Handle any errors during the request
          console.error("Error:", error);
        });
    } catch {}
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-x-3">
          <label className="text-sm font-bold text-gray-600 " htmlFor="">
            Password
          </label>
          {errors.password?.message && <h1>{errors.password?.message}</h1>}
          <input
            className="px-2 border-b-2 border-blue-500"
            type="password"
            // name="email"
            id="email"
            {...register("password")}
          />
        </div>

        <div className="space-x-3">
          <label className="text-sm font-bold text-gray-600 " htmlFor="">
            Confirm Password
          </label>
          {errors.confirmPassword?.message && (
            <h1>{errors.confirmPassword?.message}</h1>
          )}
          <input
            className="px-2 border-b-2 border-blue-500"
            type="password"
            // name="email"
            id="email"
            {...register("confirmPassword")}
          />
        </div>

        <div className="w-full flex">
          <button
            type="submit"
            className="w-3/4 mt-3 py-1 mx-auto bg-blue-600 text-white rounded-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
