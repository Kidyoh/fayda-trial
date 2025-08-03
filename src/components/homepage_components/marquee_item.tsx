"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const MarqueeItem = ({ items, from, to }) => {
    return (
        <div className="flex">
            {/* First Marquee */}
            <motion.div
                initial={{ x: `${from}` }}
                animate={{ x: `${to}` }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="flex flex-shrink-0 mb-2 md:mb-8"
            >
                {items?.map(({ img, name }) => {
                    return (
                        <div
                            key={name}
                            className="w-40 h-32 mx-2 md:mx-8 mt-4"
                        >
                            <Image src={img} width={128} height={96}  className="object-contain w-full h-full" alt="company logo" />
                        </div>
                    );
                })}
            </motion.div>

            {/* Second Marquee */}
            <motion.div
                initial={{ x: `${from}` }}
                animate={{ x: `${to}` }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="flex flex-shrink-0 mb-2 md:mb-8"
            >
                {items?.map(({ img, name }) => {
                    return (
                        <div
                            key={name}
                            className="w-40 h-32 mx-2 md:mx-8 mt-4  "
                        >
                            <Image src={img} width={128} height={96} className="object-contain w-full h-full" alt="company logo" />
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default MarqueeItem;