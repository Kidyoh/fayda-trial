"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/apiConfig";

const noSymbolsRegex = /^[a-zA-Z0-9 ]*$/;
const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Can not be empty!" })
    .refine((value) => noSymbolsRegex.test(value), {
      message: "Can not contain symbols!",
    }),
  email: z.string().email({ message: "Not a valid email" }),

  Text: z.string().min(1, { message: "Can not be empty!" }),
});

export default function ContactUs() {
  const { push } = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      Text: "",
    },
  });

  const handleSectionPost = async (formData: any) => {
    console.log("Form data: " + formData);
    try {
      const response = await fetch(`${apiUrl}/messages/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // push("/settings/languages");
        console.log("Message Recived!");
        toast({
          title: "Success!",
          description: "Message Recived!",
        });
      } else {
        // File deletion failed
        console.error("Failed to add message");
      }
    } catch (error) {
      console.error("Error adding Message", error);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    //  console.log(values.shortForm);
    handleSectionPost(values);
  }

  return (
    <div className="mx-10 md:mx-0 mb-4 md:mb-0 rounded-2xl md:rounded-none overflow-hidden md:grid md:grid-cols-2">
      <div className="w-full px-4 bg-fourthColor text-white  col-span-1 flex pb-5 ">
        <div className="w-full h-fit  mx-auto my-auto space-y-5">
          <div className="w-full flex">
            <h1 className="mx-auto text-xl font-semibold py-3 underline">
              Contact us
            </h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex">
                        <FormLabel className="my-auto">Name: </FormLabel>
                        <Input
                          className=" border-b-2 w-3/4 mx-4 bg-fourthColor border-white "
                          type="text"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>...</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex">
                        <FormLabel className="my-auto">Email</FormLabel>
                        <Input
                          className="border-b-2 w-3/4 mx-4 bg-fourthColor border-white "
                          type="text"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>...</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Text"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <div className="">
                          <FormLabel>Message</FormLabel>
                        </div>

                        <div className=" mx-2">
                          <Input
                            className="border-b-2 w-full bg-fourthColor border-white  "
                            id="text"
                            {...field}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>...</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex">
                <button
                  className="px-3 py-1 w-fit text-white bg-primaryColor rounded mx-auto"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div className="hidden md:block w-full bg-white col-span-1 border-2 ">
        <div className="mx-auto w-fit ">
          <img
            className="bg-white w-fit"
            src="/common_files/main/phone_Image.png"
            alt="fayida"
          />
        </div>
      </div>
    </div>
  );
}
