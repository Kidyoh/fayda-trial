"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Notifications() {
  // const [data, setData] = useState(null);
  const [notificationData, setNotificationData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/notifications`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setNotificationData(data);
        //  setLoading(false);

        console.log("message3: " + data[1]?.notiId);
      });
  }, []);
  //{notificationData[0]?.notiId}

  const handleNotificationClick = (notificationId: any) => {
    fetch(`${apiUrl}/notifications/notification_read/${notificationId}`, {
      method: "get",
      credentials: "include",
      // Add any required headers or body for the update request
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the response data if needed
        console.log("Update response: ", data);
      })
      .catch((error) => {
        // Handle any errors that occur during the update request
        console.error("Update error: ", error);
      });
  };
  return (
    <div>
      <div className="w-full flex my-4">
        <h1 className="mx-auto text-xl underline font-semibold text-primaryColor">
          Notifications
        </h1>
      </div>

      {notificationData?.map((notification) => (
        <div key={notification?.notiId}>
          <div
            onClick={() => handleNotificationClick(notification?.notiId)}
            // className="mx-4 bg-primaryColor bg-opacity-80 my-2 px-2 text-white "
            className={`mx-4 my-2 px-2  ${
              notification?.status == "0"
                ? "border-2 text-secondaryColor border-secondaryColor"
                : "text-primaryColor border-primaryColor border-2 rounded-xl"
            }`}
          >
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="w-full pr-4">
                    <div className="flex justify-between">
                      <h1>{notification?.notiHead}</h1>
                      <h1>{notification?.status == 0 ? "New" : "Seen"}</h1>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>{notification?.notiFull}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      ))}
    </div>
  );
}

{
  /*

 <div>
      <div>Notifications</div>

      {notificationData?.map((notification) => (
        <div key={notification?.notiId}>
          <div
            onClick={() => handleNotificationClick(notification?.notiId)}
            // className="mx-4 bg-primaryColor bg-opacity-80 my-2 px-2 text-white "
            className={`mx-4 my-2 px-2 text-white ${
              notification?.status == "0"
                ? "bg-secondaryColor"
                : "bg-primaryColor"
            }`}
          >
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="w-full pr-4">
                    <div className="flex justify-between">
                      <h1>{notification?.notiHead}</h1>
                      <h1>{notification?.status == 0 ? "New" : "Seen"}</h1>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>{notification?.notiFull}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      ))}
    </div>
*/
}
