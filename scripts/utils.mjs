import { loadDictionary, getAdviceSlip } from "./api.mjs";
import { GIPHY_API_KEY } from "./config.mjs";

export function searchElements(dictionary, renderEntry) {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    if (!searchInput || !searchButton) return;

    // clean event listeners
    const newInput = searchInput.cloneNode(true);
    searchInput.parentNode.replaceChild(newInput, searchInput);

    const newButton = searchButton.cloneNode(true);
    searchButton.parentNode.replaceChild(newButton, searchButton);

    function executeSearch() {
        const query = newInput.value.trim().toLowerCase();
        if (!query) {
            renderEntry([]);
            return;
        }

        const results = dictionary.filter(entry =>
            entry.term.toLowerCase().includes(query)
        );

        if (results.length > 0) {
            renderEntry([results[0]]);
        } else {
            renderEntry([]);
        }
    }

    newButton.addEventListener("click", executeSearch);
    newInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") executeSearch();
    });
}



export function greetings(onCloseCallback) {
    const modal = document.getElementById("welcome-container");
    const greetings = document.getElementById("closeModal");
    const searchSection = document.getElementById("search-container");

    greetings.addEventListener("click", () => {
    modal.classList.add("hidden");
    setTimeout(() => {
    modal.style.display = "none";

    searchSection.style.display = "block";

    if(typeof onCloseCallback === "function") {
        onCloseCallback();
    }
    }, 500);

});
}

// Function to render dictionary entries to the DOM
export async function renderEntry(entries) {
    const container = document.getElementById("results");
    if (!container) return;

    container.innerHTML = "";

    if (entries.length === 0) {
        container.innerHTML = '<p class="noResults">No results found.</p>';
        return;
    }

    const entry = entries[0]; // only the first match

    const div = document.createElement("div");
    div.classList.add("entry");
    div.innerHTML = `
        <h3>${entry.term}</h3>
        <p>${entry.definition}</p>  
        <div class="syntax-block">
            <pre><code>${entry.syntax}</code></pre>
            <button class="copy-btn">Copy</button>
        </div>
        <p><strong>Example:</strong></p>
        <pre><code>${entry.example}</code></pre>
        <a href="${entry.source}" target="_blank" class="source-link">View more</a>
        <div class="gif-container"><img src="" alt="GIF related to difficulty" /></div>
        <p class="advice-text"></p>
    `;
    container.appendChild(div);

    // copy to clipboard functionality
    const copyBtn = div.querySelector(".copy-btn");
    copyBtn.addEventListener("click", () => copyToClipboard(entry.syntax));

    
    const gifImg = div.querySelector(".gif-container img");
    const difficulty = entry.difficulty.toLowerCase(); // easy, medium, hard

    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${difficulty}&limit=5`);
        const data = await response.json();
        const gifs = data.data;

        if (gifs.length > 0) {
            const randomIndex = Math.floor(Math.random() * gifs.length);
            gifImg.src = gifs[randomIndex].images.fixed_height.url;
        }
    } catch (error) {
        console.error("Failed to load GIF:", error);
    }

    // obtain and display advice
    const adviceText = div.querySelector(".advice-text");
    const advice = await getAdviceSlip();
    adviceText.textContent = `Hey!: ${advice}`;

}


export function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .catch(err => {
        console.error("Could not copy text: ", err);
        });
}

export function toggleTheme() {
    const body = document.body;
    body.classList.toggle("light-mode");

    // save in localStorage
    if (body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
}


export function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }
}

export function languageFilter() {
    const buttons = document.querySelectorAll(".lang-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", async () => {
        const selectedLang = btn.dataset.lang;

        
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const data = await loadDictionary(selectedLang);
        console.log(`Loaded ${selectedLang} dictionary`, data);

        searchElements(data, renderEntry);
        });
    });
}

