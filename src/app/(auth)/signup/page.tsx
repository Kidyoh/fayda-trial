"use client";
import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useSignupForm } from "@/hooks/useSignupForm";
import { useSignupData } from "@/hooks/useSignupData";
import { ProgressIndicator } from "@/components/signup/ProgressIndicator";
import { PersonalInfoStep } from "@/components/signup/PersonalInfoStep";
import { AccountSetupStep } from "@/components/signup/AccountSetupStep";
import { AdditionalInfoStep } from "@/components/signup/AdditionalInfoStep";
import { ErrorDisplay } from "@/components/signup/ErrorDisplay";

export default function SignUp() {
  const {
    form,
    currentStep,
    isSubmitting,
    serverError,
    nextStep,
    prevStep,
    onSubmit,
    clearServerError,
  } = useSignupForm();

  const { grades, regions, cities, loading } = useSignupData();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = form;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (serverError) {
      clearServerError();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-3">
            {/* Left side - Form */}
            <div className="md:col-span-2 p-8">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                  Create your Fayida account
                </h1>
                <p className="text-gray-600 mt-2">
                  Join our community of learners and access educational content
                </p>
              </div>

              {/* Progress indicator */}
              <ProgressIndicator currentStep={currentStep} />

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Server Error Display */}
                <ErrorDisplay error={serverError} onClear={clearServerError} />

                {/* Form Steps */}
                {currentStep === 1 && (
                  <PersonalInfoStep
                    register={register}
                    errors={errors}
                    gradeChoices={grades}
                    onNext={nextStep}
                    isSubmitting={isSubmitting}
                    trigger={trigger}
                  />
                )}

                {currentStep === 2 && (
                  <AccountSetupStep
                    register={register}
                    errors={errors}
                    onNext={async () => {
                      const isValid = await trigger([
                        "email",
                        "password",
                        "confirmPassword",
                      ]);
                      if (isValid) nextStep();
                    }}
                    onPrev={prevStep}
                    onInputChange={handleInputChange}
                    isSubmitting={isSubmitting}
                  />
                )}

                {currentStep === 3 && (
                  <AdditionalInfoStep
                    register={register}
                    errors={errors}
                    cityChoices={cities}
                    regionChoices={regions}
                    onPrev={prevStep}
                    onSubmit={handleSubmit(onSubmit)}
                    isSubmitting={isSubmitting}
                    setValue={form.setValue}
                  />
                )}
              </form>
            </div>

            {/* Right side - Banner */}
            <div className="md:block bg-gradient-to-br from-primaryColor to-blue-600 p-8 text-white flex flex-col">
              <div className="mb-8 flex justify-center">
                <img
                  src="/common_files/main/fayida_logo.png"
                  alt="Fayida Academy Logo"
                  className="h-16"
                />
              </div>

              <div className="flex-grow flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">
                  Welcome to Fayida Academy
                </h2>
                <p className="mb-6">
                  Join our platform and get access to quality education
                  resources.
                </p>

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
                <p className="mb-4">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-white underline hover:text-white/80 transition-colors"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
