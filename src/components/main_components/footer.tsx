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
            <h1>Facebook</h1>
            <h1>Telegram</h1>
            <h1>LinkedIn</h1>
            <h1>Tweeter</h1>
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
