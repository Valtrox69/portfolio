function Project ({ headline, image, text, link }: { headline: string, image: string, text: string, link: string }) {
    return (
        <a href={link} aria-label={text}>
            <div
                className="flex flex-col transition-all hover:scale-105 scale-100 bg-opacity-20 bg-black rounded-lg max-h-max max-w-80 m-3 text-white">
                <div className="w-full aspect-[3/2] overflow-hidden rounded-t-lg">
                    <img
                        className="w-full h-full object-cover object-top"
                        alt={text}
                        src={image}
                    />
                </div>
                <div className="p-4">
                    <div className="text-l text-center font-medium mb-4">{headline}</div>
                </div>
            </div>
        </a>

    );
}

export default Project;