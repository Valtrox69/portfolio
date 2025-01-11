"use client";

import React, { useEffect, useState } from "react";
import Project from "@/static/Project";
import { fetchRssImages } from "@/component/utils/fetchRssImages";

// Define the type for a single image object
interface Image {
    title: string;
    link: string;
    thumbnail: string;
    time: string;
}

const Projects: React.FC = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                console.log("[Projects] Fetching RSS feed for client-side rendering...");
                const rssFeedUrl = "https://backend.deviantart.com/rss.xml?q=gallery:valtrox69/87450611"; // Replace with your actual RSS feed URL
                const fetchedImages = await fetchRssImages(rssFeedUrl);
                console.log("[Projects] Images fetched from RSS:", fetchedImages);

                const filteredImages: Image[] = Object.values(
                    fetchedImages.reduce((acc: Record<string, Image>, image: Image) => {
                        if (!acc[image.title] || new Date(image.time) > new Date(acc[image.title].time)) {
                            acc[image.title] = image;
                        }
                        return acc;
                    }, {})
                );

                setImages(filteredImages);
            } catch (err) {
                console.error("[Projects] Failed to fetch RSS feed:", err);
                setError("Failed to fetch projects. Please try again later.");
            }
        };

        fetchImages();
    }, []);

    return (
        <div id="Projects" className="bg-gradient-to-r from-gradientLeft to-gradientRight">
            <img
                className="w-full h-44"
                src="/transitions/transition_grey.svg"
                alt="Grey transition graphic"
            />
            <p className="flex text-4xl my-8 justify-center text-white font-bold">My Gallery</p>
            <div className="flex flex-wrap w-full desktop:px-20 justify-center">
                {error ? (
                    <p className="text-white">{error}</p>
                ) : images && images.length > 0 ? (
                    images.slice(0, 15).map((image, index) => (
                        <Project
                            key={index}
                            headline={image.title}
                            image={image.thumbnail}
                            text={image.link}
                            link={image.link}
                        />
                    ))
                ) : (
                    <p className="text-white">Loading...</p>
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
};

export default Projects;
