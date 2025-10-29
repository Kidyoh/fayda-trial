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
import axios from "axios";

// Optional for navigation/pagination

export default function PackageDiscountSlider() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = React.useRef(false);

  useEffect(() => {
    // Prevent duplicate fetches in React Strict Mode
    if (hasFetched.current) {
      return;
    }

    const fetchData = async () => {
      try {
        hasFetched.current = true;
        const response = await axios.get(`${apiUrl}/packages/slider`, {
          withCredentials: true, // Equivalent to "credentials: 'include'"
        });

        const jsonData = response.data;
        setData(jsonData);
        console.log("Discount slider data:", jsonData);
      } catch (error) {
        // Handle errors appropriately, e.g., display an error message or retry the request
        console.error("Error fetching slider data:", error);
      } finally {
        setIsLoading(false); // Always set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 10000,
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
        {" "}
        <CarouselContent>
          {data?.map((pack: any) => {
            const tempPrice = pack.temporaryPrice;
            const mainPrice = pack.price;

            const difference = Math.abs(tempPrice - mainPrice);

            // Calculate the percentage change based on the higher price
            const higherPrice = Math.max(tempPrice, mainPrice);
            const percentageChange = (difference / higherPrice) * 100;

            // Round the percentage to two decimal places
            const formattedPercentage = percentageChange.toFixed(0);
            return (
              <CarouselItem
                key={pack.id}
                className="basis-1/1 bg-primaryColor w-full text-white"
                // className="-mt-1 h-[200px]"
              >
                <div className="flex">
                  <h1 className="mx-auto py-2 text-center">
                    {pack.packageName} package {formattedPercentage}% Discount
                    till{" "}
                    {new Date(pack?.discountExpriyDate).toLocaleDateString()}
                  </h1>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
