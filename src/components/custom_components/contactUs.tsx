import React from "react";
import {
  AtSign,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  PhoneCall,
  Send,
  MapPin,
} from "lucide-react";

export default function contactUs() {
  return (
    <div className="w-full bg-primaryColor bg-opacity-50 py-7">
      <div className="m-2 xmd:m-9 p-2 xmd:p-8 border-2 bg-white">
        <div className="xmd:grid grid-cols-2 border-2 p-5">
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold py-6 px-4 ">Contact Us</h1>

            <div className="flex space-x-4">
              <div className="my-auto">
                <AtSign />
              </div>
              <div>
                <h1>Email</h1>
                <h1>fayidaacademy@gmail.com</h1>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="my-auto">
                <PhoneCall />
              </div>
              <div>
                <h1>Phone</h1>
                <h1>+251970483333 </h1> <h1>+251970493333</h1>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="my-auto">
                <Send />
              </div>
              <div>
                <h1>Telegram</h1>
                <h1>@fayidaacademy</h1>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="my-auto">
                <MapPin />
              </div>
              <div>
                <h1>Adress</h1>
                <h1>Ayat, Galaxy bldg. 3rd floor , Addis Ababa, Ethiopia</h1>
              </div>
            </div>
          </div>
          <div className="p-1">
            <div className="border-primaryColor border-2 h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6321.117200090417!2d38.87837423942284!3d9.022396327003138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b9110219b14bb%3A0xebedb3471cf21533!2zR2FsYXh5IHN1cGVybWFya2V0IHwgQXlhdCB8IOGMi-GIi-GKreGIsiDhiLHhjZDhiK3hiJvhiK3hiqzhibUgfCDhiqDhi6vhibU!5e0!3m2!1sen!2set!4v1717072489431!5m2!1sen!2set"
                // width="600"
                // height="450"
                // className="w-fit"
                // style="border:0;"
                // allowfullscreen=""
                className="w-full h-full"
                loading="lazy"
                // referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
