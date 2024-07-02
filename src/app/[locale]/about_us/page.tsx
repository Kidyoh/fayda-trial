import Link from "next/link";
import React from "react";

export default function AboutUs() {
  return (
    <div className="container mx-auto">
      <section className="hero flex flex-col md:flex-row items-center gap-8 mb-8">
        <div className="hero-image w-full md:w-1/2">
          <img
            src="/common_files/main/cover3.png"
            alt="Fayida Academy Hero Image"
          />
        </div>
        <div className="hero-text my-4 w-full md:w-1/2 px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-primaryColor tracking-wide mb-4">
            Fayida Academy - Where knowledge meets convenience
          </h1>
        </div>
      </section>

      <section className="mission px-4 lg:px-8 mb-8">
        <h2 className="text-2xl font-bold text-center mb-4">Our Mission</h2>
        <p className="text-lg leading-relaxed">
          We believe education should be accessible to everyone, regardless of
          location or schedule. That&apos;s why we&apos;ve created a
          user-friendly platform that allows you to learn at your own pace,
          anytime, and anywhere.
        </p>
      </section>

      <section className="services grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:px-8">
        <div className="service flex flex-col items-center p-4 bg-gray-100 rounded shadow-md transition hover:shadow-lg">
          <img
            src="/common_files/main/aboutcover.png"
            alt="Service Icon"
            className="w-20 h-20 mb-4"
          />
          <h3 className="text-xl font-bold mb-2">Diverse Course Range</h3>
          <p className="text-base text-gray-700">
            From technology and business to arts and personal development, we
            offer something for everyone.
          </p>
        </div>
        <div className="service flex flex-col items-center p-4 bg-gray-100 rounded shadow-md transition hover:shadow-lg">
          <img
            src="/common_files/main/aboutcover.png"
            alt="Service Icon"
            className="w-20 h-20 mb-4"
          />
          <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
          <p className="text-base text-gray-700">
            Passionate professionals share their knowledge and expertise through
            engaging lessons.
          </p>
        </div>
        <div className="service flex flex-col items-center p-4 bg-gray-100 rounded shadow-md transition hover:shadow-lg">
          <img
            src="/common_files/main/aboutcover.png"
            alt="Service Icon"
            className="w-20 h-20 mb-4"
          />
          <h3 className="text-xl font-bold mb-2">Seamless Learning</h3>
          <p className="text-base text-gray-700">
            Intuitive platform with progress tracking, forums, and downloadable
            resources.
          </p>
        </div>
      </section>

      <section className="call-to-action bg-primaryColor text-white px-4 lg:px-8 py-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">
          Join our thriving community of learners
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          Expand your horizons, gain new skills, and unlock your true potential.
        </p>
        <Link href={"/explore_packages"}>
          <button className="bg-white text-primaryColor px-4 py-2 rounded shadow-md hover:bg-gray-200">
            Start Your Learning Adventure
          </button>
        </Link>
      </section>
    </div>
  );
}

{
  /*
   <div className="my-3">
      <div className="w-full flex mb-3 px">
        <h1 className="mx-auto text-xl font-semibold text-primaryColor">
          About
        </h1>
      </div>
      <div className="mt-6 boder-2 ">
        <img src="/common_files/main/cover3.png" alt="" />
      </div>

      <div className="mx-4 my-2 border-2 border-primaryColor px-2 py-2">
        <h1 className="">
          {" "}
          Welcome to Fayida Acadamy, a leading online learning destination where
          knowledge meets convenience. Our mission is to empower learners from
          all walks of life to unlock their full potential by providing
          top-quality courses from industry experts and thought leaders. At
          Fayida Acadamy, we believe that education should be accessible to
          everyone, regardless of geographical location or busy schedules.
          That's why we've created a user-friendly platform that allows you to
          learn at your own pace, anytime, and anywhere. Whether you're a
          professional looking to upskill, a student seeking supplementary
          learning resources, or an individual passionate about personal growth,
          we have a course for you.
        </h1>
      </div>
      <div className="grid grid-cols-3  w-full px-5">
        <div className="w-fit my-auto col-span-1  bg-primaryColor rounded shadow-xl shadow-primaryColor border-2 border-white">
          <img src="/common_files/main/aboutcover.png" alt="" />
        </div>
        <div className="col-span-2 px-5">
          <div className="px-5 my-6 text-lg">
            <h1>
              We take pride in curating a diverse range of courses that cover
              various subjects, from technology and business to arts and
              personal development. Our instructors are experienced
              professionals who are passionate about sharing their knowledge and
              expertise. <br />
              <br />
              They design engaging lessons, interactive quizzes, and practical
              exercises to ensure a dynamic learning experience that sticks with
              you long after the course is completed. We are dedicated to
              providing exceptional customer support and a seamless learning
              journey. <br />
              <br />
              Our platform is equipped with intuitive features, such as progress
              tracking, discussion forums, and downloadable resources, to
              enhance your learning experience and foster a vibrant community of
              learners. <br />
              <br /> Join thousands of learners who have already embarked on
              their learning journey with Fayida Acadamy. Expand your horizons,
              gain new skills, and unleash your true potential. Start your
              learning adventure today and unlock a world of possibilities.{" "}
              <br /> <br />
              Together, let's embrace the future of education and make learning
              an exciting and transformative experience.
            </h1>
          </div>
        </div>
      </div>
    </div>
*/
}
