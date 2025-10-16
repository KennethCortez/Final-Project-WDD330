import { greetings, searchElements, renderEntry, toggleTheme, languageFilter} from "./utils.mjs";
import { loadDictionary } from "./api.mjs";

document.addEventListener('DOMContentLoaded', async () => {
    // restore theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") document.body.classList.add("light-mode");

    // restore language and load dictionary
    const lastLang = localStorage.getItem("lastLang") || "javascript";
    const dictionary = await loadDictionary(lastLang);

    // mark the active language button
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === lastLang);
    });

    // restore last search query
    const lastQuery = localStorage.getItem("lastQuery") || "";
    const searchInput = document.getElementById("searchInput");
    searchInput.value = lastQuery;

    // initialize greetings and perform search if needed
    greetings(() => {
        searchElements(dictionary, renderEntry);

        
        if (lastQuery) {
            document.getElementById("searchButton").click();
        }
    });

    languageFilter();

    const btn = document.getElementById("themeToggle");
    btn.addEventListener("click", toggleTheme);
});
