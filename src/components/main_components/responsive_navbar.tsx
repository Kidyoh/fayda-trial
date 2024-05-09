"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AlignLeft,
  X,
  Settings,
  ChevronDown,
  Bell,
  User,
  LogOut,
  UserCircle,
  Home,
  // LibraryBig,
  StickyNote,
  Award,
  SearchSlash,
  // BookA,
  Blocks,
  Book,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { apiUrl } from "@/apiConfig";
import CheckPhoneNumber from "@/app/mock_package/mock_package_components/checkphonenumber";
import useDrawerStatus from "@/app/store/navbarDrawerStore";

export default function NavBarForMobile(props: any) {
  const data = props?.data;
  const notificationNumber = props?.notificationNumber;
  const userName = props?.userName;
  console.log("good");
  console.log("data: " + data);
  const routerPathname = usePathname();

  // const [dropdown, setDropDown] = useState(false);
  const setDrawerStatus = useDrawerStatus((state) => state.setDrawerStatus);
  const drawerStatus = useDrawerStatus((state) => state.drawerStatus);

  const toggleDropDown = () => {
    //  setDropDown(!dropdown);

    setDrawerStatus(!drawerStatus);
  };

  useEffect(() => {
    // Function to handle the click event
    const handleClick = (event: any) => {
      // Check if the click is outside the navbar drawer
      if (!event.target.closest(".navbar-drawer")) {
        // Close the navbar drawer
        //   setDropDown(false);
      }
    };
    // Attach the event listener to the document body
    document.body.addEventListener("click", handleClick);

    // Clean up by removing the event listener when the component unmounts
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div className="relative ">
      <div className="justify-between flex w-full bg-gradient-to-b from-white  to-gray-200 h-full  px-2">
        <div
          className="my-auto cursor-pointer"
          onClick={() => toggleDropDown()}
        >
          {drawerStatus ? <X /> : <AlignLeft />}
        </div>
        <div>
          {" "}
          <Link href={"/"}>
            <img
              className="h-10"
              src="/common_files/main/smallfulllogo.png"
              alt="fayida"
            />
          </Link>
        </div>

        {/* <div className="my-auto">
          <Settings />
        </div> */}
      </div>

      {drawerStatus && (
        <div className="absolute py-5  left-0 top-10 px-3 bg-gradient-to-r from-gray-50  to-blue-200 shadow-2xl  w-1/2 rounded-br-2xl ">
          <div className="z-50 ">
            <div className="space-y-2">
              {" "}
              <div>
                <Link href={"/"}>
                  <h1
                    className={
                      routerPathname == "/"
                        ? "text-primaryColor nav_bar_hover "
                        : "text-fourthColor nav_bar_hover "
                    }
                  >
                    <div
                      className="flex space-x-2"
                      onClick={() => toggleDropDown()}
                    >
                      <Home />
                      <h1>Home</h1>
                    </div>
                  </h1>
                </Link>
              </div>
              <div>
                {data != "User not authenticated" && (
                  <div className="mx-2">
                    <Link href="/packages_access/courses_list">
                      <h1
                        className={
                          routerPathname == "/packages_access/courses_list"
                            ? "text-primaryColor nav_bar_hover_dropdown "
                            : "text-fourthColor nav_bar_hover_dropdown "
                        }
                      >
                        <div
                          className="flex space-x-2"
                          onClick={() => toggleDropDown()}
                        >
                          <Blocks /> <h1>Courses List</h1>
                        </div>
                      </h1>
                    </Link>
                  </div>
                )}
              </div>
              <div>
                {data != "User not authenticated" && (
                  <div className="mx-2">
                    <Link href="/packages_access/packages_list">
                      <h1
                        className={
                          routerPathname.startsWith(
                            "/packages_access/packages_list"
                          )
                            ? "text-primaryColor nav_bar_hover_dropdown "
                            : "text-fourthColor nav_bar_hover_dropdown "
                        }
                      >
                        <div
                          className="flex space-x-2"
                          onClick={() => toggleDropDown()}
                        >
                          <Blocks /> <h1>Packages</h1>
                        </div>
                      </h1>
                    </Link>
                  </div>
                )}
              </div>
              <div>
                <Link href={"/explore_packages"}>
                  <div className="nav_bar_hover">
                    <h1
                      className={
                        routerPathname.startsWith("/explore_packages")
                          ? "text-primaryColor nav_bar_hover_dropdown "
                          : "text-fourthColor nav_bar_hover_dropdown "
                      }
                    >
                      <div
                        className="flex space-x-2"
                        onClick={() => toggleDropDown()}
                      >
                        <Blocks />
                        <h1>Explore</h1>
                      </div>
                    </h1>
                  </div>
                </Link>
              </div>
              <div>
                <div className="nav_bar_hover">
                  <h1
                    className={
                      routerPathname.startsWith("/mock_package")
                        ? "text-primaryColor nav_bar_hover_dropdown "
                        : "text-fourthColor nav_bar_hover_dropdown "
                    }
                  >
                    <div className="flex space-x-2">
                      <Book />
                      <CheckPhoneNumber
                        pushto={"/mock_package/selectmainfolder"}
                      />
                    </div>
                  </h1>
                </div>
              </div>
              <div>
                <Link href={"/blogs"}>
                  <div className="nav_bar_hover">
                    <h1
                      className={
                        routerPathname.startsWith("/blogs")
                          ? "text-primaryColor nav_bar_hover_dropdown "
                          : "text-fourthColor nav_bar_hover_dropdown "
                      }
                    >
                      <div
                        className="flex space-x-2"
                        onClick={() => toggleDropDown()}
                      >
                        <StickyNote /> <h1>Blogs</h1>
                      </div>
                    </h1>
                  </div>
                </Link>
              </div>
              <div>
                <Link href={"/leaderboard"}>
                  <div className="nav_bar_hover">
                    <h1
                      className={
                        routerPathname == "/leaderboard"
                          ? "text-primaryColor nav_bar_hover_dropdown "
                          : "text-fourthColor nav_bar_hover_dropdown "
                      }
                    >
                      <div
                        className="flex space-x-2"
                        onClick={() => toggleDropDown()}
                      >
                        <Award /> <h1>LeaderBoard</h1>
                      </div>
                    </h1>
                  </div>
                </Link>
              </div>
              <div>
                <Link href={"/about_us"}>
                  <div className="nav_bar_hover">
                    <h1
                      className={
                        routerPathname == "/about_us"
                          ? "text-primaryColor nav_bar_hover_dropdown "
                          : "text-fourthColor nav_bar_hover_dropdown "
                      }
                    >
                      <div
                        className="flex space-x-2"
                        onClick={() => toggleDropDown()}
                      >
                        <SearchSlash /> <h1>About</h1>
                      </div>
                    </h1>
                  </div>
                </Link>
              </div>
              <div>
                <Link href={"notifications"}>
                  <div className="relative text-fourthColor  pr-2 nav_bar_hover">
                    <div className="my-auto">
                      <Bell />
                    </div>
                    {notificationNumber != 0 && (
                      <div className="absolute px-1  top-0 right-0 text-white rounded-full bg-red-600">
                        <h1>{notificationNumber}</h1>
                      </div>
                    )}
                  </div>{" "}
                </Link>
              </div>
              {data == "User not authenticated" ? (
                <div
                  className="mx-2 flex space-x-3"
                  onClick={() => toggleDropDown()}
                >
                  <div>
                    <Link href={"/login"}>
                      <button className=" text-primaryColor  rounded-md font-semibold  ">
                        Login
                      </button>
                    </Link>
                  </div>

                  <div>
                    <Link href={"/signup"}>
                      <button className="  text-primaryColor font-semibold  rounded-md hover:bg-white  ">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div
                  className="my-auto text-secondaryColor"
                  onClick={() => toggleDropDown()}
                >
                  <Link href="/profile">Profile</Link>
                  <div className="mt-3">
                    <form
                      action={`${apiUrl}/login_register/logout`}
                      method="POST"
                    >
                      <button type="submit">
                        <div className="flex text-secondaryColor space-x-1 nav_bar_hover_dropdown ">
                          <LogOut size={20} />
                          <h1>Log Out</h1>
                        </div>
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
