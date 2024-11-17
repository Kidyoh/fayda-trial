"use client";
import React, { useEffect, useState } from "react";
import {
  UserCircle,
  User,
  UserCheck,
  Home,
  RowsIcon,
  Book,
  LogOut,
  Pencil,
} from "lucide-react";
import { apiUrl } from "@/apiConfig";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import CoursesList from "../packages_access/courses_list/page";
import CourseList2 from "./components/course_list";
import Footer from "@/components/main_components/footer";
import { setAccessToken, getAccessToken, clearAccessToken } from "../../../lib/tokenManager";

import { useRouter } from "next/navigation";

export default function DashBoard() {
  const [data, setData] = useState<any>();
  const [coursesList, setCoursesList] = useState<any[]>([]);
  const [packagesList, setPackagesList] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [menuSelection, setMenuSelection] = useState("dashboard");

  const accessToken = getAccessToken();
  const { push } = useRouter();

  useEffect(() => {
    const fetchData = () => {
      fetch(`${apiUrl}/newlogin/profile`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
        },
      })
        .then((response) => response.json())
        .then((jsonData) => {
          setData(jsonData);
          //  console.log(jsonData[0].Courses.materials);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/purchaselist/specificStudentCourses`,
          {
            credentials: "include",
          }
        );

        const jsonData = await response.json();
        setCoursesList(jsonData);
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
        const response = await fetch(`${apiUrl}/purchaselist/getpuchasedlist`, {
          method: "GET",
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
          },
        });
        const jsonData = await response.json();
        setPackagesList(jsonData);
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

  const setMenuSelectionClick = (menu: any) => {
    setMenuSelection(menu);
  };


  const setTokenLogout= () =>{

    setAccessToken("0");
    window.location.href = "/login";
  }
  return (
    <div>
      <div className="ssmd:grid grid-cols-6 my-6">
        <div className="col-span-2 ">
          <div className="mx-auto w-fit ">
            <User
              size={120}
              className="text-gray-100 mx-auto py-2 border-4 bg-primaryColor  rounded-full p-5"
            />
            <h1>
              {data?.firstName} {data?.lastName} {data?.grandName}
            </h1>
          </div>

          <div className="w-fit mx-auto space-y-4 py-4">
            <div
              onClick={() => {
                setMenuSelectionClick("dashboard");
              }}
              className={`flex space-x-2 cursor-pointer hover:bg-primaryColor hover:bg-opacity-75 duration-100 px-4 py-2 hover:text-white hover:rounded-3xl ${
                menuSelection == "dashboard" &&
                "bg-primaryColor text-white px-4 py-2 rounded-3xl"
              }`}
            >
              <Home size={20} />
              <h1>DashBoard</h1>
            </div>
            <div
              onClick={() => {
                setMenuSelectionClick("mycourse");
              }}
              className={`flex space-x-2 cursor-pointer hover:bg-primaryColor hover:bg-opacity-75 duration-100 px-4 py-2 hover:text-white hover:rounded-3xl ${
                menuSelection == "mycourse" &&
                "bg-primaryColor text-white px-4 py-2 rounded-3xl"
              }`}
            >
              <RowsIcon size={20} className="" />
              <h1>My Courses</h1>
            </div>
            <div
              onClick={() => {
                setMenuSelectionClick("mypackage");
              }}
              className={`flex space-x-2 cursor-pointer hover:bg-primaryColor hover:bg-opacity-75 duration-100 px-4 py-2 hover:text-white hover:rounded-3xl  ${
                menuSelection == "mypackage" &&
                "bg-primaryColor text-white px-4 py-2 rounded-3xl"
              }`}
            >
              <Book size={20} className="" />
              <h1>My Packages</h1>
            </div>

            <div>
              <Link href={"/profile"}>
                <div className="flex space-x-1 ">
                  <Pencil />
                  <h1>Edit Profile</h1>
                </div>
              </Link>
            </div>

            <div>
             
                <button onClick={()=>setTokenLogout()}>
                  <div className="flex space-x-1 nav_bar_hover_dropdown ">
                    <LogOut size={20} className="" />
                    <h1>Log Out</h1>
                  </div>
                </button>
           
            </div>
          </div>
        </div>
        <div className="col-span-4">
          {menuSelection == "dashboard" && (
            <div className="smd:grid grid-cols-2 md:grid-cols-3 gap-4 mx-0">
              <div className="col-span-1 bg-primaryColor border-gray-200 border-2 p-5 rounded-2xl bg-opacity-70">
                <h1 className="text-gray-100 py-2">
                  Age: <span className="underline">{data?.age}</span>
                </h1>
                <h1 className="text-gray-100 py-2">
                  Email: <span className="underline">{data?.email}</span>
                </h1>
              </div>

              <div className="col-span-1 bg-primaryColor border-gray-200 border-2 p-5 rounded-2xl bg-opacity-80">
                <h1 className="text-gray-100 py-2">
                  School: <span className="underline">{data?.schoolName}</span>
                </h1>
                <h1 className="text-gray-100 py-2">
                  City: <span className="underline">{data?.city}</span>
                </h1>
                <h1 className="text-gray-100 py-2">
                  Region: <span className="underline">{data?.region}</span>
                </h1>
              </div>

              <div className="col-span-1 flex bg-primaryColor border-gray-200 border-2 p-5 rounded-2xl bg-opacity-90">
                <h1 className="text-gray-100 py-2 my-auto mx-auto">
                  Grade: <span className="underline">{data?.gread}</span>
                </h1>
              </div>

              <div className="col-span-1 bg-primaryColor border-gray-200 border-2 p-5 rounded-2xl bg-opacity-80">
                <h1 className="text-gray-100 py-2">
                  Phone: <span className="underline">{data?.phoneNumber}</span>
                </h1>
              </div>

              <div className="col-span-1 flex bg-primaryColor border-gray-200 border-2 p-5 rounded-2xl bg-opacity-90">
                <h1 className="text-gray-100 py-2 my-auto mx-auto">
                  Points: <span className="underline">{data?.points}</span>
                </h1>
              </div>
            </div>
          )}

          {menuSelection == "mycourse" && (
            <div>
              <div>
                {" "}
                <div className="w-full flex justify-center items-center py-4"></div>
                <div className="w-full">
                  <CourseList2 />
                </div>
              </div>
            </div>
          )}

          {/* {menuSelection == "mycourse" && (
            <div>
              <div>
                {" "}
                <div className="w-full flex justify-center items-center py-4">
                  <h1 className="text-2xl font-semibold text-primaryColor">
                    Explore Exciting Courses
                  </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mx-auto px-4">
                  {coursesList?.map((course) => (
                    <Link
                      key={course?.Courses?.id} // Add key prop for each item
                      href={`/packages_access_2/${course?.Courses?.id}`}
                      //href="/"
                      className="course-card flex flex-col bg-primaryColor border-2 border-white rounded-2xl shadow-xl shadow-primaryColor text-white my-4 p-4 hover:shadow-2xl"
                    >
                      <div className="course-info flex-1">
                        <h2 className="text-lg font-semibold mb-2">
                          {course?.Courses?.courseName}
                        </h2>
                        <p className="text-sm">
                          {course?.Courses?.courseDescription}
                        </p>
                      </div>
                      <div className="course-footer flex justify-between items-center text-sm">
                        <p className="font-semibold">
                          {course?.Packages?.packageName}
                        </p>
                        <svg
                          className="w-6 h-6 ml-2 text-primaryColor fill-current"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.293 3.293a1 1 0 01 1.414 0l6 6a1 1 0 01 0 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293z" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )} */}

          {menuSelection == "mypackage" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                {packagesList.length >= 0 && packagesList?.map((item, index: number) => (
                  <Link key={index} href={`/package_2/${item?.packagesId}`}>
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
                            {new Date(item.expiryDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                              }
                            )}
                          </h1>
                        )}

                        <h1>
                          {item.expiryDate && (
                            <span>
                              Days Remaining:{" "}
                              {Math.ceil(
                                (new Date(item.expiryDate).getTime() -
                                  new Date().getTime()) /
                                  (1000 * 60 * 60 * 24)
                              ) > 0
                                ? Math.ceil(
                                    (new Date(item.expiryDate).getTime() -
                                      new Date().getTime()) /
                                      (1000 * 60 * 60 * 24)
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
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
