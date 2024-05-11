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

export default function Testimony() {
  //   const res = await fetch(`${apiUrl}/blogs/displayhome`, {
  //     next: {
  //       revalidate: 5,
  //     },
  //   });
  //   const data = await res.json();

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(`${apiUrl}/blogs/displayhome`, {
  //           credentials: "include",
  //         });

  //         const jsonData = await response.json();
  //         setData(jsonData);
  //         console.log("first");
  //         console.log("Data: ", jsonData);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  const TestimonyData = [
    {
      id: "001",
      name: "Rich Webster, Richard Media Company",
      text: "\"Fayida Academy has been a game-changer for me. As a busy professional, it was challenging to balance work, family, and education. But with Fayida Academy's flexible online platform, I have been able to seamlessly integrate learning into my daily routine. The platform's intuitive interface, well-structured courses, and self-paced learning approach have allowed me to learn at my own convenience. I am now equipped with the knowledge and skills to excel in my classes and exams, all thanks to Fayida Academy\"",
      image: "/common_files/testimony/img01.jpg",
    },
    {
      id: "002",
      name: "Kung Pik Liu, Design Angel",
      text: '"I cannot express enough how much Fayida Academy has transformed my academic journey. As a struggling student, I used to feel overwhelmed and lost when it came to my classes and exams. However, since enrolling in Fayida Academy, I have experienced a remarkable improvement in my grades and overall confidence. The platform\'s comprehensive study materials, interactive lessons, and valuable feedback from knowledgeable instructors have made all the difference. Thanks to Fayida Academy, I am now achieving success in my classes and exams like never before."',
      image: "/common_files/testimony/img02.jpg",
    },
    {
      id: "003",
      name: "Eric Wegweiser, Horticulatural Creations",
      text: "\"Fayida Academy has truly revolutionized the way I approach my studies. The platform's personalized learning system understands my unique strengths and weaknesses, allowing me to focus on areas where I need the most improvement. The interactive quizzes and practice exams have helped me gauge my progress and identify areas for further revision. With the support of Fayida Academy's dedicated tutors and their prompt responses to my queries, I feel empowered and well-prepared for my class assignments and exams. I highly recommend Fayida Academy to any student looking to achieve academic excellence.\"",
      image: "/common_files/testimony/img03.jpg",
    },
    {
      id: "004",
      name: "Anneli Hansson, Brand Strategist",
      text: "\"I enrolled in Fayida Academy with skepticism, unsure if an online platform could deliver the same quality of education as a traditional classroom setting. However, I am delighted to admit that Fayida Academy surpassed all my expectations. The platform's engaging video lectures, comprehensive study materials, and collaborative discussion forums have fostered an interactive and dynamic learning environment. The instructors' expertise and passion for teaching shine through in every lesson. Thanks to Fayida Academy, I have not only excelled in my class and exam performance but also developed a lifelong love for learning.\"",
      image: "/common_files/testimony/img04.jpg",
    },
  ];

  return (
    <div className="my-8 cursor-pointer ">
      <div className="w-full my-4">
        <h1 className="w-fit text-3xl underline text-primaryColor font-semibold mx-auto">
          Testimony
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
            {TestimonyData?.map((testimony: any) => {
              return (
                <CarouselItem
                  key={testimony.id}
                  className=" w-fit"
                  // className="-mt-1 h-[200px]"
                >
                  <div className="border-2 p-10 smd:p-20 m-4">
                    <div className="xxmd:grid grid-cols-3 gap-5 w-full smd:w-3/4 mx-auto">
                      <div className="col-span-1 w-fit my-auto xxmd:mx-0 mx-auto ">
                        <img
                          src={testimony.image}
                          className="rounded-full w-1/2 mx-auto xxmd:w-3/4 my-auto"
                          alt=""
                        />
                      </div>
                      <div className="col-span-2 my-auto">
                        <h1 className="py-4 text-center">{testimony.text}</h1>
                        <h1 className="text-center text-primaryColor">
                          {testimony.name}
                        </h1>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {/* 
          <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </div>
    </div>
  );
}
