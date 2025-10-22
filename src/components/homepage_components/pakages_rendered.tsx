"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import { apiUrl } from "@/apiConfig";

import "swiper/css/pagination";

import Link from "next/link";

export default function PackagesRenderd() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/packages/fetch_home_packages`, {
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

  //const packageList = packagePass?.packagePass;
  console.log("second");
  console.log("data: " + data);
  return (
    <div className="py-6 ">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        // autoplay={{ delay: 3000 }}
        // pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        slidesPerView={2}
        breakpoints={{
          593: {
            slidesPerView: 3,
          },
          860: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        <div className="my-6">
          <div className="w-full flex ">
            <h1 className="mx-auto text-xl font-semibold">Packages</h1>
          </div>

          <div className=" gap-6 m-6 pb-4">
            {data?.map(
              (singlePackage: any, index: number) =>
                singlePackage.status == true && (
                  <SwiperSlide key={index} className="px-4 cursor-pointer">
                    <Link href={`/package/${singlePackage.id}`}>
                      <div className=" relative z-50 my-5  rounded-xl overflow-hidden text-center hover:shadow-2xl  shadow-primaryColor duration-150 hover:scale-105">
                        <div className="z-10">
                          <img
                            //  src={`${apiUrl}/upload_assets/images/package_thumbnails/${singlePackage.thumbnail}`}
                            src={singlePackage.imgUrl}
                            alt="ThumbNail Image"
                          />
                        </div>
                        <div className="absolute bg-primaryColor bg-opacity-70 flex bottom-0 w-full text-white">
                          <div className="mx-auto   py-3">
                            <h1>{singlePackage.packageName}</h1>
                            <div>
                              <h1>
                                Courses: <span />
                                {singlePackage.courses?.length}
                              </h1>
                            </div>
                          </div>
                        </div>
                        {singlePackage.discountStatus && (
                          <div className="absolute top-0 right-0">
                            <h1 className="px-1 bg-primaryColor opacity-70 text-white">
                              Discount
                            </h1>
                          </div>
                        )}
                      </div>
                    </Link>
                  </SwiperSlide>
                ),
            )}
          </div>

          <div></div>
        </div>
      </Swiper>

      <div className="w-full py-5">
        <div className="mx-auto w-fit border-2 border-primaryColor px-2 py-1 rounded-xl hover:scale-105 duration-300 hover:bg-primaryColor hover:text-white">
          <Link href={"/explore"}>
            {" "}
            <h1>Explore Packages</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
