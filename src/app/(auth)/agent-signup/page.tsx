"use client";
import { apiUrl } from "@/apiConfig";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { agentSignUpInfoSchema } from "../../validation/agentSignUpValidation";
import { User, Mail, Key, MapPin, Building, Check } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

type Inputs = {
  firstName: string;
  lastName: string;
  grandName: string;
  agent_email: string;
  password: string;
  confirmPassword: string;
  city: string;
  region: string;
};

interface Choice {
  id: string;
  cityName: string;
  regionName: string;
}

export default function AgentSignUp() {
  const [cityChoices, setCityChoices] = useState<Choice[]>([]);
  const [regionChoices, setRegionChoices] = useState<Choice[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const { toast } = useToast();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      grandName: "",
      agent_email: "",
      password: "",
      confirmPassword: "",
      city: "",
      region: "",
    },
    resolver: zodResolver(agentSignUpInfoSchema),
  });

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch(`${apiUrl}/region`);
        const data = await response.json();
        setRegionChoices(data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };
    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${apiUrl}/city`);
        const data = await response.json();
        setCityChoices(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { confirmPassword, ...formData } = data;
    fetch(`${apiUrl}/login_register/register_agent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error: " + response.status);
      })
      .then((responseData) => {
        toast({
          title: "Success!",
          description: responseData.message,
        });
        push("/agent_info");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      });
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-3">
            {/* Form Section */}
            <div className="md:col-span-2 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Create Agent Account
                </h2>
                <p className="text-gray-600 mt-2">
                  Join Fayida Academy as an agent and help students succeed
                </p>
              </div>

              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {[1, 2].map((step) => (
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
                      <span
                        className={`text-xs mt-1 ${currentStep >= step ? "text-primaryColor" : "text-gray-400"}`}
                      >
                        {step === 1 ? "Personal Info" : "Account Setup"}
                      </span>
                    </div>
                  ))}
                  <div className="h-1 absolute left-0 right-0 w-full max-w-md mx-auto -z-10 bg-gray-200">
                    <div
                      className="h-1 bg-primaryColor transition-all duration-300"
                      style={{ width: `${(currentStep - 1) * 100}%` }}
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
                          First Name{" "}
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          className={`w-full px-4 py-2 border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                          type="text"
                          placeholder="Enter your first name"
                          {...register("firstName")}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Last Name <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          className={`w-full px-4 py-2 border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                          type="text"
                          placeholder="Enter your last name"
                          {...register("lastName")}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Grand Name <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        className={`w-full px-4 py-2 border ${errors.grandName ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                        type="text"
                        placeholder="Enter your grand name"
                        {...register("grandName")}
                      />
                      {errors.grandName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.grandName.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center">
                          <MapPin
                            size={16}
                            className="mr-2 text-primaryColor"
                          />
                          City <span className="text-red-500 ml-1">*</span>
                        </label>
                        <select
                          className={`w-full px-4 py-2 border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors bg-white`}
                          {...register("city")}
                        >
                          <option value="">Select your city</option>
                          {cityChoices?.map((choice) => (
                            <option key={choice.id} value={choice.cityName}>
                              {choice.cityName}
                            </option>
                          ))}
                        </select>
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.city.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center">
                          <Building
                            size={16}
                            className="mr-2 text-primaryColor"
                          />
                          Region <span className="text-red-500 ml-1">*</span>
                        </label>
                        <select
                          className={`w-full px-4 py-2 border ${errors.region ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors bg-white`}
                          {...register("region")}
                        >
                          <option value="">Select your region</option>
                          {regionChoices?.map((choice) => (
                            <option key={choice.id} value={choice.regionName}>
                              {choice.regionName}
                            </option>
                          ))}
                        </select>
                        {errors.region && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.region.message}
                          </p>
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
                        Email Address{" "}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        className={`w-full px-4 py-2 border ${errors.agent_email ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                        type="email"
                        placeholder="Enter your email"
                        {...register("agent_email")}
                      />
                      {errors.agent_email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.agent_email.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center">
                          <Key size={16} className="mr-2 text-primaryColor" />
                          Password <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                          type="password"
                          placeholder="Create password"
                          {...register("password")}
                        />
                        {errors.password && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.password.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Confirm Password{" "}
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          className={`w-full px-4 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors`}
                          type="password"
                          placeholder="Confirm password"
                          {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.confirmPassword.message}
                          </p>
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

            {/* Right Banner */}
            <div className="relative bg-gradient-to-br from-primaryColor to-blue-600 p-8 flex flex-col justify-center items-center text-white">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute transform -rotate-45 -right-32 -top-32 w-64 h-64 rounded-full bg-white/10"></div>
                <div className="absolute transform -rotate-45 -left-32 -bottom-32 w-64 h-64 rounded-full bg-white/10"></div>
              </div>

              <div className="relative z-10 text-center">
                <div className="mb-8">
                  <img
                    src="/common_files/main/fayida_logo.png"
                    alt="Fayida"
                    className="h-16 mx-auto"
                  />
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  Welcome to Fayida Academy
                </h3>
                <p className="mb-8 text-white/90">
                  Join our network of agents and help connect students with
                  quality education
                </p>

                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-sm">
                    Already registered through Telegram?
                    <br />
                    You can log in with your existing agent account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
