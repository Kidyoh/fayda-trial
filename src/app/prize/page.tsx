"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfirmationDialog from "@/components/custom_components/confirmationDialog";
import { setAccessToken, getAccessToken, clearAccessToken } from "../../lib/tokenManager";
import { Gift, Award, History, Clock, Check, Package, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

  // Function to get status badge style
  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status.toLowerCase()) {
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2 mb-4">
            <Award className="h-8 w-8 text-primaryColor" />
            <span>Rewards & Prizes</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Redeem your points for exciting prizes and rewards. Check your available prizes, browse all offerings, or view your redemption history.
          </p>
        </div>

        <Tabs defaultValue="avialable" className="w-full">
          <div className="bg-white rounded-lg p-1 mb-8 border border-gray-200 shadow-sm mx-auto max-w-xl">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="avialable" className="data-[state=active]:bg-primaryColor data-[state=active]:text-white">
                <Gift className="h-4 w-4 mr-2" />
                Available Prizes
              </TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:bg-primaryColor data-[state=active]:text-white">
                <Package className="h-4 w-4 mr-2" />
                All Prizes
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-primaryColor data-[state=active]:text-white">
                <History className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="avialable">
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-48 mb-2.5"></div>
                    <div className="h-3 bg-gray-200 rounded w-64"></div>
                  </div>
                </div>
              ) : data.length > 0 ? (
                data.map((prize: any, index: number) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center md:items-stretch border-b border-gray-100">
                      <div className="w-full md:w-40 p-4 flex-shrink-0 flex items-center justify-center bg-gray-50">
                        <img
                          src={prize.imgUrl}
                          alt={prize.itemName || "Prize Image"}
                          className="h-32 w-32 object-contain rounded"
                        />
                      </div>
                      <div className="flex-grow p-6 flex flex-col justify-center">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">{prize.itemName}</h2>
                        <p className="text-gray-600 mb-4">{prize.itemDecription}</p>
                        <div className="flex items-center text-primaryColor">
                          <Award className="h-5 w-5 mr-1" />
                          <span className="font-medium">{prize.points} Points Required</span>
                        </div>
                      </div>
                      <div className="p-6 md:w-48 flex-shrink-0 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-100">
                        <ConfirmationDialog
                          points={prize.points}
                          prizeIdRecived={prize.id}
                          prizeName={prize.itemName}
                        />
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Prizes Available</h3>
                  <p className="text-gray-500">You don't have any available prizes at the moment.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="space-y-6">
              {isLoading2 ? (
                <div className="text-center py-12">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-48 mb-2.5"></div>
                    <div className="h-3 bg-gray-200 rounded w-64"></div>
                  </div>
                </div>
              ) : data2.length > 0 ? (
                data2.map((prize: any, index: number) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center md:items-stretch">
                      <div className="w-full md:w-40 p-4 flex-shrink-0 flex items-center justify-center bg-gray-50">
                        <img
                          src={prize?.imgUrl}
                          alt={prize.itemName || "Prize Image"}
                          className="h-32 w-32 object-contain rounded"
                        />
                      </div>
                      <div className="flex-grow p-6 flex flex-col justify-center">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">{prize.itemName}</h2>
                        <p className="text-gray-600 mb-4">{prize.itemDecription}</p>
                        <div className="inline-flex items-center px-3 py-1 bg-primaryColor/10 text-primaryColor rounded-full text-sm font-medium w-fit">
                          <Award className="h-4 w-4 mr-1" />
                          {prize.points} Points
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Prizes Available</h3>
                  <p className="text-gray-500">There are no prizes available at the moment.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prize
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Redeemed
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data3.length > 0 ? (
                      data3.map((prize: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {prize.Prize.itemName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-sm truncate">
                            {prize.Prize.itemDecription}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-1.5" />
                              {new Date(prize.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={getStatusBadge(prize.status)}>
                              {prize.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                          <div className="flex flex-col items-center">
                            <History className="h-8 w-8 text-gray-400 mb-2" />
                            <p>No redemption history found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
