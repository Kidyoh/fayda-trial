"use client";

import { apiUrl } from "@/apiConfig";
import { InfoIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getAccessToken } from "@/lib/tokenManager";

export default function Info() {
  // Component disabled to prevent unnecessary API calls on landing page
  return null;
}

// Old code - kept for reference but disabled
// Uncomment and use this if package expiry warning needs to be shown
/*
const [responseMessage, setResponseMessage] = useState("");

useEffect(() => {
  const fetchData = async () => {
    try {
      const accessToken = getAccessToken();

      // Only make the request if user is authenticated
      if (!accessToken || accessToken === "0") {
        return;
      }

      const response = await fetch(
        `${apiUrl}/students/checkpackageexpirydate`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        // If request fails, don't show the warning
        return;
      }

      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Silently fail - don't show error to user
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
*/
