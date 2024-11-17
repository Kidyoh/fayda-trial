"use client";
import { apiUrl } from "@/apiConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";

import { signInInfoSchema } from "../validation/signinValidation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { setAccessToken, getAccessToken, clearAccessToken } from "../../../lib/tokenManager";


type zodInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [errorInfo, setErrorInfo] = useState("");
  const [inputType, setInputType] = useState("password");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<zodInputs>({
    defaultValues: {
      email: "",

      password: "",
    },
    resolver: zodResolver(signInInfoSchema),
  });


  const { push } = useRouter();
  const onSubmit: SubmitHandler<zodInputs> = (data) => {
   
    console.log(data);
    //fetch(`${apiUrl}/login_register/loginss`, {
      fetch(`${apiUrl}/newlogin/login`, { 
    method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Working");
          return response.json();
        
        }
        throw new Error("Error: " + response.status);
      })
      .then((responseData) => {
        // Handle the response data
        console.log(responseData);
        setAccessToken(responseData.accessToken);
        toast({
          title: `Success!`,
          description: `Login Successful`,
        });
        // push("/");
        window.location.href = "/";
      })
      .catch((error) => {
        // Handle any errors during the request
        console.log("Not Working");
        console.error("Error:", error);
        setErrorInfo("Invalid Credentials!");
      });
  };

  const toggleInputType = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="w-full flex pb-64  bg-slate-100 p-5 h-full">
      <div className="flex flex-col-reverse smd:grid grid-cols-2  mx-auto shadow-2xl ">
        <div className="bg-white p-10 rounded-2xl overflow-hidden">
          <h1 className="text-lg font-semibold text-primaryColor">Sign In</h1>
          <br />
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              {errorInfo != "" && <div>{errorInfo}</div>}
              <div className="space-x-3">
                {errors.email?.message && <h1>{errors.email?.message}</h1>}
                <label htmlFor="" className="text-sm text-gray-600 font-bold">
                  Email
                </label>

                <input
                  className="px-2 border-b-2 border-blue-500 "
                  type="text"
                  // name="firstName"
                  id="email"
                  {...register("email")}
                />
              </div>

              <div className="space-x-3">
                {errors.password?.message && (
                  <h1>{errors.password?.message}</h1>
                )}
                <label htmlFor="" className="text-sm text-gray-600 font-bold">
                  Password
                </label>
                <div className="my-auto space-x-2 flex">
                  <input
                    className="px-2 border-b-2 border-blue-500 "
                    type={inputType}
                    // name="firstName"
                    id="password"
                    {...register("password")}
                  />
                  <div
                    className="hover:text-primaryColor cursor-pointer"
                    onClick={toggleInputType}
                  >
                    {" "}
                    {inputType == "password" ? <Eye /> : <EyeOff />}
                  </div>
                </div>
              </div>

              <div className="w-full flex">
                <button
                  type="submit"
                  className="w-3/4 py-1 mx-auto bg-primaryColor text-white rounded-full"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          <div className="mt-5 text-sm">
            <Link href={"/forgot_password"}>
              {" "}
              <button>Forgot Password?</button>
            </Link>
          </div>
        </div>

        <div className="p-10 w-full flex   bg-gradient-to-r from-blue-300 to-sky-300 rounded-2xl">
          <div className="mx-auto my-auto">
            <div className="w-full flex pb-4">
              <div className="w-52 mx-auto ">
                <img src="common_files/main/fayida_logo.png" alt="" />
              </div>
            </div>
            <h1 className="text-xl text-gray-800 font-semibold pb-10">
              Welcome to Fayida Acadamy
            </h1>
            <h1 className="text-center text-primaryColor">
              Don&apos;t have an account?
            </h1>
            <div className="w-full flex pt-7">
              <div className="mx-auto">
                <Link href={"/signup"}>
                  <h1 className=" border-2 text-primaryColor border-primaryColor px-3 py-2 rounded-full">
                    Sign Up
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
