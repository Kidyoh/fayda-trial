import MarqueeItem from "./marquee_item";


const Marquee = () => {
    const upperMarquee = [
        { img: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
        { img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
        { img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
        { img: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
        { img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
        { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/768px-Spotify_icon.svg.png?20220821125323" },
        { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Unity_logo.svg/450px-Unity_logo.svg.png?20160727081127" }
    ];

    const lowerMarquee = [
        { img: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
        { img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
        { img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
        { img: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
        { img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
        { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/768px-Spotify_icon.svg.png?20220821125323" },
        { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Unity_logo.svg/450px-Unity_logo.svg.png?20160727081127" },
    ];

    return (
        <div
            className="w-full mx-auto overflow-hidden py-12 md:py-16 lg:py-28 px-4 md:px-8 2xl:h-auto flex flex-col justify-center"
        >
            <MarqueeItem items={upperMarquee} from={0} to={"-100%"} />
            <MarqueeItem items={lowerMarquee} from={"-100%"} to={0} />
        </div>
    );
};

export default Marquee;