import { greetings, searchElements, renderEntry } from "./utils.mjs";
import { loadDictionary } from "./api.mjs";

document.addEventListener('DOMContentLoaded', async () => {
    // load and parse the dictionary data
    const dictionary = await loadDictionary('javascript');
    
    greetings(() => {
        searchElements(dictionary, renderEntry);
    });
});


