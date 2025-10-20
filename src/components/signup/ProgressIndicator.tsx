import React from "react";
import { Check } from "lucide-react";
import { FORM_STEPS } from "@/lib/constants/signupConstants";

interface ProgressIndicatorProps {
  currentStep: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
}) => {
  return (
    <div
      className="mb-8"
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={3}
    >
      <div className="flex items-center justify-between">
        {FORM_STEPS.map((step) => (
          <div key={step.step} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                currentStep >= step.step
                  ? "bg-primaryColor text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
              aria-label={`Step ${step.step}: ${step.title}`}
            >
              {currentStep > step.step ? <Check size={18} /> : step.step}
            </div>
            <span
              className={`text-xs mt-1 transition-colors ${
                currentStep >= step.step ? "text-primaryColor" : "text-gray-400"
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
        <div
          className={`h-1 absolute left-0 right-0 w-full max-w-md mx-auto -z-10 bg-gray-200`}
        >
          <div
            className="h-1 bg-primaryColor transition-all duration-300"
            style={{ width: `${(currentStep - 1) * 50}%` }}
          />
        </div>
      </div>
    </div>
  );
};
