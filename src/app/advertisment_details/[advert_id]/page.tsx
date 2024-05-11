"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";

export default function BlogDetails({ params }: any) {
  const AdvertId = params.advert_id;

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/advertisment/${AdvertId}`, {
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
  }, [AdvertId]);
  return (
    <div className="my-2">
      <div className="w-full flex">
        <h1 className="mx-auto text-3xl text-primaryColor font-semibold underline">
          Advertisment Details
        </h1>
      </div>
      <div className="md:grid grid-cols-3 gap-5 m-6 ">
        <div className="col-span-1 ">
          <img
            //  src={`${apiUrl}/upload_assets/images/blog_images/${data.image}`}
            src={data?.imgUrl}
            alt="ThumbNail Image"
            className="w-1/2 mx-auto my-3 md:w-full rounded shadow-2xl "
          />
        </div>
        <div className="col-span-2">
          <div>
            <h1 className="text-lg">
              <span className="text-primaryColor font-semibold">
                {data?.title}
              </span>
            </h1>
          </div>
          <div>
            <h1 className="text-lg">
              {" "}
              <span className="text-primaryColor font-mono">
                {" "}
                {data?.subTitle}
              </span>
            </h1>
          </div>
          <div>
            <h1>{data?.text}</h1>
          </div>
          <div>
            <h1>{data?.subtext}</h1>
          </div>
          <div className="my-2">
            <h1>{data?.info}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
