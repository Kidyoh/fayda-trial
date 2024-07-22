"use client";
import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function FilteredPackage({ params }: any) {
  const FilterKey = params.filter_key;
  let filterKeyExtracted = "";

  if (FilterKey == "grade9") {
    filterKeyExtracted = "Grade 9";
  } else if (FilterKey == "grade10") {
    filterKeyExtracted = "Grade 10";
  } else if (FilterKey == "grade11") {
    filterKeyExtracted = "Grade 11";
  } else if (FilterKey == "grade12") {
    filterKeyExtracted = "Grade 12";
  } else if (FilterKey == "computer") {
    filterKeyExtracted = "Computer";
  } else if (FilterKey == "artlitrature") {
    filterKeyExtracted = "Art Litrature";
  } else if (FilterKey == "language") {
    filterKeyExtracted = "Language";
  } else if (FilterKey == "other") {
    filterKeyExtracted = "Other";
  }

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/packages/filter_fetch_home_packages/${filterKeyExtracted}`,
          {
            credentials: "include",
          }
        );

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
    <div className="bg-gray-200 h-screen">
      <div className="w-full flex py-5">
        <h1 className="text-center mx-auto font-semibold text-3xl">
          Packages for {filterKeyExtracted}
        </h1>
      </div>
      {/* <div className="grid grid-cols-3 ">
        {data.map((singlePackage: any) => (
          <div className="group m-10 cursor-pointer ">
            <div className="relative rounded-lg  bg-white m-8 pb-16 group-hover:pb-24 overflow-hidden">
              <img
                src={singlePackage.imgUrl}
                className="w-full group-hover:scale-125 duration-700  "
                alt="ThumbNail Image"
              />
              <div className="bg-white absolute w-full group-hover:bottom-0 duration-150 p-3">
                <div>
                  {" "}
                  <h1>{singlePackage.packageName}</h1>
                </div>

                <div className="w-full flex">
                  <h1 className=" mx-auto w-fit text- 3xl text-primaryColor">
                    {singlePackage.price} Birr
                  </h1>
                </div>
                <div className="">
                  <div>
                    <h1 className="line-clamp-3">
                      {singlePackage.packageDescription}
                    </h1>
                  </div>
                  <div className=" bg-primaryColor ">
                    <Link href={`/package/${singlePackage.id}`}>
                      <h1 className=" mx-auto w-fit text- 3xl text-white">
                        Details
                      </h1>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
       */}

      <div className="flex min-h-screen  items-center justify-center bg-gray-200">
        <div className="grid grid-cols-1  gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.map((singlePackage: any, index: number) => (
            <Link
              key={singlePackage.id}
              href={`/package_2/${singlePackage.id}`}
            >
              <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                <div className="h-96 w-72">
                  <img
                    className="group-hover:translate-y-[-60%] translate-y-0 h-full w-full object-cover transition-transform duration-500  "
                    src={singlePackage.imgUrl}
                    alt=""
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primaryColor group-hover:from-primaryColor/70 group-hover:via-primaryColor/60 group-hover:to-primaryColor/70"></div>
                <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-3 text-center transition-all duration-500 group-hover:translate-y-0">
                  {/* <h1 className="font-dmserif text-3xl font-bold text-white">
                  Beauty
                </h1> */}
                  <div className="justify-between flex w-full text-white text-2xl font-semibold">
                    <h1>{singlePackage.packageName}</h1>
                    <h1 className="text-lg">{singlePackage.price} Birr</h1>
                  </div>
                  <p className="line-clamp-5 pt-4 mb-3   text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {singlePackage.packageDescription}
                  </p>

                  <h1 className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">
                    Details
                  </h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
