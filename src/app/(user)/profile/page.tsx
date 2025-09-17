"use client";
import { apiUrl } from "@/apiConfig";
import EditCellDialog from "@/components/custom_components/editCellDialog";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { updatePasswordSchema } from "../../validation/updatePasswordValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import useProfileStore from "../../store/profileStore";
import Link from "next/link";
import { setAccessToken, getAccessToken, clearAccessToken } from "../../../lib/tokenManager";


const accessToken = getAccessToken();


type zodInputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ProfileDetails() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  // const [userName, setUserName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [accountType, setAccountType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [prefferdLanguage, setPrefferdLanguage] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [gread, setGread] = useState("");
  const [status, setStatus] = useState("");
  const [points, setPoints] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [grandName, setGrandName] = useState("");
  const [open, setOpen] = useState(false);
  const [loginInfo, setLoginInfo] = useState("");
  //const [userId , setUserId] = useState("");

  // const setPointStore = useProfileStore((state) => state.setPoint);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<zodInputs>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(updatePasswordSchema),
  });

  useEffect(() => {
    fetch(`${apiUrl}/newlogin/profile`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
        },
      
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.message);
        setLoading(false);
        setStudentId(data.id);
        // setUserName(data.firstName + " " + data.lastName);
        setAccountType(data.accountType);
        setEmail(data.email);
        setAge(data.age);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setGrandName(data.grandName);
        setStatus(data.studentStatus);
        setPhoneNumber(data.phoneNumber);
        setGread(data.gread);
        setPrefferdLanguage(data.prefferdLanguage);
        setPoints(data.points);
        console.log(data.message);
        //  console.log("yes :" + data.stringify());
        // setPointStore(data.point);
      });
  }, []);

  const updatedPasswordData = {
    // [RecivedField.toString()]: editedValue,
    hello: "this is a test",
  };

  const handleChangePasswordUpdate = async () => {
    console.log(updatedPasswordData);
    // try {
    //   console.log(updatedPasswordData);
    //   const response = await fetch(
    //     `${apiUrl}/login_register/changepassword/${studentId}`,
    //     //`${apiUrl}/login_register/test/`,
    //     {
    //       /*
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //         //credentials: "include",
    //         // withCredentials: true
    //         //Authorization: `Bearer ${"secret"}`,
    //       },
    //       credentials: "include",
    //       body: JSON.stringify(updatedPasswordData),
    //       // Add any necessary headers or authentication tokens
    //     */
    //     }
    //   );
    //   if (response.ok) {
    //     // File successfully deleted
    //     console.log("File Updated");
    //     //router.push("/" + RecivedId);
    //     // router.push(window.location.href);
    //     // setOpen(false);
    //     //  router.refresh();
    //     toast({
    //       title: "Success!",
    //       description: "Password Edited!",
    //     });
    //   } else {
    //     // File deletion failed
    //     console.error("Failed to Update file");
    //   }
    // } catch (error) {
    //   console.error("Error Updating file", error);
    // }
  };
  const onSubmitUpdatePassword: SubmitHandler<zodInputs> = (data) => {
    //this line is included so that 'confirm password' is not sent to server
    const { confirmPassword, ...formData } = data;
    console.log(formData);
    fetch(`${apiUrl}/login_register/changepassword/${studentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("done");

          return response.json();
        } else {
          return response.json().then((data) => {
            setLoginInfo(data.message);
            throw new Error("Request failed with status: " + response.status);
          });
        }
      })
      .then((data) => {
        // Process the data when the response is okay
        // Your code here
        console.log("working");
        toast({
          title: `Success!`,
          description: `Password Changed`,
        });
        setOpen(false);
      })
      .catch((error) => {
        // Print the error statement
        console.error(error);
      });
  };



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <img
                    src="/common_files/fayida_single.png"
                    className="w-full h-full rounded-full object-cover border-4 border-primaryColor bg-secondaryColor bg-opacity-20"
                    alt={`${firstName} ${lastName}`}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-400 rounded-full p-2 border-2 border-white">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{firstName} {lastName}</h2>
                <p className="text-gray-500">{accountType}</p>
                <span className="mt-2 px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                  Active Account
                </span>
                <div className="mt-4 w-full">
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600">Points Scored</p>
                    <p className="text-2xl font-bold text-primaryColor">
                      {Math.round(parseFloat(points) * 100) / 100}
                    </p>
                  </div>
                  <Link href="/prizes">
                    <button className="mt-4 w-full py-2 px-4 bg-primaryColor text-white rounded-lg hover:bg-primaryColor/90 transition-colors duration-200">
                      Check Available Prizes
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Profile Details</h1>
                <p className="text-gray-500">Manage your personal information and preferences</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">First Name</p>
                        <p className="text-gray-900">{firstName}</p>
                      </div>
                      <EditCellDialog
                        type="students"
                        id={studentId}
                        field="firstName"
                        content={firstName}
                        dataType="text"
                        formType="default"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Last Name</p>
                        <p className="text-gray-900">{lastName}</p>
                      </div>
                      <EditCellDialog
                        type="students"
                        id={studentId}
                        field="lastName"
                        content={lastName}
                        dataType="String"
                        formType="default"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Grand Name</p>
                        <p className="text-gray-900">{grandName}</p>
                      </div>
                      <EditCellDialog
                        type="students"
                        id={studentId}
                        field="grandName"
                        content={grandName}
                        dataType="text"
                        formType="default"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Age</p>
                        <p className="text-gray-900">{age}</p>
                      </div>
                      <EditCellDialog
                        type="students"
                        id={studentId}
                        field="age"
                        content={age}
                        dataType="number"
                        formType="default"
                      />
                    </div>
                  </div>
                </div>

                {/* Account Settings */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-900">{email}</p>
                      </div>
                      <EditCellDialog
                        type="students"
                        id={studentId}
                        field="email"
                        content={email}
                        dataType="email"
                        formType="default"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Grade</p>
                        <p className="text-gray-900">{gread}</p>
                      </div>
                      <EditCellDialog
                        type="students"
                        id={studentId}
                        field="gread"
                        content={gread}
                        dataType="text"
                        formType="gread"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="text-gray-900">{phoneNumber || "Not Set"}</p>
                      </div>
                      <EditCellDialog
                        type="students"
                        id={studentId}
                        field="phoneNumber"
                        content={phoneNumber}
                        dataType="text"
                        formType="default"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Preferred Language</p>
                        <p className="text-gray-900">{prefferdLanguage || "Default"}</p>
                      </div>
                      <EditCellDialog
                        type="students"
                        id={studentId}
                        field="prefferdLanguage"
                        content={prefferdLanguage}
                        dataType="text"
                        formType="prefferdLanguage"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <button className="w-full py-2 px-4 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                          Change Password
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Change Password</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmitUpdatePassword)} className="space-y-4">
                          {loginInfo && (
                            <div className="text-red-500 text-sm">{loginInfo}</div>
                          )}
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Current Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor"
                              {...register("currentPassword")}
                            />
                            {errors.currentPassword?.message && (
                              <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              New Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor"
                              {...register("newPassword")}
                            />
                            {errors.newPassword?.message && (
                              <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor"
                              {...register("confirmPassword")}
                            />
                            {errors.confirmPassword?.message && (
                              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                            )}
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2 px-4 bg-primaryColor text-white rounded-lg hover:bg-primaryColor/90 transition-colors duration-200 disabled:opacity-50"
                          >
                            {isSubmitting ? "Updating..." : "Update Password"}
                          </button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /*
<div>
      <div className="py-4">
        <div className="grid  grid-cols-3 px-10">
          <div className="">
            <h1>Details</h1>

            <div className="py-3">
              <h1 className="font-semibold">First Name:</h1>
              <h1 className="px-3">{firstName}</h1>
              <EditCellDialog
                type="students"
                id={studentId}
                field="firstName"
                content={firstName}
                dataType="text"
                //if form type is default then it will be redirected to ordinary edit form
                formType={"default"}
              />
            </div>
            <div className="py-3">
              <h1 className="font-semibold">Last Name:</h1>
              <h1 className="px-3">{lastName}</h1>
              <EditCellDialog
                type="students"
                id={studentId}
                field="lastName"
                content={lastName}
                dataType="String"
                formType={"default"}
              />
            </div>
            <div className="py-3">
              <h1 className="font-semibold">Grand Name:</h1>
              <h1 className="px-3">{grandName}</h1>
              <EditCellDialog
                type="students"
                id={studentId}
                field="grandName"
                content={grandName}
                dataType="text"
                //if form type is default then it will be redirected to ordinary edit form
                formType={"default"}
              />
            </div>

            <div className="flex space-x-2">
              <h1>Account Status: </h1>
              <div className="px-2 py-1 text-black bg-green-300 rounded-3xl">
                <h1>Active</h1>
              </div>
            </div>
            <div className="py-3 ">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>Change Password</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmitUpdatePassword)}>
                    <div className="space-y-3">
                      {loginInfo != "" && <div> {loginInfo}</div>}
                      <div className="space-x-3">
                        {errors.currentPassword?.message && (
                          <h1>{errors.currentPassword?.message}</h1>
                        )}
                        <label
                          htmlFor=""
                          className="text-sm text-gray-600 font-bold"
                        >
                          Current Password
                        </label>

                        <input
                          className="px-2 border-b-2 border-blue-500 "
                          type="text"
                          // name="firstName"
                          id="currentPassword"
                          {...register("currentPassword")}
                        />
                      </div>

                      <div className="space-x-3">
                        {errors.newPassword?.message && (
                          <h1>{errors.newPassword?.message}</h1>
                        )}
                        <label
                          htmlFor=""
                          className="text-sm text-gray-600 font-bold"
                        >
                          New Password
                        </label>

                        <input
                          className="px-2 border-b-2 border-blue-500 "
                          type="text"
                          // name="firstName"
                          id="newPassword"
                          {...register("newPassword")}
                        />
                      </div>

                      <div className="space-x-3">
                        {errors.confirmPassword?.message && (
                          <h1>{errors.confirmPassword?.message}</h1>
                        )}
                        <label
                          htmlFor=""
                          className="text-sm text-gray-600 font-bold"
                        >
                          Confirm Password
                        </label>

                        <input
                          className="px-2 border-b-2 border-blue-500 "
                          type="text"
                          // name="firstName"
                          id="confirmPassword"
                          {...register("confirmPassword")}
                        />
                      </div>

                      <div className="w-full flex">
                        <button
                          type="submit"
                          className="w-3/4 py-1 mx-auto bg-blue-600 text-white rounded-full"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div>
              <h1>
                Points Scored:{" "}
                <span className="text-lg font-semibold bg-primaryColor text-white p-1">
                  {points}
                </span>
              </h1>
            </div>

            <div className="my-3">
              <Link href="/prizes">
                <h1 className="text-white bg-primaryColor p-1 w-fit ">
                  {" "}
                  Check Avialable Prize
                </h1>
              </Link>
            </div>
          </div>
          <div className="">
            <div className="py-3 flex space-x-1">
              <h1 className="font-semibold">Age:</h1>
              <h1 className="px-3">{age}</h1>
              <EditCellDialog
                type="students"
                id={studentId}
                field="age"
                content={age}
                dataType="number"
                formType={"default"}
              />
            </div>
            <div className="py-3 flex space-x-1">
              <h1 className="font-semibold">Gread:</h1>
              <h1 className="px-3">{gread}</h1>

              <EditCellDialog
                type="students"
                id={studentId}
                field="gread"
                content={gread}
                dataType="text"
                formType={"gread"}
              />
            </div>
            <div className="py-3 flex space-x-1">
              <h1 className="font-semibold">Email:</h1>

              <h1 className="px-3">{email}</h1>
              <EditCellDialog
                type="students"
                id={studentId}
                field="email"
                content={email}
                dataType="email"
                formType={"default"}
              />
            </div>
            <div className="py-3 flex space-x-1">
              <h1 className="font-semibold">Preffered Language:</h1>
              <h1 className="px-3">
                {prefferdLanguage == null ? `Default` : prefferdLanguage}
              </h1>
              <EditCellDialog
                type="students"
                id={studentId}
                field="prefferdLanguage"
                content={prefferdLanguage}
                dataType="text"
                formType={"prefferdLanguage"}
              />
            </div>
            <div className="py-3 flex space-x-1 ">
              <h1 className="font-semibold">Phone Number:</h1>
              <h1 className="px-3">
                {phoneNumber == null ? `Not Set` : phoneNumber}
                <EditCellDialog
                  type="students"
                  id={studentId}
                  field="phoneNumber"
                  content={phoneNumber}
                  dataType="text"
                  formType={"default"}
                />
              </h1>
            </div>
          </div>
          <div>
            <div className="flex h-1/2 w-full ">
              <div className="mx-auto ">
                <div className="flex w-full  ">
                  <div className="mx-auto w-fit ">
                    <div className="h-3/4 w-fit ">
                      <img
                        src="/common_files/fayida_single.png"
                        className="h-3/4  bg-secondaryColor bg-opacity-20 rounded-full"
                        alt=""
                      />
                      <div className="w-full  flex ">
                        <div className=" w-fit mx-auto  py-3">
                          <h1 className="text-center">
                            {firstName + " " + lastName}
                          </h1>
                          <h1 className="text-center">{accountType}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
*/
}
