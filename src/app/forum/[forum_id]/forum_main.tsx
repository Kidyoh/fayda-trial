"use client";
//import { adminId, apiUrl } from "@/api_config";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

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
import DeleteDialog from "@/components/custom_components/delete_dialog";

//import DeleteDialog from "@/my_components/delete_dialog";

interface FetchedProps {
  studentId: string;
  forumId: string;
}
var count = 0;

export default function ForumDetail({ studentId, forumId }: FetchedProps) {
  const forumIdRecived = forumId;
  const studentIdRecived = studentId;
  //const [studentIdRecived, setStudentIdRecived] = useState(studentId);

  // console.log("forum cl: " + forumIdRecived);
  // console.log("student Cl: " + studentIdRecived);
  //console.log("Id: " + courseId);

  const [data, setData] = useState<any>([]);

  //const [studentId, setStudentId]= useState("");
  // const [forumIdfetched, setForumIdfetched] = useState("");

  useEffect(() => {
    const getCourse = async () => {
      const res = await fetch(
        `${apiUrl}/forums/withforumid/${forumIdRecived}`,
        {
          next: {
            revalidate: 0,
          },
          credentials: "include",
        }
      );
      const forum = await res.json();
      setData(forum);
      //   setForumIdfetched(forum.id);
      //console.log("COurses: " + forum.conversation[0].text);
    };

    getCourse();
  }, [count]);

  const noSymbolsRegex = /^[a-zA-Z0-9 ]*$/;
  const formSchema = z.object({
    text: z.string().min(1, { message: "Can not be empty!" }),
    studentsId: z.string(),
    forumId: z.string(),
  });

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentsId: studentIdRecived,
      forumId: forumIdRecived,
    },
  });

  const handleConversationPost = async (formData: any) => {
    console.log("Hellllo");
    console.log("value: " + formData.studentsId);
    count = count + 1;
    console.log("count: " + count);

    try {
      const response = await fetch(`${apiUrl}/conversations/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("response: ");
      if (response.ok) {
        // push("/settings/languages");
        console.log("Message Recived!");
        toast({
          title: "Success!",
          description: "Posted!",
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
    console.log("test");
    console.log("first: " + values.studentsId);

    handleConversationPost(values);
  }

  return (
    <div>
      {/* <div>
        <h1>Student Id {studentIdRecived}</h1>
        <h1>Froum Id {forumIdRecived}</h1>
      </div> */}
      <div>{/* <h1>Post</h1> */}</div>
      <div className="my-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className=" w-1/2">
              <div className="mx-5 w-full">
                <div>
                  <h1>Comment</h1>
                </div>
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="w-full flex">
                          {/* <FormLabel>Comment</FormLabel> */}
                          <div className=" w-full">
                            <Input
                              className="border-b-2 w-full border-green-500   ml-1"
                              type="text"
                              {...field}
                            />
                          </div>
                          <div className=" bg-primaryColor flex mx-3">
                            <button
                              className="px-3    text-white  rounded mx-auto"
                              type="submit"
                            >
                              Post
                            </button>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* <div className=" bg-blue-300 flex ">
                <button
                  className="px-3    text-white  rounded mx-auto"
                  type="submit"
                >
                  Post
                </button>
              </div> */}
            </div>
          </form>
        </Form>
      </div>

      <div>
        {data?.conversation?.map((conv: any, index: number) => {
          return (
            <div key={index}>
              <div className="mx-5 my-2 bg-gray-100 rounded px-3 ">
                <div className="flex space-x-3  px-5 py-3">
                  <div className="space-x-2 flex font-semibold ">
                    <h1>{conv?.writtenBy?.firstName}</h1>
                    <h1>{conv?.writtenBy?.lastName}</h1>
                  </div>
                  <div>
                    <h1>{conv.text}</h1>
                  </div>
                </div>
                <div className="relative mx-2 w-full  flex ml-2">
                  <div>
                    <h1 className="text-xs">
                      {new Date(conv?.createdAt).toLocaleString()}
                    </h1>
                  </div>
                  {conv?.writtenBy?.id == studentIdRecived && (
                    <div className="absolute right-3 bottom-3 w-fit ">
                      <DeleteDialog
                        type="conversations"
                        id={conv?.id}
                        buttonTitle="Delete"
                        backTo={`forum/${forumIdRecived}`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
