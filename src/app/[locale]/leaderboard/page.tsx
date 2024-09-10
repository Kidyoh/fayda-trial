"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiUrl } from "@/apiConfig";

export default function LeaderBoard() {
  const [data, setData] = useState<any>([]);
  const [data2, setData2] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gradeFetched, setGradeFetched] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/login_register/profile`, {
          credentials: "include",
          // Add additional options if needed
        });
        const jsonData = await response.json();
        //  setData(jsonData);
        //  setIsLoading(false);
        setGradeFetched(jsonData.gread);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/leaderboard/all/toptwenty`);
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (gradeFetched != "") {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${apiUrl}/leaderboard/grade/toptwenty/${gradeFetched}`
          );
          const jsonData = await response.json();
          setData2(jsonData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [gradeFetched]);

  return (
    <div className="my-3 text-sm  md:text-base">
      <div className="w-full flex my-2">
        <h1 className="mx-auto text-2xl underline text-primaryColor font-semibold ">
          LeaderBoard
        </h1>
      </div>

      <div className="w-full ">
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">General LeaderBoard</TabsTrigger>
            <TabsTrigger value="password">Your Grade LeaderBoard</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className=" ">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <div>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="w-1/5">Rank</th>
                        <th className="w-1/5">FirstName</th>
                        <th className="w-1/5">LastName</th>
                        <th className="w-1/5">Grade</th>
                        <th className="w-1/5">Points</th>
                        {/* Add more table headers as needed */}
                      </tr>
                    </thead>
                    <tbody className="space-y-3">
                      {data?.map((student: any, index: any) => {
                        let rowClass = "text-center text-gray-500";

                        if (index === 0) {
                          rowClass += " bg-yellow-300"; // Gold for the first row
                        } else if (index === 1) {
                          rowClass += " bg-gray-300"; // Silver for the second row
                        } else if (index === 2) {
                          rowClass += " bg-orange-400 text-white"; // Bronze for the third row
                        } else {
                          rowClass +=
                            index % 2 === 0 ? " bg-gray-200" : " bg-gray-100"; // Alternate colors for subsequent rows
                        }

                        return (
                          <tr className={rowClass} key={index}>
                            <td className="w-1/5">{index + 1}</td>
                            <td className="w-1/5">{student?.firstName}</td>
                            <td className="w-1/5">{student?.lastName}</td>
                            <td className="w-1/5">{student?.gread}</td>
                            <td className="w-1/5">
                              {parseFloat(student?.points).toFixed(1)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="password">
            {" "}
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <div>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="w-1/5">Rank</th>
                        <th className="w-1/5">FirstName</th>
                        <th className="w-1/5">LastName</th>
                        <th className="w-1/5">Grade</th>
                        <th className="w-1/5">Points</th>
                        {/* Add more table headers as needed */}
                      </tr>
                    </thead>
                    <tbody>
                      {data2?.map((student: any, index: any) => (
                        <tr
                          className={`text-center  ${
                            index % 2 == 0
                              ? "bg-gray-200 text-gray-500"
                              : "bg-gray-100 text-gray-500"
                          }`}
                          key={index}
                        >
                          <td className="w-1/5">{index + 1}</td>
                          <td className="w-1/5">{student?.firstName}</td>
                          <td className="w-1/5">{student?.lastName}</td>
                          <td className="w-1/5">{student?.gread}</td>
                          <td className="w-1/5">
                            {parseFloat(student?.points).toFixed(1)}
                          </td>{" "}
                          {/* Render additional table cells based on your data structure */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
