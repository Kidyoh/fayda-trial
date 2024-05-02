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
import { RegisterExamTakerSchema } from "../validation/registerExamTakerValidation";
import { error } from "console";
import Link from "next/link";
import useTemporaryPhonenumberStore from "../store/temporaryphonenumberStore";

type Inputs = {
  phoneNumber: string;
  school: string;
  city: string;
  region: string;
  scienceType: string;
  grade: string;
  gender: string;
};
type zodInputs = {
  phoneNumber: string;
  school: string;
  city: string;
  region: string;
  scienceType: string;
  gender: string;

  grade: string;
};
interface Choice {
  id: string;
  sectionName: string;
  regionName: string;
  genderType: string;
  cityName: string;
  fullForm: string;
  shortForm: string;
}

export default function RegisterExamTaker() {
  const [regionChoices, setRegionChoices] = useState<Choice[]>([]);
  const [cityChoices, setCityChoices] = useState<Choice[]>([]);
  const [greadChoices, setGreadChoices] = useState<Choice[]>([]);
  const [selectedGreadChoice, setSelectedGreadChoice] = useState("");
  // const [editedValue, setEditedValue] = useState("");
  const [editedCityValue, setEditedCityValue] = useState("");
  const [editedSectionValue, setEditedSectionValue] = useState("");
  const [editedRegionValue, setEditedRegionValue] = useState("");
  const [editedGenderValue, setEditedGenderValue] = useState("");
  const [editedScienceType, setEditedScienceType] = useState("");

  const genderSelection = ["Male", "Female"];
  const scienceType = ["Natural", "Social", "Other"];

  const phoneNumberFromStore = useTemporaryPhonenumberStore(
    (state) => state.phoneNumber
  );
  // const [phoneNumbertaken, setPhoneNumberTaken] = useState(
  //   phoneNumber.toString()
  // );

  const { toast } = useToast();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<zodInputs>({
    defaultValues: {
      phoneNumber: phoneNumberFromStore,
      school: "",
      city: "",
      region: "",
      scienceType: "",

      grade: "",
    },
    resolver: zodResolver(RegisterExamTakerSchema),
  });

  useEffect(() => {
    const fetchCityChoices = async () => {
      try {
        const response = await fetch(`${apiUrl}/city`);
        const data = await response.json();
        setCityChoices(data);
      } catch (error) {
        console.error("Error fetching choices:", error);
      }
    };

    fetchCityChoices();
  }, []);

  useEffect(() => {
    const fetchRegionChoices = async () => {
      try {
        const response = await fetch(`${apiUrl}/region`);
        const data = await response.json();
        setRegionChoices(data);
      } catch (error) {
        console.error("Error fetching choices:", error);
      }
    };

    fetchRegionChoices();
  }, []);

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    //this line is included so that 'confirm password' is not sent to server
    const { ...formData } = data;
    console.log("From data Recived: " + formData);
    fetch(`${apiUrl}/examtaker`, {
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
          description: `You are Registered`,
        });
        push("/mock_package/selectmainfolder");
        //push("/mock_package");
      })
      .catch((error) => {
        // Handle any errors during the request
        console.error("Error:", error);
      });
  };
  // const handleInputChange = (event: any) => {
  //   setEditedValue(event.target.value);
  //   // setSelectedChoice(event.target.value);
  // };
  const handleCityInputChange = (event: any) => {
    setEditedCityValue(event.target.value);
    // setSelectedChoice(event.target.value);
  };
  const handleRegionInputChange = (event: any) => {
    setEditedRegionValue(event.target.value);
    // setSelectedChoice(event.target.value);
  };
  const handleSectionInputChange = (event: any) => {
    setEditedSectionValue(event.target.value);
    // setSelectedChoice(event.target.value);
  };
  const handleGenderInputChange = (event: any) => {
    setEditedGenderValue(event.target.value);
    // setSelectedChoice(event.target.value);
  };

  const handleScieneTypeInputChange = (event: any) => {
    setEditedScienceType(event.target.value);
    // setSelectedChoice(event.target.value);
  };

  return (
    <div>
      <div className="w-full flex pb-64  bg-slate-100 p-5 h-full">
        <div className="flex flex-col-reverse   mx-auto shadow-2xl ">
          <div className="col-span-2 bg-white p-10 rounded-2xl overflow-hidden">
            <h1 className="text-lg font-semibold text-primaryColor">
              You need to fill this form to take exams
            </h1>
            <br />
            <br />
            <div className="w-full flex">
              <div className="mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-3">
                    <div className="space-x-3">
                      {errors.phoneNumber?.message && (
                        <h1>{errors.phoneNumber?.message}</h1>
                      )}
                      <label
                        htmlFor=""
                        className="text-sm text-gray-600 font-bold"
                      >
                        Phone Number
                      </label>

                      <input
                        className="px-2 border-b-2 border-blue-500 "
                        type="number"
                        // name="firstName"

                        id="phoneNumber"
                        {...register("phoneNumber")}
                      />
                    </div>

                    <div className="space-x-3">
                      <label
                        htmlFor=""
                        className="text-sm text-gray-600 font-bold"
                      >
                        Gender
                      </label>
                      {errors.gender?.message && (
                        <h1>{errors.gender?.message}</h1>
                      )}
                      <select
                        id="gender"
                        value={editedGenderValue}
                        {...register("gender")}
                        onChange={handleGenderInputChange}
                      >
                        <option value="" className="text-secondaryColor">
                          -- Select --
                        </option>
                        {genderSelection?.map((choice) => (
                          <option
                            className="text-secondaryColor"
                            key={choice}
                            value={choice}
                          >
                            {choice}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-x-3">
                      <label
                        htmlFor=""
                        className="text-sm text-gray-600 font-bold"
                      >
                        Science Field
                      </label>
                      {errors.scienceType?.message && (
                        <h1>{errors.scienceType?.message}</h1>
                      )}
                      <select
                        id="scienceType"
                        value={editedScienceType}
                        {...register("scienceType")}
                        onChange={handleScieneTypeInputChange}
                      >
                        <option value="" className="text-secondaryColor">
                          -- Select --
                        </option>
                        {scienceType?.map((choice) => (
                          <option
                            className="text-secondaryColor"
                            key={choice}
                            value={choice}
                          >
                            {choice}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-x-3">
                      {errors.school?.message && (
                        <h1>{errors.school?.message}</h1>
                      )}
                      <label
                        htmlFor=""
                        className="text-sm text-gray-600 font-bold"
                      >
                        School Name
                      </label>

                      <input
                        className="px-2 border-b-2 border-blue-500"
                        type="text"
                        //name="lastName"
                        id="lastName"
                        {...register("school")}
                      />
                    </div>

                    <div className="space-x-3">
                      <label
                        htmlFor=""
                        className="text-sm text-gray-600 font-bold"
                      >
                        Grade
                      </label>
                      {errors.grade?.message && (
                        <h1>{errors.grade?.message}</h1>
                      )}
                      <select
                        id="gread"
                        value={editedSectionValue}
                        {...register("grade")}
                        onChange={handleSectionInputChange}
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
                      <label
                        htmlFor=""
                        className="text-sm text-gray-600 font-bold"
                      >
                        Region
                      </label>
                      {errors.region?.message && (
                        <h1>{errors.region?.message}</h1>
                      )}
                      <select
                        id="region"
                        value={editedRegionValue}
                        {...register("region")}
                        onChange={handleRegionInputChange}
                      >
                        <option value="" className="text-secondaryColor">
                          -- Select --
                        </option>
                        {regionChoices?.map((choice) => (
                          <option
                            className="text-secondaryColor"
                            key={choice.id}
                            value={choice.regionName}
                          >
                            {choice.regionName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-x-3">
                      <label
                        htmlFor=""
                        className="text-sm text-gray-600 font-bold"
                      >
                        City
                      </label>
                      {errors.city?.message && <h1>{errors.city?.message}</h1>}
                      <select
                        id="city"
                        value={editedCityValue}
                        {...register("city")}
                        onChange={handleCityInputChange}
                      >
                        <option value="" className="text-secondaryColor">
                          -- Select --
                        </option>
                        {cityChoices?.map((choice) => (
                          <option
                            className="text-secondaryColor"
                            key={choice.id}
                            value={choice.cityName}
                          >
                            {choice.cityName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full flex">
                      <button
                        type="submit"
                        className="w-3/4 py-1 mx-auto bg-primaryColor text-white rounded-full"
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
