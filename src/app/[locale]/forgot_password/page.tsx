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
import { signUpInfoSchema } from "../validation/signupValidation";
import { error } from "console";
import { emailValidationSchema } from "../validation/email_aloneValidation";
import { Divide } from "lucide-react";
import ChangeForgotPassword from "./reset_password";
import Test from "./test";
import Link from "next/link";

type Inputs = {
  email: string;
  password: string;

  confirmPassword: string;
};
type zodInputs = {
  email: string;
  password: string;

  confirmPassword: string;
};

export default function SignUp() {
  const [selectedGreadChoice, setSelectedGreadChoice] = useState("");
  const [editedValue, setEditedValue] = useState("");
  const [formSection, setFormSection] = useState("start");
  const [errorInfo, setErrorInfo] = useState("");
  const [usedEmail, setUsedEmail] = useState("");
  const [code, setCode] = useState("");

  const { toast } = useToast();
  const {  } = useRouter();
  const {
    register,
    //handleEmailSubmit,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<zodInputs>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(emailValidationSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    //this line is included so that 'confirm password' is not sent to server
    const { confirmPassword, ...formData } = data;
    console.log(formData.email);
    fetch(`${apiUrl}/login_register/sendconfirmationforgotpassword`, {
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
          setUsedEmail(formData.email);
          console.log("Email: " + formData.email);
          setFormSection("code");
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
        toast({
          title: `Success!`,
          description: `Test`,
        });
        // push("/login");
      })
      .catch((error) => {
        // Handle any errors during the request
        console.error("Error:", error);
      });
  };
  const handleInputChange = (event: any) => {
    setEditedValue(event.target.value);
    // setSelectedChoice(event.target.value);
  };

  const handleCheckConfirmationSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${apiUrl}/login_register/check_confirmation_forgotPassword`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: code, email: usedEmail }),
        }
      )
        .then((response) => {
          console.log("first");
          console.log("resss: " + response.status);
          //  console.log(formData);

          if (response.status == 201) {
            console.log("wrk");
            setErrorInfo("");
            //   setErrorInfo("");
            // setUsedEmail(formData.email);
            //  console.log("Email: " + formData.email);
            setFormSection("password");
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
    <div className="w-full flex pb-64  bg-slate-100 p-5 h-full">
      <div className="flex flex-col-reverse smd:grid grid-cols-3  mx-auto shadow-2xl ">
        <div className="col-span-2 bg-white p-10 rounded-2xl overflow-hidden">
          <h1 className="text-lg">Forgot Password</h1>
          <br />
          <br />
          <div className="w-full flex">
            <div className="mx-auto">
              {formSection == "start" && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-3">
                    {errorInfo != "" && (
                      <div>
                        <h1>Error: {errorInfo}</h1>
                      </div>
                    )}
                    <div className="space-x-3">
                      <label
                        className="text-sm font-bold text-gray-600 "
                        htmlFor=""
                      >
                        Email
                      </label>
                      {errors.email?.message && (
                        <h1>{errors.email?.message}</h1>
                      )}
                      <input
                        className="px-2 border-b-2 border-blue-500"
                        type="text"
                        // name="email"
                        id="email"
                        {...register("email")}
                      />
                    </div>

                    <div className="w-full flex">
                      <button
                        type="submit"
                        className="w-3/4 py-1 mx-auto bg-blue-600 text-white rounded-full"
                      >
                        Send Code
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {formSection == "code" && (
                <div>
                  <form onSubmit={handleCheckConfirmationSubmit}>
                    {errorInfo != "" && (
                      <div>
                        <h1>Error: {errorInfo}</h1>
                      </div>
                    )}
                    <label htmlFor="">Code: </label>
                    <input
                      onChange={(e) => setCode(e.target.value)}
                      className="border-2 w-1/3"
                      type="text"
                    />
                    <button type="submit" className="mx-2 bg-green-300 px-1">
                      Done
                    </button>
                  </form>
                </div>
              )}
              {formSection == "password" && (
                <div>
                  <ChangeForgotPassword email={usedEmail} />
                </div>
                // <Test />
              )}
            </div>
          </div>
        </div>
        <div className="p-10 w-full flex bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl">
          <div className="mx-auto my-auto">
            <div className="w-full flex pb-4">
              <div className="w-28 mx-auto ">
                <img src="common_files/logozoom.png" alt="" />
              </div>
            </div>
            <h1 className="text-xl text-white font-semibold pb-10">
              Welcome to Fayida
            </h1>
            <h1 className="text-center text-white">Already have an account?</h1>
            <div className="w-full flex pt-7">
              <Link href={"/login"} className="mx-auto">
                {" "}
                <button className="mx-auto border-2 text-white border-white px-3 py-2 rounded-full">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
