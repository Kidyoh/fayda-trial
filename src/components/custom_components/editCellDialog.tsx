"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { apiUrl } from "@/apiConfig";
import { toast } from "@/components/ui/use-toast";
import { FieldErrors } from "react-hook-form";

import { useForm, SubmitHandler } from "react-hook-form";
//import { zodResolver } from "@hookform/resolvers/zod";
//import * as z from "zod";

//import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
//import { updateProfileInfoSchema } from "../../app/validation/updateProfileValidation";
import { FormField } from "../ui/form";

interface EditDialogProps {
  type: string;
  id: string;
  field: string;
  content: string;
  dataType: string;
  formType: String;
}

interface Choice {
  id: string;
  sectionName: string;
  fullForm: string;
  shortForm: string;
}
export default function EditCellDialog({
  type,
  id,
  field,
  content,
  dataType,
  formType,
}: EditDialogProps) {
  const RecivedType = type;
  const RecivedId = id;
  const RecivedField = field;
  const RecivedContent = content;
  const DataType = dataType;
  const FormType = formType;

  const [editedValue, setEditedValue] = useState("");
  const [open, setOpen] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const [languageChoices, setLanguageChoices] = useState<Choice[]>([]);
  const [selectedLanguageChoice, setSelectedLanguageChoice] = useState("");

  const [greadChoices, setGreadChoices] = useState<Choice[]>([]);
  const [selectedGreadChoice, setSelectedGreadChoice] = useState("");

  const handleInputChange = (event: any) => {
    setEditedValue(event.target.value);
    // setSelectedChoice(event.target.value);
  };

  const updatedData = {
    [RecivedField.toString()]: editedValue,
  };

  const router = useRouter();

  //console.log(fn);
  useEffect(() => {
    switch (RecivedField) {
      case "firstName":
        setFieldName("First Name");
        break;
      case "lastName":
        setFieldName("Last Name");
        break;
      default:
        setFieldName("");
        break;
    }
  }, [RecivedField]);

  /*****************/

  /****
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Printed");
    fetch(`${apiUrl}/${RecivedType}/${RecivedId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
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
        setOpen(false);
        toast({
          title: `Success!`,
          description: `Updates Made.`,
        });
        // push("/login");
      })
      .catch((error) => {
        // Handle any errors during the request
        console.error("Error:", error);
      });
  };
  *********** */

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
  }, [RecivedField]);

  useEffect(() => {
    const fetchLanguageChoices = async () => {
      try {
        const response = await fetch(`${apiUrl}/languages`);
        const data = await response.json();
        setLanguageChoices(data);
      } catch (error) {
        console.error("Error fetching choices:", error);
      }
    };

    fetchLanguageChoices();
  }, [RecivedField]);

  const handleLanguageSelectChange = (event: any) => {
    setSelectedLanguageChoice(event.target.value);

    //handleUpdate()
  };
  const handleGreadSelectChange = (event: any) => {
    setSelectedGreadChoice(event.target.value);
    //handleUpdate()
  };

  const handleUpdate = async () => {
    try {
      // console.log("printed");
      const response = await fetch(
        `${apiUrl}/${RecivedType}/${RecivedId}`,
        //`${apiUrl}/login_register/test/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            //credentials: "include",
            // withCredentials: true
            //Authorization: `Bearer ${"secret"}`,
          },
          credentials: "include",
          body: JSON.stringify(updatedData),

          // Add any necessary headers or authentication tokens
        },
      );

      if (response.ok) {
        // File successfully deleted
        console.log("File Updated");
        //router.push("/" + RecivedId);
        router.push(window.location.href);
        setOpen(false);
        router.refresh();
        toast({
          title: "Success!",
          description: "Section Edited!",
        });
      } else {
        // File deletion failed
        console.error("Failed to Update file");
      }
    } catch (error) {
      console.error("Error Updating file", error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {/* <Button variant="outline">Edit</Button> */}
          <button className="bg-primaryColor text-white px-1 rounded">
            Edit
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit from {RecivedType}</DialogTitle>
            <DialogDescription>
              Make changes here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {FormType == "default" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  {fieldName}
                </Label>
                <Input
                  id={RecivedField}
                  defaultValue={RecivedContent}
                  className="col-span-3"
                  type={dataType}
                  onChange={handleInputChange}
                />
              </div>
            )}
            {FormType == "gread" && (
              <div>
                <label htmlFor="choiceSelect">Select a choice:</label>
                <select
                  id={RecivedField}
                  value={editedValue}
                  onChange={handleInputChange}
                >
                  <option value="">-- Select --</option>
                  {greadChoices?.map((choice) => (
                    <option key={choice.id} value={choice.sectionName}>
                      {choice.sectionName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {FormType == "prefferdLanguage" && (
              <div>
                <label htmlFor="choiceSelect">Select a choice:</label>
                <select
                  id={RecivedField}
                  value={editedValue}
                  onChange={handleInputChange}
                >
                  <option value="">-- Select --</option>
                  {languageChoices?.map((choice) => (
                    <option key={choice.id} value={choice.fullForm}>
                      {choice.fullForm}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {/*********************************** */}
          </div>

          <DialogFooter>
            {
              <Button
                type="submit"
                className="bg-primaryColor text-white"
                onClick={() => handleUpdate()}
              >
                Save changes
              </Button>
            }
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

{
  /**  <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-3">
                <div className="space-x-3">
                  {errors.firstName?.message && (
                    <h1>
                      {errors[RecivedField as keyof typeof errors]?.message}
                    </h1>
                  )}
                  <label htmlFor="" className="text-sm text-gray-600 font-bold">
                    {fieldName}
                  </label>
                  <input
                    className="px-2 border-b-2 border-blue-500 "
                    type="text"
                    placeholder={RecivedContent}
                    // name="firstName"
                    id={RecivedField}
                    {1==1? {} :}
                    {...register("lastName")}
                  />
                </div>

                <div className="w-full flex">
                  <button
                    type="submit"
                    className="w-1/4 py-1 mx-auto bg-blue-600 text-white rounded-full"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form> */
}
