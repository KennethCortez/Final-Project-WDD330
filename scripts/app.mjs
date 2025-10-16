import { greetings, searchElements, renderEntry, toggleTheme, loadTheme, languageFilter} from "./utils.mjs";
import { loadDictionary } from "./api.mjs";

document.addEventListener('DOMContentLoaded', async () => {
    // load and parse the dictionary data
    const dictionary = await loadDictionary('javascript');
    
    greetings(() => {
        searchElements(dictionary, renderEntry);
    });

    languageFilter();

});


document.addEventListener("DOMContentLoaded", () => {
    
    loadTheme();

    
    const btn = document.getElementById("themeToggle");
    btn.addEventListener("click", toggleTheme);
});
