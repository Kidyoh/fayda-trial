"use client";
import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function PackagesList() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/purchaselist/getpuchasedlist`, {
          credentials: "include",
        });
        const jsonData = await response.json();
        setData(jsonData);
        console.log("first");
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4 text-primaryColor">
        Packages
      </h1>

      {data != null && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item, index: number) => (
            <Link key={index} href={`/package/${item?.packagesId}`}>
              <div
                key={item.id}
                className="package-card rounded-xl border shadow-md p-4 hover:shadow-lg hover:shadow-primaryColor cursor-pointer"
                // onClick={() => /* Handle package click here */}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">
                    {item?.Package?.packageName}
                  </h2>
                  {/* <span className="badge badge-{item.paymentStatus.toLowerCase()}">
                  {item.paymentStatus}
                </span> */}
                </div>
                <div className="text-gray-700 mb-2">
                  Courses: {item?.Package?.courses?.length}
                </div>
                <div>
                  {item.expiryDate && (
                    <h1>
                      Exp:{" "}
                      {new Date(item.expiryDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })}
                    </h1>
                  )}

                  <h1>
                    {item.expiryDate && (
                      <span>
                        Days Remaining:{" "}
                        {Math.ceil(
                          (new Date(item.expiryDate).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
                        ) > 0
                          ? Math.ceil(
                              (new Date(item.expiryDate).getTime() -
                                new Date().getTime()) /
                                (1000 * 60 * 60 * 24),
                            )
                          : "Expired"}
                      </span>
                    )}
                  </h1>
                </div>
                {item.paymentStatus != "active" && (
                  <span className="text-primaryColor text-sm">
                    {item.paymentStatus}
                  </span>
                )}
                <img
                  // src={`${apiUrl}/upload_assets/images/package_thumbnails/${item?.Package?.thumbnail}`}
                  src={item?.Package?.thumbnailUrl}
                  alt={item?.Package?.packageName}
                  className="w-full h-48 object-cover rounded-md mt-4"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

{
  /*
 <div>
      <div className="w-full flex py-3">
        <h1 className="mx-auto text-2xl text-primaryColor font-semibold">
          Packages
        </h1>
      </div>

      {data != null && (
        <div className="w-full">
          <ul>
            {data?.map((item) => (
              <div key={item.id} className="">
                {item.paymentStatus == "active" && (
                  <div className="my-5">
                    <div className="bg-primaryColor  mx-4 p-4 rounded-xl text-white  border-white border-2 shadow-xl shadow-primaryColor ">
                      <div className="flex justify-between">
                        <h1 className="text-lg ">
                          {" "}
                          {item?.Package?.packageName}
                        </h1>
                        <h1 className="text-lg ">
                          Courses: {item?.Package?.courses?.length}
                        </h1>
                        <h1 className="text-lg text-thirdColor">Active</h1>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ul>

          <ul>
            {data.map((item) => (
              <div key={item.id}>
                {item.paymentStatus == "pending" && (
                  <div className="my-5">
                    <div className="bg-secondaryColor rounded-xl text-white border-white border-2 shadow-xl shadow-gray-700 mx-4 p-4">
                      <div className="flex justify-between">
                        <h1 className="text-lg ">
                          {" "}
                          {item?.Package?.packageName}
                        </h1>
                        <h1 className="text-lg ">
                          Courses: {item?.Package?.courses?.length}
                        </h1>
                        <h1 className="text-lg text-white">Pending</h1>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
*/
}
