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