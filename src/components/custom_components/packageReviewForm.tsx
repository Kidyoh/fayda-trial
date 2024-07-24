"use client";
import { apiUrl } from "@/apiConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";

//import { signInInfoSchema } from "../validation/signinValidation";
import { packageReviewSchema } from "../../app/[locale]/validation/package_review_validation";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import useFetchStore from "../../app/[locale]/store/fetchStore";

type zodInputs = {
  text: string;
  packageId: string;
  studentId: string;
};

export default function PackageReviewForm({ packageId, studentId }: any) {
  const PackageId = packageId;
  const StudentId = studentId;

  const [errorInfo, setErrorInfo] = useState("");

  const fetchPackagesReview = useFetchStore(
    (state) => state.fetchPackageReview
  );
  const setFetchPackagesReview = useFetchStore(
    (state) => state.setFetchPackageReview
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<zodInputs>({
    defaultValues: {
      text: "",
      packageId: PackageId,
      studentId: StudentId,
    },
    resolver: zodResolver(packageReviewSchema),
  });

  const { push } = useRouter();
  const onSubmit: SubmitHandler<zodInputs> = (data) => {
    //this line is included so that 'confirm password' is not sent to server
    // const { confirmPassword, ...formData } = data;
    console.log(data);
    fetch(`${apiUrl}/packagereview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...data,
        packageId: PackageId,
        studentId: StudentId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Working");
          return response.json();
          //console.log(response.json());
          // console.log("Working")
        }
        throw new Error("Error: " + response.status);
      })
      .then((responseData) => {
        // Handle the response data
        console.log(responseData);
        setFetchPackagesReview(!fetchPackagesReview);
        toast({
          title: `Review added!`,
          //description: `${responseData.message}`,
        });
        // push("/");
        // window.location.href = "/";
      })
      .catch((error) => {
        // Handle any errors during the request
        console.log("Not Working");
        console.error("Error:", error);
        setErrorInfo("Invalid Credentials!");
      });
  };

  return (
    <div className="w-full flex  text-black bg-slate-100 p-5 ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-3 w-full ">
          {
            //errorInfo != "" && <div>{errorInfo}</div>
          }
          <div className="space-x-3 w-full ">
            {
              //errors.text?.message && <h1>{errors.text?.message}</h1>
            }

            <input
              className="px-2 border-2 rounded-xl p-3 text-sm text-black border-primaryColor w-full"
              type="text"
              id="text"
              {...register("text")}
            />
          </div>
          <div className=" hidden space-x-3 w-full ">
            {errors.text?.message && <h1>{errors.text?.message}</h1>}
          </div>

          <div className="w-full flex">
            <button
              type="submit"
              className="w-3/4 py-1 mx-auto bg-primaryColor text-white rounded-full"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
