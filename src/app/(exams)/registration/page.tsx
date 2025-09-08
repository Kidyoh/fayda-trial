"use client";
import { apiUrl } from "@/apiConfig";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterExamTakerSchema } from "../../validation/registerExamTakerValidation";
import { Phone, User, School, MapPin, Building, GraduationCap, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import useTemporaryPhonenumberStore from "../../store/temporaryphonenumberStore";

type Inputs = {
  phoneNumber: string;
  school: string;
  city: string;
  region: string;
  scienceType: string;
  grade: string;
  gender: string;
};

interface Choice {
  id: string;
  sectionName: string;
  regionName: string;
  cityName: string;
}

export default function RegisterExamTaker() {
  const [regionChoices, setRegionChoices] = useState<Choice[]>([]);
  const [cityChoices, setCityChoices] = useState<Choice[]>([]);
  const [greadChoices, setGreadChoices] = useState<Choice[]>([]);

  const genderSelection = ["Male", "Female"];
  const scienceType = ["Natural", "Social", "Other"];

  const phoneNumberFromStore = useTemporaryPhonenumberStore(
    (state) => state.phoneNumber
  );

  const { toast } = useToast();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      phoneNumber: phoneNumberFromStore,
      school: "",
      city: "",
      region: "",
      scienceType: "",
      grade: "",
      gender: "",
    },
    resolver: zodResolver(RegisterExamTakerSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cityRes, regionRes, sectionRes] = await Promise.all([
          fetch(`${apiUrl}/city`),
          fetch(`${apiUrl}/region`),
          fetch(`${apiUrl}/sections`)
        ]);
        
        const [cityData, regionData, sectionData] = await Promise.all([
          cityRes.json(),
          regionRes.json(),
          sectionRes.json()
        ]);

        setCityChoices(cityData);
        setRegionChoices(regionData);
        setGreadChoices(sectionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch(`${apiUrl}/examtaker`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Error: " + response.status);
      })
      .then((responseData) => {
        toast({
          title: "Success!",
          description: "You are registered successfully",
        });
        push("/mock/selectmainfolder");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "Registration failed. Please try again.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Exam Registration</h2>
              <p className="text-gray-600 mt-2">
                Please complete this form to register for your exams
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Phone size={16} className="mr-2 text-primaryColor" />
                    Phone Number <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="tel"
                    className={`w-full px-4 py-2 border ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                    placeholder="Enter your phone number"
                    {...register("phoneNumber")}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
                  )}
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <User size={16} className="mr-2 text-primaryColor" />
                    Gender <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    className={`w-full px-4 py-2 border ${
                      errors.gender ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors bg-white`}
                    {...register("gender")}
                  >
                    <option value="">Select gender</option>
                    {genderSelection.map((gender) => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
                  )}
                </div>
              </div>

              {/* Science Field & School */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <BookOpen size={16} className="mr-2 text-primaryColor" />
                    Science Field <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    className={`w-full px-4 py-2 border ${
                      errors.scienceType ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors bg-white`}
                    {...register("scienceType")}
                  >
                    <option value="">Select field</option>
                    {scienceType.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.scienceType && (
                    <p className="text-red-500 text-xs mt-1">{errors.scienceType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <School size={16} className="mr-2 text-primaryColor" />
                    School Name <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border ${
                      errors.school ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                    placeholder="Enter your school name"
                    {...register("school")}
                  />
                  {errors.school && (
                    <p className="text-red-500 text-xs mt-1">{errors.school.message}</p>
                  )}
                </div>
              </div>

              {/* Grade */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <GraduationCap size={16} className="mr-2 text-primaryColor" />
                  Grade <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  className={`w-full px-4 py-2 border ${
                    errors.grade ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors bg-white`}
                  {...register("grade")}
                >
                  <option value="">Select grade</option>
                  {greadChoices?.map((choice) => (
                    <option key={choice.id} value={choice.sectionName}>
                      {choice.sectionName}
                    </option>
                  ))}
                </select>
                {errors.grade && (
                  <p className="text-red-500 text-xs mt-1">{errors.grade.message}</p>
                )}
              </div>

              {/* Region & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <MapPin size={16} className="mr-2 text-primaryColor" />
                    Region <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    className={`w-full px-4 py-2 border ${
                      errors.region ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors bg-white`}
                    {...register("region")}
                  >
                    <option value="">Select region</option>
                    {regionChoices?.map((choice) => (
                      <option key={choice.id} value={choice.regionName}>
                        {choice.regionName}
                      </option>
                    ))}
                  </select>
                  {errors.region && (
                    <p className="text-red-500 text-xs mt-1">{errors.region.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Building size={16} className="mr-2 text-primaryColor" />
                    City <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    className={`w-full px-4 py-2 border ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors bg-white`}
                    {...register("city")}
                  >
                    <option value="">Select city</option>
                    {cityChoices?.map((choice) => (
                      <option key={choice.id} value={choice.cityName}>
                        {choice.cityName}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                  )}
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full py-3 bg-primaryColor text-white rounded-lg hover:bg-primaryColor/90 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Complete Registration</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}