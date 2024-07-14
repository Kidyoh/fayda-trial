"use client";

import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import { ArrowRightFromLine, Star } from "lucide-react";
import { AlertDialogCustom } from "@/components/custom_components/alertDialogCustom";
import { PurchaseDialogCustom } from "@/components/custom_components/purchaseDialong";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PackageDetails({ params }: any) {
  const PackageId = params.package_id;
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/packages/${PackageId}`, {
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
    <div className="py-3 bg-gray-200 h-full">
      {/* <Link href={"/explore_packages"}>
        {" "}
        <h1 className="underline bg-primaryColor px-1 text-white w-fit rounded">
          {" "}
          Back to Packages
        </h1>
      </Link> */}

      {/* <div className="md:grid md:grid-cols-2 my-5">
        <div className=" ">
          <img
            className="border-2  border-primaryColor mx-auto w-1/2 rounded-xl"
            //  src={`${apiUrl}/upload_assets/images/package_thumbnails/${data?.thumbnail}`}
            src={data?.imgUrl}
            alt=""
          />
          <div className="w-full flex">
            <h1 className="text-center w-fit mx-auto">{data?.packageName}</h1>
          </div>
        </div>

        <div className="mx-4 md:mx-0 w-full flex">
          <div className="w-fit mx-auto">
            <h1 className="font-semibold my-2 text-lg text-primaryColor  ">
              Courses Included:
            </h1>
            <div>
              {" "}
              {data?.courses?.map((course: any, index: number) => {
                //console.log(course?.courseName);
                return (
                  <div key={index} className="pb-4">
                    <div>
                      {course?.courseIntroductionVideo == null ? (
                        <div>
                          <h1>Loading Video</h1>
                        </div>
                      ) : (
                        <video controls>
                          <source
                            //  src={`${apiUrl}/upload_assets/videos/course_introduction_videos/${course?.courseIntroductionVideo}`}
                            src={course?.videoUrl}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>

                    <div className="flex space-x-2 ">
                      <Star size={20} />
                      <h1>{course?.courseName}</h1>
                    </div>
                    <div className="pl-5">
                      <h1>{course?.courseDescription}</h1>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="my-3">
              {data?.discountStatus ? (
                <div>
                  <div className="my-4">
                    <h1 className="bg-primaryColor px-3 rounded-2xl text-white w-fit">
                      Discount available only until{" "}
                      {new Date(data?.discountExpriyDate).toLocaleDateString()}
                    </h1>
                  </div>
                  <div className="flex space-x-2 my-4">
                    <h1>Monthly Price:</h1>
                    <h1 className="line-through">{data?.price} Birr</h1>
                    <h1 className="text-primaryColor underline">
                      {data?.temporaryPrice} Birr
                    </h1>
                  </div>
                  <div className="flex space-x-2 my-4">
                    <h1> Three Months Price:</h1>
                    <h1 className="line-through">{data?.price2} Birr</h1>
                    <h1 className="text-primaryColor underline">
                      {data?.temporaryPrice2} Birr
                    </h1>
                  </div>
                  <div className="flex space-x-2 my-4">
                    <h1>Six Months Price:</h1>
                    <h1 className="line-through">{data?.price3} Birr</h1>
                    <h1 className="text-primaryColor underline">
                      {data?.temporaryPrice3} Birr
                    </h1>
                  </div>
                </div>
              ) : (
                <div className="pr-5 text-primaryColor space-y-3 underline">
                  <h1>Monthly Price: {data?.price} Birr</h1>

                  <h1>3 Months Price: {data?.price2} Birr</h1>
                  <h1>6 Months Price: {data?.price3} Birr</h1>
                </div>
              )}
            </div>

            <div>
              {data?.discountStatus ? (
                <div className="mt-10">
                  <PurchaseDialogCustom
                    packageId={data?.id}
                    price={data?.temporaryPrice}
                    price2={data?.temporaryPrice2}
                    price3={data?.temporaryPrice3}
                  />
                </div>
              ) : (
                <div>
                  <PurchaseDialogCustom
                    packageId={data?.id}
                    price={data?.price}
                    price2={data?.price2}
                    price3={data?.price3}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-5 px-10 py-5">
        <div className="col-span-3">
          <div>
            <h1 className="text-4xl font-semibold">{data?.packageName}</h1>
          </div>
          <div className="my-3">
            <h1>{data?.packageDescription}</h1>
          </div>

          <div>
            <div className="my-3">
              {data?.discountStatus ? (
                <div>
                  <div className="my-4">
                    <h1 className="bg-primaryColor px-3 rounded-2xl text-white w-fit">
                      Discount available only until{" "}
                      {new Date(data?.discountExpriyDate).toLocaleDateString()}
                    </h1>
                  </div>
                  <div className="flex space-x-2 my-4">
                    <h1>Monthly Price:</h1>
                    <h1 className="line-through">{data?.price} Birr</h1>
                    <h1 className="text-primaryColor underline">
                      {data?.temporaryPrice} Birr
                    </h1>
                  </div>
                  <div className="flex space-x-2 my-4">
                    <h1> Three Months Price:</h1>
                    <h1 className="line-through">{data?.price2} Birr</h1>
                    <h1 className="text-primaryColor underline">
                      {data?.temporaryPrice2} Birr
                    </h1>
                  </div>
                  <div className="flex space-x-2 my-4">
                    <h1>Six Months Price:</h1>
                    <h1 className="line-through">{data?.price3} Birr</h1>
                    <h1 className="text-primaryColor underline">
                      {data?.temporaryPrice3} Birr
                    </h1>
                  </div>
                </div>
              ) : (
                <div className="pr-5 text-primaryColor space-y-3 underline">
                  <h1>Monthly Price: {data?.price} Birr</h1>

                  <h1>3 Months Price: {data?.price2} Birr</h1>
                  <h1>6 Months Price: {data?.price3} Birr</h1>
                </div>
              )}
            </div>

            <div>
              <div>
                {data?.discountStatus ? (
                  <div className="mt-10">
                    <PurchaseDialogCustom
                      packageId={data?.id}
                      price={data?.temporaryPrice}
                      price2={data?.temporaryPrice2}
                      price3={data?.temporaryPrice3}
                    />
                  </div>
                ) : (
                  <div>
                    <PurchaseDialogCustom
                      packageId={data?.id}
                      price={data?.price}
                      price2={data?.price2}
                      price3={data?.price3}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex w-full">
          <div className="w-full mx-8 py-4 bg-gradient-to-t from-primaryColor/20 to-white shadow-xl">
            <div>
              <img
                className="border-2  border-primaryColor mx-auto w-1/2 rounded-xl"
                //  src={`${apiUrl}/upload_assets/images/package_thumbnails/${data?.thumbnail}`}
                src={data?.imgUrl}
                alt=""
              />
            </div>
            <div className="p-7">
              {/* <h1 className="text-xl text-primaryColor">
                Price: {data?.price} Birr
              </h1> */}
            </div>
          </div>
        </div>
      </div>

      <div>
        {data.courses?.map((course: any) => {
          return (
            <div className="w-3/4 mx-auto bg-white my-6 px-6 shadow-lg">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <h1 className="text-xl">
                      {" "}
                      Course Name: {course?.courseName}
                    </h1>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>{course?.courseDescription}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          );
        })}
      </div>
    </div>
  );
}

{
  /*
  <div>
      <div className="grid grid-cols-2 my-5">
        <div className=" ">
          <img
            className="border-2 border-primaryColor mx-auto w-1/2 rounded-xl"
            src={`${apiUrl}/upload_assets/images/package_thumbnails/${data?.thumbnail}`}
            alt=""
          />
        </div>
        <div>
          <h1 className="font-semibold my-2">Courses Included:</h1>
          <div>
            {" "}
            {data?.courses?.map((course: any) => {
              //console.log(course?.courseName);
              return (
                <div>
                  <div className="flex space-x-2">
                    <ArrowRightFromLine />
                    <h1>{course?.courseName}</h1>
                  </div>
                  <div className="pl-4">
                    <h1>{course?.courseDescription}</h1>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            {data.discountStatus ? (
              <div>
                <div className="my-4">
                  <h1 className="bg-primaryColor px-3 rounded-2xl text-white w-fit">
                    Discount available only until{" "}
                    {new Date(data?.discountExpriyDate).toLocaleDateString()}
                  </h1>
                </div>
                <div className="flex space-x-2 my-4">
                  <h1>Price:</h1>
                  <h1 className="line-through">{data?.price} Birr</h1>
                  <h1>{data?.temporaryPrice} Birr</h1>
                </div>
              </div>
            ) : (
              <div className="pr-5">
                <h1>Price: {data?.price} Birr</h1>
              </div>
            )}
          </div>

          <div>
            {data.discountStatus ? (
              <div className="mt-10">
                <PurchaseDialogCustom
                  packageId={data?.id}
                  price={data?.temporaryPrice}
                />
              </div>
            ) : (
              <div>
                <PurchaseDialogCustom
                  packageId={data?.id}
                  price={data?.price}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div> */
}
