import Project from "@/static/Project";
import { fetchRssImages } from "@/component/utils/fetchRssImages";

const Projects = async () => {
    try {
        console.log("[Projects] Fetching RSS feed for server-side rendering...");
        const rssFeedUrl = "https://backend.deviantart.com/rss.xml?q=gallery:valtrox69/87450611"; // Replace with your actual RSS feed URL
        const images = await fetchRssImages(rssFeedUrl);
        console.log("[Projects] Images fetched from RSS:");

        const filteredImages = Object.values(
            images.reduce((acc, image) => {
                if (!acc[image.title] || new Date(image.time) > new Date(acc[image.title].time)) {
                    acc[image.title] = image;
                }
                return acc;
            }, {} as Record<string, { title: string; link: string; thumbnail: string; time: string }>)
        );

        return (
            <div id="Projects" className="bg-gradient-to-r from-gradientLeft to-gradientRight">
                <img
                    className="w-full h-44"
                    src="/transitions/transition_grey.svg"
                    alt="Grey transition graphic"
                />
                <p className="flex text-4xl my-8 justify-center text-white font-bold">My Gallery</p>
                <div className="flex flex-wrap w-full desktop:px-20 justify-center">
                    {filteredImages && filteredImages.length > 0 ? (
                        filteredImages.slice(0, 15).map((image, index) => (
                            <Project
                                key={index}
                                headline={image.title}
                                image={image.thumbnail}
                                text={image.link}
                                link={image.link}
                            />
                        ))
                    ) : (
                        <p></p>
                    )}
                    <Project
                        key={16}
                        headline={"View all"}
                        image={"/images/deviantart_logo.jpg"}
                        text={"https://www.deviantart.com/valtrox69"}
                        link={"https://www.deviantart.com/valtrox69"}
                    />
                </div>
            </div>
        );
    } catch (error) {
        console.error("[Projects] Failed to fetch RSS feed:", error);
        return (
            <div id="Projects" className="bg-gradient-to-r from-gradientLeft to-gradientRight">
                <p className="text-white">Failed to fetch projects. Please try again later.</p>
            </div>
        );
    }
};

export default Projects;
