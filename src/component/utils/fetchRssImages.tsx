import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export const fetchRssImages = async (rssFeedUrl: string): Promise<{ title: string; link: string; thumbnail: string; time: string }[]> => {
    try {
        console.log("Fetching RSS feed from URL:", rssFeedUrl);
        // Fetch the RSS feed with axios
        const response = await axios.get(rssFeedUrl);
        console.log("RSS feed fetched successfully.");

        // Parse the XML feed using rss-parser
        const feed = await parseStringPromise(response.data, {
            explicitArray: false, // Avoid wrapping single elements in arrays
            mergeAttrs: true,    // Merge attributes with the tag's data
        });
        console.log("RSS feed parsed"); // Log the parsed feed

        // Assuming the RSS is structured under a <rss> root with <channel>
        const items = feed.rss.channel.item;

        // Ensure items are an array (could be a single object if only one item exists)
        const itemsArray = Array.isArray(items) ? items : [items];
        console.log("RSS feed items:"); // Log the items

        // Extract image data from the feed
        const images: { title: string; link: string; thumbnail: string; time: string}[] = [];

        itemsArray.forEach((item) => {

            // Extract media thumbnail URL
            let thumbnailUrl = '';
            if (item['media:thumbnail']) {
                const mediaThumbnails = Array.isArray(item['media:thumbnail'])
                    ? item['media:thumbnail']
                    : [item['media:thumbnail']];

                // Use the first thumbnail as the URL
                if (mediaThumbnails.length > 0 && mediaThumbnails[0].url) {
                    thumbnailUrl = mediaThumbnails[1].url;
                }
            }

            // Add the extracted data to the images array
            images.push({
                title: item.title || 'No Title',
                link: item.link || 'No Link',
                thumbnail: thumbnailUrl || 'No Thumbnail',
                time: item.pubDate || 'No Time',
            });
        });

        return images;
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return [];
    }
};
