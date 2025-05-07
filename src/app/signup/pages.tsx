"use client";
import { apiUrl } from "@/apiConfig";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
export default function SignUp() {
  // const { push } = useRouter();
  // if (courseId == "0") {
  // push("/courses");
  // }

  const noSymbolsRegex = /^[a-zA-Z0-9 ]*$/;
  const formSchema = z.object({
    email: z.string().min(1, { message: "Email can not be empty!" }),
    /*.refine((value) => noSymbolsRegex.test(value), {
        message: "Email can not contain symbols!",
      }),*/

    password: z
      .string()
      .min(1, { message: "Password cannot be empty!" })
      .transform((val) => val.toString()),

    // status: z.boolean(),
  });

  //const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //status: false,
      // price: "0",
      email: "",
      password: "",
    },
  });

  const handleSectionPost = async (formData: any) => {
    try {
      const response = await fetch(`${apiUrl}/login_register/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // push(`/packages`);
        console.log("Package Added");
        /* toast({
          title: "Success!",
          description: "Package Added!",
        });
        */
      } else {
        // File deletion failed
        console.error("Failed to add Package");
      }
    } catch (error) {
      console.error("Error adding Package", error);
    }
  };

  ////////////////////
  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSectionPost(values);
  }

  return (
    <div className="w-full flex pb-64  bg-slate-100 p-5 h-full">
      <div className="grid grid-cols-3  mx-auto shadow-2xl ">
        <div className="col-span-2 bg-white p-10 rounded-2xl overflow-hidden">
          <h1 className="text-lg">Sign up</h1>
          <br />
          <br />
          <div className="w-full flex">
            <div className="mx-auto">
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Package Name: </FormLabel>
                          <FormControl>
                            <div className="w-1/2">
                              <Input
                                type="text"
                                placeholder="type the name here ..."
                                {...field}
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="w-1/2">
                              <Input
                                placeholder="type the Description here ..."
                                type="text"
                                {...field}
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <button
                      type="submit"
                      className="w-3/4 py-1 mx-auto bg-blue-600 text-white rounded-full"
                    >
                      Create account
                    </button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="p-10 w-full flex bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl">
          <div className="mx-auto my-auto">
            <div className="w-full flex pb-4">
              <div className="w-28 mx-auto ">
                <img src="common_files/logozoom.png" alt="" />
              </div>
            </div>
            <h1 className="text-xl text-white font-semibold pb-10">
              Welcome to Fayida
            </h1>
            <h1 className="text-center text-white">Already have an account?</h1>
            <div className="w-full flex pt-7">
              <button className="mx-auto border-2 text-white border-white px-3 py-2 rounded-full">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
