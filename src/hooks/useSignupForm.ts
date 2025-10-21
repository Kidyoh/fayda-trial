import { useState, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  signUpInfoSchema,
  SignUpFormData,
} from "@/app/validation/signupValidation";
import { setAccessToken } from "@/lib/tokenManager";
import { apiUrl } from "@/apiConfig";

interface UseSignupFormReturn {
  form: ReturnType<typeof useForm<SignUpFormData>>;
  currentStep: number;
  isSubmitting: boolean;
  serverError: string;
  nextStep: () => void;
  prevStep: () => void;
  onSubmit: SubmitHandler<SignUpFormData>;
  clearServerError: () => void;
}

export const useSignupForm = (): UseSignupFormReturn => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<SignUpFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      grandName: "",
      email: "",
      age: "",
      password: "",
      confirmPassword: "",
      grade: "",
      city: "",
      region: "",
      schoolName: "",
      promocode: "",
      studentStatus: "active",
      referralSource: "",
    },
    resolver: zodResolver(signUpInfoSchema),
    mode: "onChange", // Enable real-time validation
  });

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
    setServerError("");
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setServerError("");
  }, []);

  const clearServerError = useCallback(() => {
    setServerError("");
  }, []);

  const onSubmit: SubmitHandler<SignUpFormData> = useCallback(
    async (data) => {
      setIsSubmitting(true);
      setServerError("");

      try {
        // Remove fields not needed by backend and convert grade -> gread
        const { confirmPassword, referralSource, grade, ...formData } = data;
        const backendData = {
          ...formData,
          gread: grade, // Backend expects 'gread' field
        };

        const response = await fetch(`${apiUrl}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(backendData),
          signal: AbortSignal.timeout(30000), // 30 second timeout
        });

        const responseData = await response.json();

        if (response.ok) {
          if (responseData.accessToken) {
            setAccessToken(responseData.accessToken);
          }

          toast({
            title: "Success!",
            description:
              responseData.message || "Account created successfully!",
            variant: "default",
          });

          router.push("/");
        } else {
          const errorMessage =
            responseData.message ||
            responseData.error ||
            "Registration failed. Please try again.";

          setServerError(errorMessage);
          toast({
            title: "Registration Failed",
            description: errorMessage,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Registration error:", error);

        let errorMessage =
          "Network error. Please check your connection and try again.";

        if (error instanceof Error) {
          if (error.name === "AbortError") {
            errorMessage = "Request timed out. Please try again.";
          } else if (error.message.includes("fetch")) {
            errorMessage =
              "Unable to connect to server. Please check your internet connection.";
          }
        }

        setServerError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [toast, router]
  );

  return {
    form,
    currentStep,
    isSubmitting,
    serverError,
    nextStep,
    prevStep,
    onSubmit,
    clearServerError,
  };
};
