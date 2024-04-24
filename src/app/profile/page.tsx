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
import { updatePasswordSchema } from "../validation/updatePasswordValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import useProfileStore from "../store/profileStore";
import Link from "next/link";

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
  const [confirmResponseData, setConfirmResponseData] = useState(null);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [confirmEmailButtonClicked, setConfirmEmailButtonClicked] =
    useState(false);
  const [checkConfirmationresponse, setCheckConfirmationResponse] =
    useState("");
  const [code, setCode] = useState("");
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
    fetch(`${apiUrl}/login_register/profile`, {
      credentials: "include",
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

  useEffect(() => {
    if (!confirmEmailButtonClicked) return;

    setIsConfirmLoading(true);

    fetch(`${apiUrl}/login_register/sendconfirmation/${email}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setConfirmResponseData(data);
        setIsConfirmLoading(false);
        //console.log(confirmResponseData);
        if (data.ok) {
          console.log("Response is okey");
        } else {
          console.log("Response is not okey");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsConfirmLoading(false);
      });
  }, [confirmEmailButtonClicked]);

  const handleButtonClick = () => {
    setConfirmEmailButtonClicked(true);
  };

  const handleCheckConfirmationSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${apiUrl}/login_register/check_confirmation`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: code }),
        }
      );

      console.log("first");
      console.log(response.status);

      if (response.status === 201) {
        // The request was successful (status code 201)
        const data = await response.json();
        setCheckConfirmationResponse("true");
        toast({
          title: `Success!`,
          description: `Account Activated`,
        });
        window.location.href = "/profile";
        //setConfirmEmailButtonClicked(data.message);
        console.log("good");
      } else {
        toast({
          title: `Filed!`,
          description: `Incorrect Code!`,
        });
        // The request was not successful
        //console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleCheckConfirmationSubmit = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(
  //       `${apiUrl}/login_register/check_confirmation`,
  //       {
  //         method: "POST",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ code: code }),
  //       }
  //     );
  //     const data = await response.json();
  //     setConfirmEmailButtonClicked(data.message);
  //     console.log("first");
  //     console.log(response.status);
  //     if (response.status == 201) {
  //       // The request was successful (status code 200-299)
  //       const data = await response.json();
  //       setConfirmEmailButtonClicked(data.message);
  //       console.log("good");
  //     } else {
  //       // The request was not successful
  //       console.error("Request failed with status:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <div>
      <div className="py-4">
        <div className="smd:grid smd:grid-cols-2 lg:grid-cols-3 px-10">
          <div className="">
            <h1 className="text-primaryColor text-xl font-semibold underline mx-auto w-fit">
              Profile Details
            </h1>

            <div className="py-3 flex gap-2">
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
            <div className="py-3  flex gap-2">
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
            <div className="py-3  flex gap-2">
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
              {status == "active" ? (
                <div className="px-2 py-1 text-black bg-green-300 rounded-3xl">
                  <h1>Active</h1>
                </div>
              ) : (
                <div>InActive</div>
              )}
            </div>
            <div className="py-3 ">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>Change Password</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password </DialogTitle>
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
                          className="px-2 border-b-2 border-primaryColor "
                          type="password"
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
                          className="px-2 border-b-2 border-primaryColor "
                          type="password"
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
                          className="px-2 border-b-2 border-primaryColor"
                          type="password"
                          // name="firstName"
                          id="confirmPassword"
                          {...register("confirmPassword")}
                        />
                      </div>

                      <div className="w-full flex">
                        <button
                          type="submit"
                          className="w-3/4 py-1 mx-auto bg-primaryColor text-white rounded-full"
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
                  {Math.round(parseFloat(points) * 100) / 100}
                </span>
              </h1>
            </div>

            <div className="my-3">
              <Link href="/prize">
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
              {status != "active" && (
                <EditCellDialog
                  type="students"
                  id={studentId}
                  field="email"
                  content={email}
                  dataType="email"
                  formType={"default"}
                />
              )}
            </div>
            {status != "active" && (
              <div>
                {" "}
                <h1>
                  Email is not confirmed. You need to confirm to activate your
                  account!{" "}
                </h1>
                <h1>
                  <span> Note</span> that once you confirm your email, it will
                  be a permanent information of you.
                </h1>
              </div>
            )}
            {status != "active" && email != null && (
              <div className="my-1 border-2 w-fit px-1 border-red-500">
                <button onClick={handleButtonClick}>Send Confirmation</button>
              </div>
            )}
            {confirmEmailButtonClicked && (
              <div>
                <h1>Confirmation Code has been sent to your email.</h1>
                <form onSubmit={handleCheckConfirmationSubmit}>
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

              <h1 className="px-3 flex gap-2">
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
          <div className="hidden lg:block">
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
              {status == "active" ? (
                <div className="px-2 py-1 text-black bg-green-300 rounded-3xl">
                  <h1>Active</h1>
                </div>
              ) : (
                <div>InActive</div>
              )}
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
              <Link href="/prize">
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
              {status != "active" && (
                <EditCellDialog
                  type="students"
                  id={studentId}
                  field="email"
                  content={email}
                  dataType="email"
                  formType={"default"}
                />
              )}
            </div>
            {status != "active" && (
              <div>
                {" "}
                <h1>
                  Email is not confirmed. You need to confirm to activate your
                  account!{" "}
                </h1>
                <h1>
                  <span> Note</span> that once you confirm your email, it will
                  be a permanent information of you.
                </h1>
              </div>
            )}
            {status != "active" && email != null && (
              <div className="my-1 border-2 w-fit px-1 border-red-500">
                <button onClick={handleButtonClick}>Send Confirmation</button>
              </div>
            )}
            {confirmEmailButtonClicked && (
              <div>
                <h1>Confirmation Code has been sent to your email.</h1>
                <form onSubmit={handleCheckConfirmationSubmit}>
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
