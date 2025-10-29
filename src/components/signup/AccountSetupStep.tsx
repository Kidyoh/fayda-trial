import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Key, Info, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SignUpFormData } from "@/app/validation/signupValidation";

interface AccountSetupStepProps {
  register: UseFormRegister<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
  onNext: () => void;
  onPrev: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting?: boolean;
}

export const AccountSetupStep: React.FC<AccountSetupStepProps> = ({
  register,
  errors,
  onNext,
  onPrev,
  onInputChange,
  isSubmitting = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="space-y-2">
        <label
          className="text-sm font-medium text-gray-700 flex items-center"
          htmlFor="email"
        >
          <Mail size={16} className="mr-2 text-primaryColor" />
          Email <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          id="email"
          className={`w-full px-4 py-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors ${
            isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          type="email"
          placeholder="Enter your email address"
          disabled={isSubmitting}
          {...register("email")}
          onChange={(e) => {
            register("email").onChange(e);
            onInputChange(e);
          }}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-red-500 text-xs mt-1">
            {errors.email.message}
          </p>
        )}
        <div className="bg-blue-50 border-l-4 border-primaryColor p-4 mt-2 rounded-md">
          <div className="flex items-start">
            <Info
              size={18}
              className="text-primaryColor mt-0.5 mr-2 flex-shrink-0"
            />
            <p className="text-sm text-gray-700">
              Use a unique email that has not been used to sign in, or you will
              not be able to proceed.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="password"
          >
            <Key size={16} className="mr-2 text-primaryColor" />
            Password <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              className={`w-full px-4 py-2 pr-10 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors ${
                isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              disabled={isSubmitting}
              {...register("password")}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={isSubmitting}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
          <div className="text-xs text-gray-500 mt-1">
            Password must be at least 6 characters long.
          </div>
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="confirmPassword"
          >
            Confirm Password <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              className={`w-full px-4 py-2 pr-10 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors ${
                isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm your password"
              disabled={isSubmitting}
              {...register("confirmPassword")}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={
                errors.confirmPassword ? "confirmPassword-error" : undefined
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
              aria-label={showConfirm ? "Hide password" : "Show password"}
              disabled={isSubmitting}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p id="confirmPassword-error" className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-6 flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          disabled={isSubmitting}
          className={`px-6 py-2 border border-gray-300 text-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300/20 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
          }`}
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          className={`px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primaryColor/20 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primaryColor text-white hover:bg-primaryColor/90"
          }`}
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};
