import React from 'react'
import Image from 'next/image'; // If you're using Next.js

const FAQButton = () => {

    return (
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[280px] h-[300px] flex flex-col items-center justify-center px-4">
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
                FAQ
            </button>

            <div className="flex gap-4 h-8"/>
        </div>
    )
}

export default FAQButton