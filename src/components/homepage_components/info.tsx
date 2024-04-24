"use client";

import { apiUrl } from "@/apiConfig";
import { InfoIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Info() {
  const [responseMessage, setResponseMessage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/students/checkpackageexpirydate`,
          {
            credentials: "include", // Include credentials in the request
          }
        );

        const data = await response.json();
        setResponseMessage(data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {responseMessage == "found" && (
        <div className="w-full flex my-5 ">
          <div className="w-3/4 mx-auto rounded-2xl bg-primaryColor text-white  py-7 px-3">
            <div className="mx-auto w-fit flex space-x-5">
              <div className="mx-auto w-fit">
                <InfoIcon size={40} />
              </div>
              <div>
                {" "}
                <h1 className="text-center">
                  You Have Packages Expiring In Very Few Days!
                </h1>
                <h1 className="text-center">You can update now.</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
