import React from "react";
import { Copyright } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-primaryColor text-white py-6">
      <div className="justify-around mx-10 smd:mx-0 smd:flex">
        <div>
          <h1 className="text-thirdColor  font-semibold pb-2">About Us</h1>
          <div>
            <h1>Online Learning</h1>
            <h1>Careers</h1>
            <h1>Packages</h1>
          </div>
        </div>
        <div>
          <h1 className="text-thirdColor font-semibold pb-2">Topics</h1>
          <div>
            <h1>Contact Information</h1>
            <h1>Core Subjects</h1>
            <h1>Science and Technology</h1>
            <h1>Popular Subjects</h1>
          </div>
        </div>
        <div>
          <h1 className="text-thirdColor font-semibold pb-2">Articles</h1>
          <div>
            <h1>Blogs</h1>
            <h1>Frequently Asked Questions</h1>
            <h1>Study Resorces</h1>
            <h1>News and Updates</h1>
          </div>
        </div>
        <div>
          <h1 className="text-thirdColor font-semibold pb-2">Contact Us</h1>
          <div>
            <div className="hover:text-thirdColor">
              <a target="_blank" href="https://www.facebook.com/profile.php?id=61557674511552&mibextid=LQQJ4d">
                Facebook
              </a>
            </div>
            <div className="hover:text-thirdColor">
              {" "}
              <a
                target="_blank"
                href="https://www.instagram.com/fayidaacademy?igsh=MXBmdzhqcDEwMTd2NA=="
              >
                Instagram
              </a>
            </div>
            <div className="hover:text-thirdColor">
              <a
                target="_blank"
                href="https://www.tiktok.com/@fayidaacademy?_t=8m7lTj0C4kt&_r=1"
              >
                TikTok
              </a>
            </div>
            <div className="hover:text-thirdColor">
              <a
                target="_blank"
                href="https://www.linkedin.com/company/ethlook/"
              >
                Linked In
              </a>
            </div>
            <div className="hover:text-thirdColor">
              {" "}
              <a target="_blank" href="https://t.me/fayidaacademy">
                Telegram
              </a>
            </div>
            <div className="hover:text-thirdColor">
              <a
                target="_blank"
                href="https://www.youtube.com/@FayidaAcademyOfficial"
              >
                Youtube
              </a>
            </div>
            <div>
              <h1>fayidaacademy@gmail.com</h1>
            </div>
            <div>
              <h1>+251915733163</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex py-12 text-thirdColor">
        <div className="flex mx-auto space-x-2">
          <Copyright />
          <h1>All Rights Reserved.</h1>
        </div>
      </div>
    </div>
  );
}
