"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Play,
  ScrollText,
  Text,
  Youtube,
  StickyNote,
  Divide,
  LockKeyhole,
  ArrowDownWideNarrow,
  CheckCheck,
} from "lucide-react";
import { PurchaseDialogCustom } from "@/components/custom_components/purchaseDialong";
import Footer from "@/components/main_components/footer";
import PackageReviewForm from "@/components/custom_components/packageReviewForm";
import DeletePackageReview from "@/components/custom_components/delete_review";
import useFetchStore from "../../[locale]/store/fetchStore";
import { Heading1 } from "lucide-react";

export default function PackageDetailsRendered(props: any) {
  const PackageId = props.package_id;
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>([]);
  const [tagChosen, setTagChosen] = useState("");

  const fetchPackagesReview = useFetchStore(
    (state) => state.fetchPackageReview
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/packages/${PackageId}`, {
          credentials: "include",
        });

        const jsonData = await response.json();
        setData(jsonData);
        if (jsonData.tag == "Computer") {
          setTagChosen("computer");
        } else if (jsonData.tag == "Language") {
          setTagChosen("language");
        } else if (jsonData.tag == "Art Litrature") {
          setTagChosen("artlitrature");
        } else if (jsonData.tag == "Other") {
          setTagChosen("other");
        } else if (jsonData.tag == "Grade 9") {
          setTagChosen("grade9");
        } else if (jsonData.tag == "Grade 10") {
          setTagChosen("grade10");
        } else if (jsonData.tag == "Grade 11") {
          setTagChosen("grade11");
        } else if (jsonData.tag == "Grade 12") {
          setTagChosen("grade12");
        }

        console.log("first");
        console.log("Data: ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchPackagesReview]);

  useEffect(() => {
    fetch(`${apiUrl}/login_register/profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);

        //  console.log("yes :" + data.stringify());
        // setPointStore(data.point);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full  flex flex-col">
          <div className="h-fit flex-grow">
            <div className="absolute top-0 w-full">
              <div className="w-full">
                <img src="/common_files/texture02.jpg" className="w-full" />
                <div className="absolute top-0 h-full from-primaryColor/90 via-gray-black/50 bg-gradient-to-t w-full bg-opacity-30"></div>
                <div className="absolute top-0 h-full from-black/30 via-black/20 bg-gradient-to-t w-full bg-opacity-30"></div>
              </div>
            </div>
            <div className="absolute xxmd:mt-40 w-full">
              <div className=" xxmd:grid flex flex-col-reverse grid-cols-5">
                <div className="col-span-3 ">
                  <div className="hidden xxmd:flex w-full ">
                    <h1 className="mx-14 text-4xl p-3 rounded text-white bg-primaryColor border-white border-2 w-fit">
                      {data?.packageName}{" "}
                    </h1>
                  </div>
                  <div className="flex flex-col xxmd:hidden w-full">
                    <h1 className="mx-auto  text-xl font-semibold text-primaryColor ">
                      {data?.packageName}
                    </h1>
                    <div className=" mx-auto py-1">
                      <div className=" text-primaryColor text-sm font-semibold">
                        <Link
                          href={`/packages_access/filter_packages/${tagChosen}`}
                        >
                          In <span className="underline"> {data?.tag}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="hidden xxmd:block mx-24 py-6">
                    <div className=" text-primaryColor w-fit bg-white px-1 rounded  font-semibold">
                      <Link
                        href={`/packages_access/filter_packages/${tagChosen}`}
                      >
                        In <span className="underline"> {data?.tag}</span>
                      </Link>
                    </div>
                  </div>

                  <div className="w-full  flex mt-10">
                    <div className="w-full bg-primaryColor/70 text-white border-white border-2 mx-1 md:mx-14 p-9 rounded-xl">
                      <Tabs
                        defaultValue="info"
                        className="w-full xxmd:w-[400px] lg:w-[600px]"
                      >
                        <TabsList className="justify-around flex">
                          <TabsTrigger value="info">Info</TabsTrigger>
                          <TabsTrigger value="content">Content</TabsTrigger>
                          <TabsTrigger value="review">Review</TabsTrigger>
                        </TabsList>
                        <TabsContent value="info">
                          <div className="space-y-3 py-3">
                            <h1 className="bg-primaryColor p-2 rounded-lg w-fit">
                              Package Description
                            </h1>
                            <h1>{data?.packageDescription}</h1>
                          </div>
                        </TabsContent>
                        <TabsContent value="content">
                          <div>
                            {data.courses?.map((course: any, index: number) => {
                              return (
                                <div
                                  key={course.id}
                                  className="w-full mx-auto bg-primaryColor/70 my-6 px-6 shadow-xl rounded-xl"
                                >
                                  <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                      <AccordionTrigger>
                                        <div className="justify-between  flex w-full px-2">
                                          <h1 className="text-xs sm:text-sm md:text-lg">
                                            {course?.courseName}
                                          </h1>
                                          <h1 className="text-xs sm:text-sm md:text-base">
                                            Units: {course?.parts}
                                          </h1>
                                        </div>
                                      </AccordionTrigger>
                                      <AccordionContent>
                                        <p>{course?.courseDescription}</p>
                                        <div>
                                          {Array.from(
                                            { length: parseInt(course?.parts) },
                                            (_, index) => (
                                              <div key={index} className="pt-3">
                                                <h1 className="text-lg underline">
                                                  {" "}
                                                  Unit {index + 1} :{" "}
                                                  {
                                                    course?.CourseUnitsList[
                                                      index + 1
                                                    ]?.Title
                                                  }{" "}
                                                </h1>

                                                {course?.materials.map(
                                                  (
                                                    material: any,
                                                    index: number
                                                  ) => {
                                                    return (
                                                      <div
                                                        key={index}
                                                        className=""
                                                      >
                                                        {material?.part ==
                                                          index + 1 && (
                                                          <div className="py-1">
                                                            {material?.materialType ==
                                                              "video" && (
                                                              <div className="w-full flex space-x-4">
                                                                <div className="flex gap-3">
                                                                  <Play
                                                                    size={18}
                                                                  />
                                                                  Video:{" "}
                                                                </div>
                                                                <div>
                                                                  {
                                                                    material
                                                                      ?.video
                                                                      ?.vidTitle
                                                                  }
                                                                </div>
                                                              </div>
                                                            )}
                                                            {material?.materialType ==
                                                              "file" && (
                                                              <div className="w-full flex space-x-4">
                                                                <div className="flex gap-3">
                                                                  <Text
                                                                    size={18}
                                                                  />
                                                                  File:{" "}
                                                                </div>
                                                                <div>
                                                                  {
                                                                    material
                                                                      ?.file
                                                                      ?.title
                                                                  }
                                                                </div>
                                                              </div>
                                                            )}

                                                            {material?.materialType ==
                                                              "assessment" && (
                                                              <div className="w-full flex space-x-4">
                                                                <div className="flex gap-3">
                                                                  <StickyNote
                                                                    size={18}
                                                                  />
                                                                  Assessment:{" "}
                                                                </div>
                                                                <div>
                                                                  {
                                                                    material
                                                                      ?.assementId
                                                                      ?.assesmentTitle
                                                                  }
                                                                </div>
                                                              </div>
                                                            )}
                                                            {material?.materialType ==
                                                              "link" && (
                                                              <div className="w-full flex space-x-4">
                                                                <div className="flex gap-3">
                                                                  <Youtube
                                                                    size={18}
                                                                  />
                                                                  Link:{" "}
                                                                </div>
                                                                <div>
                                                                  {
                                                                    material
                                                                      ?.link
                                                                      ?.title
                                                                  }
                                                                </div>
                                                              </div>
                                                            )}
                                                          </div>
                                                        )}
                                                      </div>
                                                    );
                                                  }
                                                )}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                </div>
                              );
                            })}
                          </div>
                        </TabsContent>

                        <TabsContent value="review" className="w-full ">
                          {data?.review?.map((review: any, index: number) => {
                            return (
                              <div
                                key={index}
                                className="flex justify-between bg-white/70 text-gray-900 my-6 py-2  px-6 shadow-xl rounded-xl"
                              >
                                <div>
                                  <div>
                                    <h1>{review?.text}</h1>
                                  </div>
                                  <div className="py-1">
                                    <h1 className="text-xs italic">
                                      {review?.Student?.firstName}{" "}
                                      {review?.Student?.lastName}
                                    </h1>
                                  </div>
                                </div>
                                {review?.Student?.id == profile?.id && (
                                  <div>
                                    <DeletePackageReview
                                      reviewId={review?.id}
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })}

                          <PackageReviewForm
                            packageId={data?.id}
                            studentId={profile?.id}
                          />
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 w-full  clear-none">
                  <div className="w-full flex">
                    <div className="shadow-2xl hover:shadow-fourthColor/50 duration-150 hover:rounded-3xl w-fit my-24 rounded-t-2xl overflow-hidden border-2 shadow-primaryColor scale-125 mx-auto">
                      <img
                        className="border-2 border-primaryColor mx-auto w-full"
                        // src={`${apiUrl}/upload_assets/images/package_thumbnails/${data?.thumbnail}`}
                        src={data?.imgUrl}
                        alt=""
                      />
                      <div className="bg-gray-200 w-full py-2">
                        <div>
                          <div className="w-full">
                            <div className="w-full">
                              {data?.discountStatus ? (
                                <div>
                                  <div className="">
                                    <h1 className="bg-primaryColor px-3 rounded-2xl text-white w-fit">
                                      Discount available only until{" "}
                                      {new Date(
                                        data?.discountExpriyDate
                                      ).toLocaleDateString()}
                                    </h1>
                                  </div>
                                  <div className="flex space-x-2 my-4 px-3 py-2">
                                    <h1>Monthly Price:</h1>
                                    <h1 className="line-through">
                                      {data?.price} Birr
                                    </h1>
                                    <h1 className="text-primaryColor underline">
                                      {data?.temporaryPrice} Birr
                                    </h1>
                                  </div>
                                  <div className="flex space-x-2 my-4">
                                    <h1> Three Months Price:</h1>
                                    <h1 className="line-through">
                                      {data?.price2} Birr
                                    </h1>
                                    <h1 className="text-primaryColor underline">
                                      {data?.temporaryPrice2} Birr
                                    </h1>
                                  </div>
                                  <div className="flex space-x-2 my-4">
                                    <h1>Six Months Price:</h1>
                                    <h1 className="line-through">
                                      {data?.price3} Birr
                                    </h1>
                                    <h1 className="text-primaryColor underline">
                                      {data?.temporaryPrice3} Birr
                                    </h1>
                                  </div>
                                </div>
                              ) : (
                                <div className="pr-5 text-base px-3 py-2 font-serif text-primaryColor space-y-3">
                                  <h1>Monthly Price: {data?.price} Birr</h1>
                                  <h1>3 Months Price: {data?.price2} Birr</h1>
                                  <h1>6 Months Price: {data?.price3} Birr</h1>
                                </div>
                              )}
                            </div>
                            {profile?.studentStatus == "active" ? (
                              <div>
                                <div>
                                  {data?.discountStatus ? (
                                    <div className="mt-10 mx-5 ">
                                      <PurchaseDialogCustom
                                        packageId={data?.id}
                                        price={data?.temporaryPrice}
                                        price2={data?.temporaryPrice2}
                                        price3={data?.temporaryPrice3}
                                      />
                                    </div>
                                  ) : (
                                    <div className="mx-5 ">
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
                            ) : (
                              <div className="w-full">
                                {profile?.accountType == "Student" ? (
                                  <div>
                                    <h1 className="text-xs">
                                      You need to confirm your email to
                                      purchase!
                                      <h1 className="text-xs">
                                        Go to your profile to activate.
                                      </h1>
                                    </h1>
                                    <Link href={"/profile"} className="text-xs">
                                      Profile
                                    </Link>
                                  </div>
                                ) : (
                                  <div className="w-full mx-auto text-center overflow-clip bg-gray-200">
                                    <h1 className="text-xs">
                                      You need to sign in to purchase!
                                    </h1>

                                    <div className="space-x-3 text-primaryColor underline">
                                      <Link href={"/login"} className="text-xs">
                                        Log in
                                      </Link>
                                      <Link
                                        href={"/signup"}
                                        className="text-xs"
                                      >
                                        Sign Up
                                      </Link>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full bg-yellow-200">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
