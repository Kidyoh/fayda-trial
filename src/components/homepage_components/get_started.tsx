import React from 'react'
import Image from 'next/image'; // If you're using Next.js

const GetStarted = () => {

    return (
        <div className="hidden lg:flex absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 w-[90%] sm:w-[280px] h-auto flex-col items-center justify-center px-4">
            <div>
                <Image src="/Images/Axum.png" alt="App Icon" width={80} height={80} className="w-12 object-contain" />
            </div>

            <button className="bg-yellow-400 hover:bg-yellow-300 text-white font-bold w-full sm:w-52 h-12 sm:h-16 text-xl sm:text-3xl font-Sendako rounded-full mb-6 sm:mb-8">
                Get Started
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                    <Image src="/logos/app-store.png" alt="App Store" width={140} height={50} />
                </a>
                <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                    <Image src="/logos/play-store.png" alt="Play Store" width={140} height={50} />
                </a>
            </div>
        </div>

    )
}

export default GetStarted