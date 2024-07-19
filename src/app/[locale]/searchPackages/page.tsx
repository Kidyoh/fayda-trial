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
      <div className="smd:grid grid-cols-6 m-4">
        <div className="col-span-2">
          <div className="w-fit  mx-auto my-10">
            <h1 className="text-2xl text-center ssmd:text-left text-primaryColor font-semibold">
              Explore Packages
            </h1>

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
              <div className="w-fit mx-7 flex smd:flex-col  flex-wrap justify-center space-x-3 space-y-2 smd:space-y-2">
                <h1 className="hidden smd:block  text-lg underline">Filter</h1>

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

                <h1 className="hidden smd:block text-lg underline">
                  Academics
                </h1>

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

                <h1 className="hidden smd:block  text-lg underline">
                  Multidisciplinary
                </h1>
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
          <div className="grid grid-cols-2 md:grid-cols-2 xxmd:grid-cols-3  gap-8 mx-2 my-3">
            {filteredPackages?.map((singlePackage, index: number) => {
              return (
                <Link key={index} href={`/package/${singlePackage.id}`}>
                  <div className=" rounded-2xl group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                    <div className=" w-full">
                      <img
                        className="group-hover:translate-y-[-60%] translate-y-0 h-full w-full object-cover transition-transform duration-500  "
                        src={singlePackage.imgUrl}
                        alt=""
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primaryColor group-hover:from-primaryColor/70 group-hover:via-primaryColor/60 group-hover:to-primaryColor/70"></div>
                    <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-3 text-center transition-all duration-500 group-hover:translate-y-0">
                      {/* <h1 className="font-dmserif text-3xl font-bold text-white">
                  Beauty
                </h1> */}
                      <div className="justify-between flex w-full text-white  font-semibold">
                        <h1 className=" text-sm xxmd:text-base lg:text-lg">
                          {singlePackage.packageName}
                        </h1>
                        <h1 className="text-sm">{singlePackage.price} Birr</h1>
                      </div>
                      <p className="line-clamp-4 pt-12 mb-3 text-sm  text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {singlePackage.packageDescription}
                      </p>

                      <h1 className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">
                        Details
                      </h1>
                    </div>
                  </div>

                  {/* <div key={item.id} className="relative w-fit ">
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
                   
                  </div> */}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
