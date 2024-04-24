"use client";
import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Blogs() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/blogs/displayhome`, {
          credentials: "include",
        });

        const jsonData = await response.json();
        setData(jsonData);
        console.log("first");
        console.log("Data: ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="my-4">
      <div className="w-full flex">
        <h1 className="mx-auto text-3xl underline  text-primaryColor font-semibold">
          Blogs
        </h1>
      </div>

      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {data.map((blog: any, index: number) => {
            return (
              <Link key={index} href={`/blogs/${blog.id}`}>
                <div className="m-5 cursor-pointer hover:shadow-lg hover:shadow-primaryColor hover:scale-105 duration-300 px-2 py-3 rounded-lg">
                  <div>
                    <div className="relative">
                      <img
                        //  src={`${apiUrl}/upload_assets/images/blog_images/${blog.image}`}
                        src={blog?.imgUrl}
                        alt="ThumbNail Image"
                        className=" w-full rounded-lg"
                      />
                      <div className="absolute bottom-2 bg-primaryColor bg-opacity-50 text-white w-full">
                        <h1 className="text-center">{blog.title}</h1>
                      </div>
                    </div>

                    <div>
                      <h1 className="line-clamp-3">{blog.text}</h1>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
