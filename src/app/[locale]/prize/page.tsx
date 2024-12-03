"use client";
import { apiUrl } from "@/apiConfig";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfirmationDialog from "@/components/custom_components/confirmationDialog";
import { setAccessToken, getAccessToken, clearAccessToken } from "../../../lib/tokenManager";

export default function Prize() {
  const accessToken = getAccessToken();
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data2, setData2] = useState<any>([]);
  const [isLoading2, setIsLoading2] = useState(true);
  const [data3, setData3] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/prizes/checkpoints`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
            },
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/prizes/fetchprizes/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
            },
        });

        const jsonData = await response.json();
        setData2(jsonData);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/studentprize/prizehistory/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
            },
        });

        const jsonData = await response.json();
        setData3(jsonData);
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
    <div>
      <Tabs defaultValue="avialable" className="w-full">
        <TabsList>
          <TabsTrigger value="avialable">Avialable Prizes for You</TabsTrigger>
          <TabsTrigger value="all">All Prizes</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="avialable">
          <div>
            {data[0] && (
              <div>
                {data?.map((prize: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-8 my-3 mx-1 md:mx-5"
                    >
                      <div className="col-span-1">
                        <img
                          // src={`${apiUrl}/upload_assets/images/prize_images/${prize.image}`}
                          src={prize.imgUrl}
                          alt="ThumbNail Image"
                          className=" w-full rounded-lg"
                        />
                      </div>
                      <div className="flex col-span-2 ">
                        <h1 className="my-auto text-center w-full">
                          {prize.itemName}
                        </h1>
                      </div>
                      <div className="flex col-span-4 ">
                        <h1 className="my-auto text-center w-full">
                          {prize.itemDecription}
                        </h1>
                      </div>
                      {/* <div className="flex">
                        <h1 className="my-auto text-center w-full">
                          {prize.points} Points
                        </h1>
                      </div> */}
                      <div className="flex col-span-1 ">
                        <div className="my-auto mx-auto text-center w-full">
                          <ConfirmationDialog
                            points={prize.points}
                            prizeIdRecived={prize.id}
                            prizeName={prize.itemName}
                          />
                        </div>
                        <div></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div>
            {data2?.map((prize: any, index: number) => {
              return (
                <div key={index} className="grid grid-cols-8 my-3 mx-5">
                  <div className="col-span-1">
                    <img
                      //  src={`${apiUrl}/upload_assets/images/prize_images/${prize.image}`}
                      src={prize?.imgUrl}
                      alt="ThumbNail Image"
                      className=" w-full rounded-lg"
                    />
                  </div>
                  <div className="flex col-span-2">
                    <h1 className="my-auto text-center w-full">
                      {prize.itemName}
                    </h1>
                  </div>
                  <div className="flex col-span-3">
                    <h1 className="my-auto text-center w-full">
                      {prize.itemDecription}
                    </h1>
                  </div>
                  <div className="flex col-span-2">
                    <h1 className="my-auto text-center w-full">
                      {prize.points} Points
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div>
            {data3?.map((prize: any, index: number) => {
              return (
                <div key={index} className="grid grid-cols-8 my-3 mx-5">
                  {/* <div className="col-span-1">
                    <img
                      src={`${apiUrl}/upload_assets/images/prize_images/${prize.Prize.image}`}
                      alt="ThumbNail Image"
                      className=" w-full rounded-lg"
                    />
                  </div> */}
                  <div className="flex col-span-1">
                    <h1 className="my-auto text-center w-full">
                      {prize.Prize.itemName}
                    </h1>
                  </div>
                  <div className="flex col-span-3">
                    <h1 className="my-auto text-center w-full">
                      {prize.Prize.itemDecription}
                    </h1>
                  </div>
                  <div className="flex col-span-3">
                    <h1 className="my-auto text-center w-full">
                      {new Date(prize.createdAt).toLocaleDateString()}
                    </h1>
                  </div>
                  <div className="flex col-span-1">
                    <h1 className="my-auto text-center w-full">
                      {prize.status}
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
