"use client";
import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import useFetchStore from "../store/fetchStore";
import { Checkbox } from "@/components/ui/checkbox";

export default function SearchPackages() {
  const [packageData, setPackagesData] = useState<any[]>([]);

  const [isGrade9Checked, setIsGrade9Checked] = useState(false);
  const [isGrade10Checked, setIsGrade10Checked] = useState(false);
  const [isGrade11Checked, setIsGrade11Checked] = useState(false);
  const [isGrade12Checked, setIsGrade12Checked] = useState(false);
  const [isComputerTagChecked, setIsComputerTagChecked] = useState(false);
  const [isLanguageTagChecked, setIsLanguageTagChecked] = useState(false);
  const [isArtLitratureTagChecked, setIsArtLitratureTagChecked] =
    useState(false);
  const [isOtherTagChecked, setIsOtherTagChecked] = useState(false);

  const [isAllChecked, setIsAllChecked] = useState(true);

  const handleCheckboxChangeG9 = (event: any) => {
    setIsGrade9Checked(event.target.checked);
  };
  const handleCheckboxChangeG10 = (event: any) => {
    setIsGrade10Checked(event.target.checked);
  };
  const handleCheckboxChangeG11 = (event: any) => {
    setIsGrade11Checked(event.target.checked);
  };
  const handleCheckboxChangeG12 = (event: any) => {
    setIsGrade12Checked(event.target.checked);
  };
  const handleCheckboxChangeAll = (event: any) => {
    setIsAllChecked(event.target.checked);
  };
  const handleCheckboxChangeComputer = (event: any) => {
    setIsComputerTagChecked(event.target.checked);
  };
  const handleCheckboxChangeLanguage = (event: any) => {
    setIsLanguageTagChecked(event.target.checked);
  };
  const handleCheckboxChangeArtLitrature = (event: any) => {
    setIsArtLitratureTagChecked(event.target.checked);
  };
  const handleCheckboxChangeOther = (event: any) => {
    setIsOtherTagChecked(event.target.checked);
  };

  // const [searchQuery, setSearchQuery] = useState("");

  const setSearchQuery = useFetchStore((state) => state.setSearchQuery);
  const searchQuery = useFetchStore((state) => state.searchQuery);

  useEffect(() => {
    fetch(`${apiUrl}/packages/fetchPackagesall/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setPackagesData(data);
        //  setLoading(false);

        console.log("message3: " + data[1]?.id);
      });
  }, []);

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const filteredPackages = packageData.filter((item: any) => {
    const gradeCheckedConditions = [
      isGrade9Checked
        ? item.tag.toLowerCase().includes("Grade 9".toLowerCase())
        : false,
      isGrade10Checked
        ? item.tag.toLowerCase().includes("Grade 10".toLowerCase())
        : false,
      isGrade11Checked
        ? item.tag.toLowerCase().includes("Grade 11".toLowerCase())
        : false,
      isGrade12Checked
        ? item.tag.toLowerCase().includes("Grade 12".toLowerCase())
        : false,
      isComputerTagChecked
        ? item.tag.toLowerCase().includes("Computer".toLowerCase())
        : false,
      isLanguageTagChecked
        ? item.tag.toLowerCase().includes("Language".toLowerCase())
        : false,
      isArtLitratureTagChecked
        ? item.tag.toLowerCase().includes("Art Litrature".toLowerCase())
        : false,
      isOtherTagChecked
        ? item.tag.toLowerCase().includes("Other".toLowerCase())
        : false,
    ];

    const isGradeChecked = gradeCheckedConditions.some(
      (condition) => condition
    );

    return (
      item.packageName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (isAllChecked || isGradeChecked)
    );
  });

  return (
    <div>
      <div className="grid grid-cols-6 ">
        <div className="col-span-2">
          <div className="w-fit  mx-auto my-10">
            <div className="flex my-7 mx-auto w-fit">
              <input
                type="text"
                id="search"
                className="block w-3/4 pl-10 pr-3 py-2 my-auto rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch;
                  }
                }}
              />
              <div className="bg-primaryColor text-white h-fit my-auto py-3 px-2 rounded-r-lg">
                <Search size={18} className="" />
              </div>
            </div>

            <div className=" w-full flex flex-col">
              <div className="w-fit mx-7 space-y-2">
                <h1 className="text-lg underline">Filter</h1>

                <div className="items-top flex space-x-2">
                  <input
                    type="checkbox"
                    id="terms1"
                    className="hover:bg-primaryColor cursor-pointer form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    checked={isAllChecked}
                    onChange={handleCheckboxChangeAll}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <h1 className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      All
                    </h1>
                  </div>
                </div>

                <h1 className="text-lg underline">Academics</h1>

                <div className="items-top flex space-x-2">
                  <input
                    type="checkbox"
                    id="terms1"
                    className="cursor-pointer form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    checked={isGrade9Checked}
                    onChange={handleCheckboxChangeG9}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <h1 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Grade 9
                    </h1>
                  </div>
                </div>

                <div className="items-top flex space-x-2">
                  <input
                    type="checkbox"
                    id="terms1"
                    className="  cursor-pointer form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    checked={isGrade10Checked}
                    onChange={handleCheckboxChangeG10}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <h1 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Grade 10
                    </h1>
                  </div>
                </div>

                <div className="items-top flex space-x-2">
                  <input
                    type="checkbox"
                    id="terms1"
                    className="cursor-pointer form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    checked={isGrade11Checked}
                    onChange={handleCheckboxChangeG11}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <h1 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Grade 11
                    </h1>
                  </div>
                </div>

                <div className="items-top flex space-x-2">
                  <input
                    type="checkbox"
                    id="terms1"
                    className="cursor-pointer form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    checked={isGrade12Checked}
                    onChange={handleCheckboxChangeG12}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <h1 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Grade 12
                    </h1>
                  </div>
                </div>

                <h1 className="text-lg underline">Multidisciplinary</h1>
                <div className="items-top flex space-x-2">
                  <input
                    type="checkbox"
                    id="terms1"
                    className="cursor-pointer form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    checked={isComputerTagChecked}
                    onChange={handleCheckboxChangeComputer}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <h1 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Computer Studies
                    </h1>
                  </div>
                </div>
                <div className="items-top flex space-x-2">
                  <input
                    type="checkbox"
                    id="terms1"
                    className="cursor-pointer form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    checked={isLanguageTagChecked}
                    onChange={handleCheckboxChangeLanguage}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <h1 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Language{" "}
                    </h1>
                  </div>
                </div>

                <div className="items-top flex space-x-2">
                  <input
                    type="checkbox"
                    id="terms1"
                    className="cursor-pointer form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    checked={isArtLitratureTagChecked}
                    onChange={handleCheckboxChangeArtLitrature}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <h1 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Art and Litrature
                    </h1>
                  </div>
                </div>

                <div className="items-top flex space-x-2">
                  <input
                    type="checkbox"
                    id="terms1"
                    className="cursor-pointer form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    checked={isOtherTagChecked}
                    onChange={handleCheckboxChangeOther}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <h1 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Other
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="grid grid-cols-2 xsm:grid-cols-3  gap-4 mx-2 my-3">
            {filteredPackages?.map((item, index: number) => {
              return (
                <Link key={index} href={`/package/${item.id}`}>
                  <div key={item.id} className="relative w-fit ">
                    <div className="m-7 hover:shadow-xl p-3 rounded-xl shadow-lg border hover:shadow-primaryColor">
                      <img
                        src={item?.imgUrl}
                        alt="ThumbNail Image"
                        className="mx-auto rounded-lg"
                      />
                      <div>
                        <h1 className="font-semibold text-lg">
                          {item?.packageName}
                        </h1>
                        <h1 className="py-1">{item?.tag}</h1>
                      </div>
                      <div className="w-full flex justify-end">
                        <h1 className="w-fit">
                          <span className="text-xl font-semibold">
                            {item.courses?.length}
                          </span>{" "}
                          Courses
                        </h1>
                      </div>
                    </div>
                    {/* <div className="rounded-xl overflow-hidden w-full">
                      <img
                        //src={`${apiUrl}/upload_assets/images/package_thumbnails/${item.thumbnail}`}
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
                    </div> */}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
