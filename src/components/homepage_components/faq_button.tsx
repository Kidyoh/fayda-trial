import React from 'react'
import Image from 'next/image'; // If you're using Next.js

const FAQButton = () => {

    return (
        <div className="hidden lg:flex absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 w-[90%] sm:w-[280px] h-auto flex-col items-center justify-center px-4">
            <div>
                <Image src="/svg/Asset 8.svg" alt="App Icon" width={80} height={80} className="sm:w-[120px] sm:h-[120px]" />
            </div>

            <button className="bg-yellow-400 hover:bg-yellow-300 text-white font-bold w-full sm:w-52 h-12 sm:h-16 text-xl sm:text-3xl font-Sendako rounded-full mb-6 sm:mb-8">
                FAQ
            </button>

            <div className="flex gap-4 h-8" />
        </div>

    )
}

export default FAQButton