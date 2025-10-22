"use client";
import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ExplorePackages({ params }: any) {
  const PackageFolder = params.folderid;

  const [packageData, setPackagesData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${apiUrl}/packages/fetchPackages/${PackageFolder}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setPackagesData(data);
        //  setLoading(false);

        console.log("message3: " + data[1]?.id);
      });
  }, [PackageFolder]);

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const filteredPackages = packageData.filter((item: any) =>
    item.packageName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="my-3">
      <div className="w-full flex">
        <h1 className="mx-auto text-xl text-primaryColor font-semibold">
          Here is our collection of packages
        </h1>
      </div>
      <div className="w-full flex space-x-2 my-3 mx-4">
        <label htmlFor="">Search Package</label>
        <input
          className="border-b-2 border-primaryColor"
          type="text"
          placeholder=""
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="grid grid-cols-2 xsm:grid-cols-3 xmd:grid-cols-4 lg:grid-cols-5 gap-4 mx-2 my-3">
        {filteredPackages?.map((item, index: number) => {
          return (
            <Link key={index} href={`/package/${item.id}`}>
              <div
                key={item.id}
                className="relative hover:shadow-xl w-fit hover:shadow-primaryColor"
              >
                <div className="rounded-xl overflow-hidden w-full">
                  <img
                    //  src={`${apiUrl}/upload_assets/images/package_thumbnails/${item.thumbnail}`}
                    src={item?.imgUrl}
                    alt="ThumbNail Image"
                    className="mx-auto"
                  />
                </div>

                <div className="absolute py-1 ssmd:py-2 flex top-5 bg-primaryColor w-full bg-opacity-80 text-white">
                  {" "}
                  <h1 className="mx-auto text-sm ssmd:text-lg ">
                    {item.packageName}
                  </h1>
                </div>
                <div className="absolute bottom-0  p-1 bg-primaryColor bg-opacity-80 rounded-tr-xl text-white ">
                  {item.courses?.length} Courses
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
