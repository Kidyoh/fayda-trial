import React from "react";

const AboutBot = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Fayida Academy Bot
        </h1>
        <p className="text-gray-600 mb-6">
          Fayida Academy Bot is designed to enhance your learning experience by
          providing instant access to educational resources, student profiles,
          and much more. Whether you're looking for personalized content or a
          way to track your progress, our bot has got you covered.
        </p>
        <p className="text-gray-600 mb-6">
          Use the bot to interact with clubs, ask questions, and receive answers
          in real-time. Join the community and make your learning journey easier
          and more interactive.
        </p>
        <a
          href="https://t.me/fayidaacademy_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-primaryColor text-white rounded-full font-semibold hover:bg-green-400 transition duration-300"
        >
          Go to Bot
        </a>
      </div>
    </div>
  );
};

export default AboutBot;
