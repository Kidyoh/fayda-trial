"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
//import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
// Optional for navigation/pagination

export default function BlogSample() {
  //   const res = await fetch(`${apiUrl}/blogs/displayhome`, {
  //     next: {
  //       revalidate: 5,
  //     },
  //   });
  //   const data = await res.json();

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
    <div className="my-8 cursor-pointer ">
      <div className="w-full my-4">
        <h1 className="w-fit text-3xl underline text-primaryColor font-semibold mx-auto">
          Blogs
        </h1>
      </div>

      <div className="">
        <Carousel
          plugins={[
            Autoplay({
              delay: 6000,
              stopOnInteraction: false,
            }),
          ]}
          opts={{
            align: "start",
            duration: 100,
            loop: true,
            slidesToScroll: 1,
            // itemPerPage: 4, // Show 4 items per page (Shad CN Carousel option)
            //className: "w-full",
          }}
          className="w-full "
        >
          <CarouselContent>
            {data?.map((blog: any) => {
              return (
                <CarouselItem
                  key={blog.id}
                  className="basis-1/2 smd:basis-1/3  lg:basis-1/4"
                  // className="-mt-1 h-[200px]"
                >
                  <div className="p-1 w-full space-x-4">
                    <div className="w-fit mx-auto">
                      <div className="col-span-1 mx-auto relative rounded-t-xl overflow-hidden w-fit ">
                        <img
                          //   src={`${apiUrl}/upload_assets/images/blog_images/${blog.image}`}
                          src={blog?.imgUrl}
                          alt="ThumbNail Image"
                        />
                        <div className="absolute bottom-2 w-full bg-primaryColor bg-opacity-75 py-2">
                          <h1 className="w-fit mx-auto text-white text-center ">
                            <span>Title:</span> {blog.title}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="my-7">
        <div className="mx-auto w-fit border-2 border-primaryColor px-2 py-1 rounded-xl hover:scale-105 duration-300 hover:bg-primaryColor hover:text-white">
          <Link href={"/blogs"}>
            {" "}
            <h1>See More</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
