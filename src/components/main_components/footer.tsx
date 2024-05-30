import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import {
  Copyright,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  PhoneCall,
  Send,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa3, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-primaryColor text-white py-6">
      <div className="xmd:grid grid-cols-3 ">
        <div className="xmd:col-span-1 py-5 xmd:py-0">
          <div className=" w-fit mx-auto   duration-75 cursor-pointer">
            <img
              className="h-32 smd:h-32 lg:h-44 "
              //   className=" w-1/2"
              src="/common_files/main/logo_white.png"
              alt="fayida"
            />
          </div>
        </div>
        <div className="col-span-2 flex">
          <div className="w-3/4 lg:w-3/5 mx-auto my-auto  text-sm flex flex-col space-y-2 ssmd:space-y-0 ssmd:flex-row ssmd:justify-between ">
            <a
              className="hover:text-thirdColor hover:underline duration-75"
              href="/contact_us"
            >
              Contact Us
            </a>
            <a
              className="hover:text-thirdColor hover:underline duration-75"
              href=""
            >
              About Us
            </a>
            <a
              className="hover:text-thirdColor hover:underline duration-75"
              href="/f_a_q"
            >
              FAQ
            </a>
            <a
              className="hover:text-thirdColor hover:underline duration-75"
              href="/terms_of_service"
            >
              Terms of Service
            </a>
            {/* <a
              className="hover:text-thirdColor hover:underline duration-75"
              href=""
            >
              Privacy Policy
            </a> */}
          </div>
        </div>
      </div>
      <Separator className="w-11/12 my-4 mx-auto" orientation="horizontal" />
      <div className=" w-fit xmd:w-full flex flex-col-reverse smd:flex-row space-x-9 mx-auto xmd:space-x-0 xmd:mx-0 xmd:justify-between px-10">
        <div className="flex space-x-1 text-sm ">
          <Copyright size={15} className="my-auto" />
          <h1 className="my-auto">Fayida Academy. All Rights Reserved</h1>
        </div>
        <div className="smd:w-1/4 space-y-5 py-3 ">
          <div className="flex w-full justify-between">
            <Link
              className=" duration-75  border-2 border-primaryColor hover:border-thirdColor p-1"
              target="_blank"
              href="https://www.facebook.com/profile.php?id=61557674511552&mibextid=LQQJ4d"
            >
              <Facebook />
            </Link>
            <Link
              className="duration-75  border-2 border-primaryColor hover:border-thirdColor p-1"
              target="_blank"
              href="https://www.instagram.com/fayidaacademy?igsh=MXBmdzhqcDEwMTd2NA=="
            >
              <Instagram />
            </Link>
            <Link
              className=" duration-75  border-2 border-primaryColor hover:border-thirdColor p-1"
              target="_blank"
              href="https://www.linkedin.com/company/ethlook/"
            >
              <Linkedin />
            </Link>
            <Link
              className=" duration-75  border-2 border-primaryColor hover:border-thirdColor p-1"
              target="_blank"
              href="https://www.youtube.com/@FayidaAcademyOfficial"
            >
              <Youtube />
            </Link>

            <Link
              className=" duration-75   border-2 border-primaryColor hover:border-thirdColor p-1"
              target="_blank"
              href="https://t.me/fayidaacademy"
            >
              <Send />
            </Link>

            <Link
              className=" duration-75   border-2 border-primaryColor hover:border-thirdColor p-1"
              target="_blank"
              href="https://www.tiktok.com/@fayidaacademy?_t=8m7lTj0C4kt&_r=1"
            >
              <FontAwesomeIcon
                icon={faTiktok}
                className=" text-white   my-auto"
                style={{ fontSize: "1.5rem" }}
              ></FontAwesomeIcon>
            </Link>
          </div>
          <div className=" smd:col-span-1 mx-auto right-0   w-fit  flex space-x-2">
            <PhoneCall />
            <h1>+251915733163</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
