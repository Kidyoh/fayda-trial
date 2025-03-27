"use client";
import { apiUrl } from "@/apiConfig";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpInfoSchema } from "../validation/signupValidation";
import { error } from "console";
import { Info } from "lucide-react";
import Link from "next/link";

type Inputs = {
  firstName: string;
  lastName: string;
  grandName: string;
  email: string;
  password: string;
  age: string;
  gread: string;
  confirmPassword: string;
  promocode: string;
};
type zodInputs = {
  firstName: string;
  lastName: string;
  grandName: string;
  email: string;
  password: string;
  age: string;
  gread: string;
  confirmPassword: string;
  city: string;
  region: string;
  schoolName: string;
  promocode: string;
  studentStatus: string;
};
interface Choice {
  id: string;
  sectionName: string;
  fullForm: string;
  shortForm: string;

  cityName: string;
  regionName: string;
  promocode: string;
}

export default function SignUp2() {
  const [greadChoices, setGreadChoices] = useState<Choice[]>([]);
  const [cityChoices, setCityChoices] = useState<Choice[]>([]);
  const [regionChoices, setRegionChoices] = useState<Choice[]>([]);

  const [selectedGreadChoice, setSelectedGreadChoice] = useState("");
  const [selectedCityChoice, setSelectedCityChoice] = useState("");

  const [selectedRegionChoice, setSelectedRegionChoice] = useState("");

  const [editedValue, setEditedValue] = useState("");

  const { toast } = useToast();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<zodInputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      grandName: "",
      email: "",
      age: "",
      password: "",
      confirmPassword: "",
      gread: "",
      city: "",
      region: "",
      promocode: "",
      studentStatus: "active",
    },
    resolver: zodResolver(signUpInfoSchema),
  });

  useEffect(() => {
    const fetchSectionChoices = async () => {
      try {
        const response = await fetch(`${apiUrl}/sections`);
        const data = await response.json();
        setGreadChoices(data);
      } catch (error) {
        console.error("Error fetching choices:", error);
      }
    };

    fetchSectionChoices();
  }, []);

  useEffect(() => {
    const fetchSectionChoices = async () => {
      try {
        const response = await fetch(`${apiUrl}/region`);
        const data = await response.json();
        setRegionChoices(data);
      } catch (error) {
        console.error("Error fetching choices:", error);
      }
    };

    fetchSectionChoices();
  }, []);

  useEffect(() => {
    const fetchSectionChoices = async () => {
      try {
        const response = await fetch(`${apiUrl}/city`);
        const data = await response.json();
        setCityChoices(data);
      } catch (error) {
        console.error("Error fetching choices:", error);
      }
    };

    fetchSectionChoices();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    //this line is included so that 'confirm password' is not sent to server
    const { confirmPassword, ...formData } = data;
    console.log(formData);
    fetch(`${apiUrl}/login_register/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
          //console.log(response.json());
        }
        throw new Error("Error: " + response.status);
      })
      .then((responseData) => {
        // Handle the response data
        console.log(responseData);
        toast({
          title: `Success!`,
          description: `${responseData.message}`,
        });
        push("/login");
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
  const handleCityChange = (event: any) => {
    setSelectedCityChoice(event.target.value);
    // setSelectedChoice(event.target.value);
  };
  const handleRegionChange = (event: any) => {
    setSelectedRegionChoice(event.target.value);
    // setSelectedChoice(event.target.value);
  };

  return (
    <div className=" bg-[url('/common_files/main/bannerx02.jpg')] bg-cover bg-center bg-fixed h-full w-screen">
      <div className="grid grid-cols-7 ">
        <div className="col-span-4">
          {/* <img
            className="w-full bg-green-400"
            src="common_files/main/bannerx02.jpg"
            alt=""
          /> */}
        </div>

        <div className="bg-gray-300 col-span-3 p-7 bg-opacity-90">
          {" "}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div className="space-x-3">
                {errors.firstName?.message && (
                  <h1>{errors.firstName?.message}</h1>
                )}
                <label htmlFor="" className="text-sm text-gray-600 font-bold">
                  First Name
                </label>

                <input
                  className="px-2 border-b-2 border-blue-500 "
                  type="text"
                  // name="firstName"
                  id="firstName"
                  {...register("firstName")}
                />
              </div>
              <div className="space-x-3">
                {errors.lastName?.message && (
                  <h1>{errors.lastName?.message}</h1>
                )}
                <label htmlFor="" className="text-sm text-gray-600 font-bold">
                  Last Name
                </label>

                <input
                  className="px-2 border-b-2 border-blue-500"
                  type="text"
                  //name="lastName"
                  id="lastName"
                  {...register("lastName")}
                />
              </div>
              <div className="space-x-3">
                {errors.grandName?.message && (
                  <h1>{errors.grandName?.message}</h1>
                )}
                <label htmlFor="" className="text-sm text-gray-600 font-bold">
                  Grand Name
                </label>
                <input
                  className="px-2 border-b-2 border-blue-500"
                  type="text"
                  // name="grandName"
                  id="grandName"
                  {...register("grandName")}
                />
              </div>
              <div className="space-x-3">
                <label htmlFor="" className="text-sm text-gray-600 font-bold">
                  Age
                </label>
                {errors.age?.message && <h1>{errors.age?.message}</h1>}
                <input
                  className="px-2 border-b-2 border-blue-500 w-1/4"
                  type="number"
                  // name="grandName"
                  id="age"
                  {...register("age")}
                />
              </div>
              <div className="space-x-3">
                <label htmlFor="" className="text-sm text-gray-600 font-bold">
                  Grade
                </label>
                {errors.gread?.message && <h1>{errors.gread?.message}</h1>}
                <select
                  id="gread"
                  value={editedValue}
                  {...register("gread")}
                  onChange={handleInputChange}
                >
                  <option value="" className="text-secondaryColor">
                    -- Select --
                  </option>
                  {greadChoices?.map((choice) => (
                    <option
                      className="text-secondaryColor"
                      key={choice.id}
                      value={choice.sectionName}
                    >
                      {choice.sectionName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-x-3">
                {errors.schoolName?.message && (
                  <h1>{errors.schoolName?.message}</h1>
                )}
                <label htmlFor="" className="text-sm text-gray-600 font-bold">
                  School Name
                </label>
                <input
                  className="px-2 border-b-2 border-blue-500"
                  type="text"
                  // name="grandName"
                  id="schoolName"
                  {...register("schoolName")}
                />
              </div>

              <div className="space-x-3">
                <label htmlFor="" className="text-sm text-gray-600 font-bold">
                  City
                </label>
                {errors.city?.message && <h1>{errors.city?.message}</h1>}
                <select
                  id="city"
                  value={selectedCityChoice}
                  {...register("city")}
                  onChange={handleCityChange}
                >
                  <option value="" className="text-secondaryColor">
                    -- Select --
                  </option>
                  {cityChoices?.map((choice) => (
                    <option
                      className="text-secondaryColor"
                      key={choice.id}
                      value={choice?.cityName}
                    >
                      {choice.cityName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-x-3">
                <label htmlFor="" className="text-sm text-gray-600 font-bold">
                  Region
                </label>
                {errors.region?.message && <h1>{errors.region?.message}</h1>}
                <select
                  id="region"
                  value={selectedRegionChoice}
                  {...register("region")}
                  onChange={handleRegionChange}
                >
                  <option value="" className="text-secondaryColor">
                    -- Select --
                  </option>
                  {regionChoices?.map((choice) => (
                    <option
                      className="text-secondaryColor"
                      key={choice.id}
                      value={choice?.regionName}
                    >
                      {choice.regionName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-x-3">
                <label className="text-sm font-bold text-gray-600 " htmlFor="">
                  Email
                </label>
                {errors.email?.message && <h1>{errors.email?.message}</h1>}
                <input
                  className="px-2 border-b-2 border-blue-500"
                  type="text"
                  // name="email"
                  id="email"
                  {...register("email")}
                />
              </div>

              <div className="w-96 p-2 space-x-2 bg-primaryColor bg-opacity-80 text-white rounded-2xl flex">
                <Info className="my-auto" size={50} />
                <h1 className="text-sm my-auto">
                  Use a unique email that has not been used to sign in, or you
                  will not be able to proceed.
                </h1>
              </div>

              <div className="space-x-3">
                <label className="text-sm text-gray-600 font-bold" htmlFor="">
                  Password
                </label>
                {errors.password?.message && (
                  <h1>{errors.password?.message}</h1>
                )}
                <input
                  className="px-2 border-b-2 border-blue-500"
                  type="password"
                  //name="password"
                  id="password"
                  {...register("password")}
                />
              </div>
              <div className="space-x-3">
                <label className="text-sm text-gray-600 font-bold" htmlFor="">
                  Confirm Password
                </label>
                {errors.confirmPassword?.message && (
                  <h1>{errors.confirmPassword?.message}</h1>
                )}
                <input
                  className="px-2 border-b-2 border-blue-500"
                  type="password"
                  //name="password"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                />
              </div>

              <div className="space-x-3">
                {errors.firstName?.message && (
                  <h1>{errors.firstName?.message}</h1>
                )}
                <label htmlFor="" className="text-sm text-gray-600 font-bold">
                  Promo Code
                </label>

                <input
                  className="px-2 border-b-2 border-blue-500 "
                  type="text"
                  // name="firstName"
                  id="promocode"
                  {...register("promocode")}
                />
              </div>

              <div className="w-full flex">
                <button
                  type="submit"
                  className="w-3/4 py-1 mx-auto bg-primaryColor text-white rounded-full"
                >
                  Create account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
