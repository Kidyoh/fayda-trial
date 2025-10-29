import { apiUrl } from "@/apiConfig";

import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordValidationSchema } from "../validation/forgotPasswordValidation";

type zodInputs = {
  email: string;
  password: string;

  confirmPassword: string;
};

export default function Test() {
  const [formSection, setFormSection] = useState("start");
  const [errorInfo, setErrorInfo] = useState("");
  const [usedEmail, setUsedEmail] = useState("");
  const [code, setCode] = useState("");

  const { toast } = useToast();
  const { push } = useRouter();

  //setUsedEmail("RecivedEmail");
  const {
    register,
    //handleEmailSubmit,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<zodInputs>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordValidationSchema),
  });

  const onSubmit: SubmitHandler<zodInputs> = (data) => {
    //this line is included so that 'confirm password' is not sent to server
    const { confirmPassword, ...formData } = data;
    console.log(formData.email);
    fetch(`${apiUrl}/login_register/reset_forgot_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log("first");
        console.log("res: " + response.status);
        //  console.log(formData);

        if (response.status == 201) {
          console.log("wrk");
          setErrorInfo("");
          setUsedEmail(formData.email);
          console.log("Email: " + formData.email);
          setFormSection("code");
        }
        if (response.status == 500) {
          console.log("nt wrk");
          setErrorInfo("Wrong Email address!");
        }
        // if (response.status == 201) {
        //  setFormSection("code");

        //return response.json();
        //console.log(response.json());
        // }
        throw new Error(
          "Error: ", //response.status
        );
      })
      .then((responseData) => {
        // Handle the response data
        console.log(responseData);
        toast({
          title: `Success!`,
          description: `Test`,
        });
        // push("/login");
      })
      .catch((error) => {
        // Handle any errors during the request
        console.error("Error:", error);
      });
  };

  const handleCheckConfirmationSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${apiUrl}/login_register/check_confirmation_forgotPassword`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: code, email: usedEmail }),
        },
      )
        .then((response) => {
          console.log("first");
          console.log("resss: " + response.status);
          //  console.log(formData);

          if (response.status == 201) {
            console.log("wrk");
            setErrorInfo("");
            //   setErrorInfo("");
            // setUsedEmail(formData.email);
            //  console.log("Email: " + formData.email);
            //  setFormSection("code");
          }
          if (response.status == 501) {
            console.log("nt wrk");
            setErrorInfo("Incorrect Code!");
            //   setErrorInfo("Wrong Email address!");
          }
          // if (response.status == 201) {
          //  setFormSection("code");

          //return response.json();
          //console.log(response.json());
          // }
          throw new Error(
            "Error: ", //response.status
          );
        })

        .catch((error) => {
          // Handle any errors during the request
          console.error("Error:", error);
        });
    } catch {}
  };

  return <div>Test</div>;
}
