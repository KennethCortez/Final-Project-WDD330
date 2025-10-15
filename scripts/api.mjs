export async function loadDictionary(language) {
    const response = await fetch(`../data/${language}.json`);
    const data = await response.json();
    return data.entries;
}

export function parseDictionaryEntries(entries) {
    return entries.map(entry => ({
        term: entry.name,
        definition: entry.summary || "No description available.",
        syntax: entry.type || "Unknown type",
        example: "No example available yet.",
        source: `https://developer.mozilla.org/en-US/docs/${entry.path}`
    }));
}