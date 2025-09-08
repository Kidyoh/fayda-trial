"use client";
import { apiUrl } from "@/apiConfig";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
//import { zodResolver } from "@hookform/resolvers/zod";
//import * as z from "zod";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpInfoSchema } from "../../validation/signupValidation";
import { error } from "console";
import { Info, User, Mail, Key, School, MapPin, Calendar, Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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
  referralSource: string;
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
  referralSource: string;
};
interface Choice {
  id: string;
  sectionName: string;
  fullForm: string;
  shortForm: string;
  // city:string;
  // region:string;
  cityName: string;
  regionName: string;
  promocode: string;
}

export default function SignUp() {
  const [greadChoices, setGreadChoices] = useState<Choice[]>([]);
  const [cityChoices, setCityChoices] = useState<Choice[]>([]);
  const [regionChoices, setRegionChoices] = useState<Choice[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedReferralSource, setSelectedReferralSource] = useState("");

  const { toast } = useToast();
  const { push } = useRouter();
  const {
    register,
    control,
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
      schoolName: "",
      promocode: "",
      studentStatus: "active",
      referralSource: "",
    },
    resolver: zodResolver(signUpInfoSchema),
  });

  // Referral source options
  const referralSources = [
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "tiktok", label: "TikTok" },
    { value: "friends", label: "Friend" },
    { value: "school", label: "School" },
    { value: "agent", label: "Agent" },
    { value: "other", label: "Other" },
  ];

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

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-3">
            {/* Left side - Form */}
            <div className="md:col-span-2 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Create your Fayida account</h2>
                <p className="text-gray-600 mt-2">Join our community of learners and access educational content</p>
              </div>

              {/* Progress indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex flex-col items-center">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          currentStep >= step 
                            ? "bg-primaryColor text-white" 
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {currentStep > step ? <Check size={18} /> : step}
                      </div>
                      <span className={`text-xs mt-1 ${currentStep >= step ? "text-primaryColor" : "text-gray-400"}`}>
                        {step === 1 ? "Personal Info" : step === 2 ? "Account Setup" : "Additional Info"}
                      </span>
                    </div>
                  ))}
                  <div className={`h-1 absolute left-0 right-0 w-full max-w-md mx-auto -z-10 bg-gray-200`}>
                    <div 
                      className="h-1 bg-primaryColor transition-all duration-300" 
                      style={{ width: `${(currentStep - 1) * 50}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {currentStep === 1 && (
                  <motion.div
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center">
                          <User size={16} className="mr-2 text-primaryColor" />
                          First Name <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                          type="text"
                          placeholder="Enter your first name"
                          {...register("firstName")}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Last Name <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                          type="text"
                          placeholder="Enter your last name"
                          {...register("lastName")}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Grand Name <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        className={`w-full px-4 py-2 border ${errors.grandName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                        type="text"
                        placeholder="Enter your grand name"
                        {...register("grandName")}
                      />
                      {errors.grandName && (
                        <p className="text-red-500 text-xs mt-1">{errors.grandName.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center">
                          <Calendar size={16} className="mr-2 text-primaryColor" />
                          Age <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          className={`w-full px-4 py-2 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                          type="number"
                          placeholder="Enter your age"
                          {...register("age")}
                        />
                        {errors.age && (
                          <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center">
                          <School size={16} className="mr-2 text-primaryColor" />
                          Grade <span className="text-red-500 ml-1">*</span>
                        </label>
                        <select
                          className={`w-full px-4 py-2 border ${errors.gread ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors bg-white`}
                          {...register("gread")}
                        >
                          <option value="">Select your grade</option>
                          {greadChoices?.map((choice) => (
                            <option key={choice.id} value={choice.sectionName}>
                              {choice.sectionName}
                            </option>
                          ))}
                        </select>
                        {errors.gread && (
                          <p className="text-red-500 text-xs mt-1">{errors.gread.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-2 bg-primaryColor text-white rounded-lg hover:bg-primaryColor/90 transition-colors"
                      >
                        Continue
                      </button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <Mail size={16} className="mr-2 text-primaryColor" />
                        Email <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                        type="email"
                        placeholder="Enter your email address"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                      <div className="bg-blue-50 border-l-4 border-primaryColor p-4 mt-2 rounded-md">
                        <div className="flex items-start">
                          <Info size={18} className="text-primaryColor mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-sm text-gray-700">
                            Use a unique email that has not been used to sign in, or you will not be able to proceed.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center">
                          <Key size={16} className="mr-2 text-primaryColor" />
                          Password <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                          type="password"
                          placeholder="Create a password"
                          {...register("password")}
                        />
                        {errors.password && (
                          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Confirm Password <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                          type="password"
                          placeholder="Confirm your password"
                          {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="pt-6 flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-2 bg-primaryColor text-white rounded-lg hover:bg-primaryColor/90 transition-colors"
                      >
                        Continue
                      </button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <School size={16} className="mr-2 text-primaryColor" />
                        School Name <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        className={`w-full px-4 py-2 border ${errors.schoolName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                        type="text"
                        placeholder="Enter your school name"
                        {...register("schoolName")}
                      />
                      {errors.schoolName && (
                        <p className="text-red-500 text-xs mt-1">{errors.schoolName.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center">
                          <MapPin size={16} className="mr-2 text-primaryColor" />
                          City <span className="text-red-500 ml-1">*</span>
                        </label>
                        <select
                          className={`w-full px-4 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors bg-white`}
                          {...register("city")}
                        >
                          <option value="">Select your city</option>
                          {cityChoices?.map((choice) => (
                            <option key={choice.id} value={choice?.cityName}>
                              {choice.cityName}
                            </option>
                          ))}
                        </select>
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Region <span className="text-red-500 ml-1">*</span>
                        </label>
                        <select
                          className={`w-full px-4 py-2 border ${errors.region ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors bg-white`}
                          {...register("region")}
                        >
                          <option value="">Select your region</option>
                          {regionChoices?.map((choice) => (
                            <option key={choice.id} value={choice?.regionName}>
                              {choice.regionName}
                            </option>
                          ))}
                        </select>
                        {errors.region && (
                          <p className="text-red-500 text-xs mt-1">{errors.region.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Referral source section */}
                    <div className="space-y-4">
                      <label className="text-sm font-medium text-gray-700">
                        How did you hear about us? <span className="text-red-500 ml-1">*</span>
                      </label>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {referralSources.map((source) => (
                          <div 
                            key={source.value}
                            onClick={() => setSelectedReferralSource(source.value)}
                            className={`
                              cursor-pointer rounded-lg border p-3 text-center transition-all
                              ${selectedReferralSource === source.value 
                                ? 'border-primaryColor bg-primaryColor/5 text-primaryColor' 
                                : 'border-gray-200 hover:border-gray-300'
                              }
                            `}
                          >
                            <input
                              type="radio"
                              value={source.value}
                              className="hidden"
                              {...register("referralSource")}
                              checked={selectedReferralSource === source.value}
                              onChange={() => setSelectedReferralSource(source.value)}
                            />
                            <span className="text-sm font-medium">{source.label}</span>
                          </div>
                        ))}
                      </div>
                      {errors.referralSource && (
                        <p className="text-red-500 text-xs mt-1">{errors.referralSource.message}</p>
                      )}
                    </div>

                    {/* Conditional promo code field - show only if "Agent" is selected */}
                    {selectedReferralSource === "agent" && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2"
                      >
                        <label className="text-sm font-medium text-gray-700">
                          Promo Code <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          className={`w-full px-4 py-2 border ${errors.promocode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                          type="text"
                          placeholder="Enter agent promo code"
                          {...register("promocode")}
                        />
                        {errors.promocode && (
                          <p className="text-red-500 text-xs mt-1">{errors.promocode.message}</p>
                        )}
                      </motion.div>
                    )}

                    <div className="pt-6 flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-primaryColor text-white rounded-lg hover:bg-primaryColor/90 transition-colors"
                      >
                        Create Account
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>

            {/* Right side - Banner */}
            <div className=" md:block bg-gradient-to-br from-primaryColor to-blue-600 p-8 text-white flex flex-col">
              <div className="mb-8 flex justify-center">
                <img src="/common_files/main/fayida_logo.png" alt="Fayida" className="h-16" />
              </div>
              
              <div className="flex-grow flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">Welcome to Fayida Academy</h2>
                <p className="mb-6">Join our platform and get access to quality education resources.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <Check size={16} className="text-white" />
                    </div>
                    <span>Access to premium courses</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <Check size={16} className="text-white" />
                    </div>
                    <span>Study material for all grades</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <Check size={16} className="text-white" />
                    </div>
                    <span>Track your progress and achievements</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto text-center">
                <p className="mb-4">Already have an account?</p>
                <Link href="/login">
                  <button className="px-6 py-2 bg-white text-primaryColor rounded-lg font-medium hover:bg-white/90 transition-colors">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
