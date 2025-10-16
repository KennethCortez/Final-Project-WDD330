import { GIPHY_API_KEY } from "./config.mjs";

// loads the dictionary JSON file
export async function loadDictionary(language) {
    try {
        const response = await fetch(`../data/${language}.json`);
        if (!response.ok) {
        throw new Error(`Error loading ${language}.json`);
        }

        const data = await response.json();

        // check if data structure is as expected
        if (!data.entries || !Array.isArray(data.entries)) {
        throw new Error("Invalid dictionary format: 'entries' not found or not an array.");
        }

        return data.entries; // ← return the entries array
    } 
    
    catch (error) {
        console.error("Failed to load dictionary:", error);
        return [];
    }
}

export async function getGifByDifficulty(difficulty) {
    try {
        const query = `${difficulty} difficulty coding`;
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=1&rating=g`;

        const response = await fetch(url);
        const data = await response.json();
        if (data.data.length === 0) return null;

        const gif = data.data[0];
        return {
            title: gif.title,
            url: gif.images.fixed_height.url,
            category: "difficulty",
            difficultyLevel: difficulty,
            id: gif.id,
            source: `https://giphy.com/gifs/${gif.id}`
        };
    } catch (err) {
        console.error("Failed to fetch GIF:", err);
        return null;
    }
}


export async function getAdviceSlip() {
    try {
        const response = await fetch("https://api.adviceslip.com/advice");
        const data = await response.json();
        return data.slip.advice;
    } catch (error) {
        console.error("Failed to load advice:", error);
        return "No advice available right now.";
    }
}





// export function parseDictionaryEntries(entries) {
//     return entries.map(entry => ({
//         term: entry.name,
//         definition: entry.type || "No description available.",
//         syntax: entry.type || "Unknown type",
//         example: "No example available yet.",
//         source: `https://developer.mozilla.org/en-US/docs/${entry.path}`
//     }));
// }

// I changed the structure of the JSON file to match the data I have, so I updated this function accordingly. The first
//version was from DevDocs documentation.