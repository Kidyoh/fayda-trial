import React from 'react'
import Image from 'next/image'; // If you're using Next.js

const GetStarted = () => {

    return (
        <div className="absolute left-10 top-1/2 -translate-y-1/2 w-[280px] h-[30    0px] flex flex-col items-center justify-center px-4">
            {/* Icon */}
            <div>
                <Image
                    src="/svg/Asset 8.svg"
                    alt="App Icon"
                    width={120}
                    height={120}
                />
            </div>

            <button className="bg-yellow-400 hover:bg-yellow-300 text-white font-bold w-52 h-16 text-3xl font-Sendako rounded-full mb-8">
                Get Started
            </button>

            <div className="flex gap-4">
                <a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/logos/app-store.png"
                        alt="Download on the App Store"
                        width={150}
                        height={60}
                    />
                </a>
                <a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/logos/play-store.png"
                        alt="Get it on Google Play"
                        width={150}
                        height={60}
                    />
                </a>
            </div>
        </div>
    )
}

export default GetStarted