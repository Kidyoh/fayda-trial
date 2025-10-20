import React from "react";
import { UseFormRegister, FieldErrors, UseFormTrigger } from "react-hook-form";
import { motion } from "framer-motion";
import { User, Calendar, School } from "lucide-react";
import { SignUpFormData } from "@/app/validation/signupValidation";
import { Choice } from "@/lib/constants/signupConstants";

interface PersonalInfoStepProps {
  register: UseFormRegister<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
  gradeChoices: Choice[];
  onNext: () => void;
  isSubmitting?: boolean;
  trigger: UseFormTrigger<SignUpFormData>;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  register,
  errors,
  gradeChoices,
  onNext,
  isSubmitting = false,
  trigger,
}) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="firstName"
          >
            <User size={16} className="mr-2 text-primaryColor" />
            First Name <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="firstName"
            className={`w-full px-4 py-2 border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors ${
              isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            type="text"
            placeholder="Enter your first name"
            disabled={isSubmitting}
            {...register("firstName")}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName && (
            <p id="firstName-error" className="text-red-500 text-xs mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="lastName"
          >
            Last Name <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="lastName"
            className={`w-full px-4 py-2 border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors ${
              isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            type="text"
            placeholder="Enter your last name"
            disabled={isSubmitting}
            {...register("lastName")}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName && (
            <p id="lastName-error" className="text-red-500 text-xs mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-gray-700"
          htmlFor="grandName"
        >
          Grand Name <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          id="grandName"
          className={`w-full px-4 py-2 border ${
            errors.grandName ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors ${
            isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          type="text"
          placeholder="Enter your grand name"
          disabled={isSubmitting}
          {...register("grandName")}
          aria-invalid={!!errors.grandName}
          aria-describedby={errors.grandName ? "grandName-error" : undefined}
        />
        {errors.grandName && (
          <p id="grandName-error" className="text-red-500 text-xs mt-1">
            {errors.grandName.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="age"
          >
            <Calendar size={16} className="mr-2 text-primaryColor" />
            Age <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="age"
            className={`w-full px-4 py-2 border ${
              errors.age ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors ${
              isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            type="number"
            min="13"
            max="100"
            placeholder="Enter your age"
            disabled={isSubmitting}
            {...register("age")}
            aria-invalid={!!errors.age}
            aria-describedby={errors.age ? "age-error" : undefined}
          />
          {errors.age && (
            <p id="age-error" className="text-red-500 text-xs mt-1">
              {errors.age.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-gray-700 flex items-center"
            htmlFor="grade"
          >
            <School size={16} className="mr-2 text-primaryColor" />
            Grade <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="grade"
            className={`w-full px-4 py-2 border ${
              errors.grade ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-primaryColor/20 focus:border-primaryColor transition-colors bg-white ${
              isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
            {...register("grade")}
            aria-invalid={!!errors.grade}
            aria-describedby={errors.grade ? "grade-error" : undefined}
          >
            <option value="">Select your grade</option>
            {gradeChoices?.map((choice) => (
              <option key={choice.id} value={choice.sectionName}>
                {choice.sectionName}
              </option>
            ))}
          </select>
          {errors.grade && (
            <p id="grade-error" className="text-red-500 text-xs mt-1">
              {errors.grade.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <button
          type="button"
          onClick={async () => {
            const isValid = await trigger([
              "firstName",
              "lastName",
              "grandName",
              "age",
              "grade",
            ]);
            if (isValid) onNext();
          }}
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
