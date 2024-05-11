"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Advertisment_home() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/advertisment/displayhome`, {
          credentials: "include",
        });

        const jsonData = await response.json();
        setData(jsonData);
        console.log("first");
        console.log("Data Id: ", jsonData[0].id);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data[0]?.id && (
        <div className="flex flex-col  bg-primaryColor rounded-md md:px-4 py-6 shadow-md">
          <div className="ssmd:flex items-center mx-auto ">
            <img
              // src={`${apiUrl}/upload_assets/images/advertisement_images/${data[0]?.image}`}
              src={data[0]?.imgUrl}
              alt="Ad Image"
              className="h-1/3  w-1/3 mx-auto  ssmd:h-1/4 ssmd:w-1/6 object-cover rounded-md"
            />
            <div className="w-full flex ">
              <div className="w-fit mx-auto">
                <div className="mx-1 sm:ml-4 flex flex-col justify-between sm:mx-auto  ">
                  <h1 className="text-2xl text-center text-white font-bold">
                    {data[0]?.title}
                  </h1>
                  <div className="mx-2 ssmd:text-lg text-center  text-white font-light">
                    {data[0]?.subtitle}
                    <br />
                    {data[0]?.text}
                  </div>
                  {/* <a
                  target="_blank"
                  href={`${data[0]?.info}`}
                  className="bg-white text-primaryColor text-center text-sm ssmd:font-semibold sm:px-4 py-2 rounded-md shadow-md hover:bg-gray-200"
                >
                  {data[0]?.info}
                </a> */}
                  <h1 className="bg-white text-primaryColor text-center text-sm ssmd:font-semibold sm:px-4 py-2 rounded-md shadow-md hover:bg-gray-200">
                    {data[0]?.info}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

{
  /*
 <div className=" ">
      {data[0] ? (
        <div className="grid grid-cols-3 mx-4 border-t-4 border-b-4 py-2  bg-opacity-50">
          <div className="col-span-1  ">
            <div className="">
              <img
                src={`${apiUrl}/upload_assets/images/advertisement_images/${data[0]?.image}`}
                alt="Ad Image"
                className="h-1/2 w-1/2 mx-auto my-auto bg-violet-500"
              />
            </div>
          </div>
          <div className="mx-4 col-span-2 justify-between flex flex-col my-6 ">
            <div>
              <div>
                <h1 className="text-3xl text-primaryColor font-semibold">
                  {data[0]?.title}
                </h1>
              </div>
              <div>
                <h1>{data[0]?.subtitle}</h1>
              </div>
              <div></div>
            </div>
            <div className="w-full flex">
              <h1 className="text-4xl font-semibold text-primaryColor">
                {data[0]?.text}
              </h1>
            </div>
            
          <div className="mx-2 ">
          <a target="_blank" href={`${data[0]?.info}`}>
            {data[0]?.info}
          </a>
        </div>
      </div>
   </div>


*/
}
