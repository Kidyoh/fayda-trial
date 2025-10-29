import React, { useState } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { motion } from "framer-motion";
import { School, MapPin } from "lucide-react";
import { SignUpFormData } from "@/app/validation/signupValidation";
import { Choice } from "@/lib/constants/signupConstants";
import { REFERRAL_SOURCES } from "@/lib/constants/signupConstants";

interface AdditionalInfoStepProps {
  register: UseFormRegister<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
  cityChoices: Choice[];
  regionChoices: Choice[];
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  setValue?: UseFormSetValue<SignUpFormData>;
}

export const AdditionalInfoStep: React.FC<AdditionalInfoStepProps> = ({
  register,
  errors,
  cityChoices,
  regionChoices,
  onPrev,
  onSubmit,
  isSubmitting,
  setValue,
}) => {
  const [selectedReferralSource, setSelectedReferralSource] = useState("");

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
          htmlFor="schoolName"
        >
          <School size={16} className="mr-2 text-primaryColor" />
          School Name <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          id="schoolName"
          className={`w-full px-4 py-2 border ${
            errors.schoolName ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors ${
            isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          type="text"
          placeholder="Enter your school name"
          disabled={isSubmitting}
          {...register("schoolName")}
          aria-invalid={!!errors.schoolName}
          aria-describedby={errors.schoolName ? "schoolName-error" : undefined}
        />
        {errors.schoolName && (
          <p id="schoolName-error" className="text-red-500 text-xs mt-1">
            {errors.schoolName.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="city"
          >
            <MapPin size={16} className="mr-2 text-primaryColor" />
            City <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="city"
            className={`w-full px-4 py-2 border ${
              errors.city ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors bg-white ${
              isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
            {...register("city")}
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
          >
            <option value="">Select your city</option>
            {cityChoices?.map((choice) => (
              <option key={choice.id} value={choice?.cityName}>
                {choice.cityName}
              </option>
            ))}
          </select>
          {errors.city && (
            <p id="city-error" className="text-red-500 text-xs mt-1">
              {errors.city.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700" htmlFor="region">
            Region <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="region"
            className={`w-full px-4 py-2 border ${
              errors.region ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors bg-white ${
              isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
            {...register("region")}
            aria-invalid={!!errors.region}
            aria-describedby={errors.region ? "region-error" : undefined}
          >
            <option value="">Select your region</option>
            {regionChoices?.map((choice) => (
              <option key={choice.id} value={choice?.regionName}>
                {choice.regionName}
              </option>
            ))}
          </select>
          {errors.region && (
            <p id="region-error" className="text-red-500 text-xs mt-1">
              {errors.region.message}
            </p>
          )}
        </div>
      </div>

      {/* Referral source section */}
      <div className="space-y-4">
        <fieldset>
          <legend className="text-sm font-medium text-gray-700">
            How did you hear about us?{" "}
            <span className="text-red-500 ml-1">*</span>
          </legend>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
            {REFERRAL_SOURCES.map((source) => (
              <div
                key={source.value}
                onClick={() => {
                  setSelectedReferralSource(source.value);
                  setValue &&
                    setValue("referralSource", source.value, {
                      shouldValidate: true,
                      shouldTouch: true,
                      shouldDirty: true,
                    });
                }}
                className={`
                  cursor-pointer rounded-lg border p-3 text-center transition-all
                  ${
                    selectedReferralSource === source.value
                      ? "border-primaryColor bg-primaryColor/5 text-primaryColor"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
                role="radio"
                aria-checked={selectedReferralSource === source.value}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedReferralSource(source.value);
                    setValue &&
                      setValue("referralSource", source.value, {
                        shouldValidate: true,
                        shouldTouch: true,
                        shouldDirty: true,
                      });
                  }
                }}
              >
                <input
                  type="radio"
                  value={source.value}
                  className="hidden"
                  {...register("referralSource")}
                  checked={selectedReferralSource === source.value}
                  onChange={() => {
                    setSelectedReferralSource(source.value);
                    setValue &&
                      setValue("referralSource", source.value, {
                        shouldValidate: true,
                        shouldTouch: true,
                        shouldDirty: true,
                      });
                  }}
                />
                <span className="text-sm font-medium">{source.label}</span>
              </div>
            ))}
          </div>
          {errors.referralSource && (
            <p className="text-red-500 text-xs mt-1">
              {errors.referralSource.message}
            </p>
          )}
        </fieldset>
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
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="promocode"
          >
            Promo Code <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="promocode"
            className={`w-full px-4 py-2 border ${
              errors.promocode ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors ${
              isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            type="text"
            placeholder="Enter agent promo code"
            disabled={isSubmitting}
            {...register("promocode")}
            aria-invalid={!!errors.promocode}
            aria-describedby={errors.promocode ? "promocode-error" : undefined}
          />
          {errors.promocode && (
            <p id="promocode-error" className="text-red-500 text-xs mt-1">
              {errors.promocode.message}
            </p>
          )}
        </motion.div>
      )}

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
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 rounded-lg transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primaryColor/20 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primaryColor text-white hover:bg-primaryColor/90"
          }`}
          onClick={onSubmit}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </div>
    </motion.div>
  );
};
