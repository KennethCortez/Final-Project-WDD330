import { greetings } from "./utils.mjs";
import { loadDictionary, parseDictionaryEntries } from "./api.mjs";

document.addEventListener('DOMContentLoaded', async () => {
    greetings();
});

async function init() {
    const jsData = await loadDictionary('javascript');
    const dictionary = parseDictionaryEntries(jsData);
    console.log(dictionary.slice(0, 5)); // look at the first 5 entries
}

init();