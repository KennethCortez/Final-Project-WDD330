
export function searchElements(dictionary, renderEntry) {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    if (!searchInput || !searchButton) return;

    function executeSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (!query) {
            renderEntry([]);
            return;
        }

        const results = dictionary.filter(entry =>
            entry.term.toLowerCase().includes(query)
        );

        if (results.length > 0){
            renderEntry([results[0]]);
        }else {
            renderEntry([]);
        }
    }

    // execute search on button click
    searchButton.addEventListener("click", executeSearch);

    // execute search on Enter key press
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
        executeSearch();
        }
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
export function renderEntry(entries) {
    const container = document.getElementById("results");
    if (!container) return;

    container.innerHTML = "";

    if (entries.length === 0) {
        container.innerHTML = '<p class="noResults">No results found.</p>';
        return;
    }

    const entry = entries[0]; // Show only the first exact match


    const div = document.createElement("div");
    div.classList.add("entry");
    div.innerHTML = `
    <h3>${entry.term}</h3>
    <p>${entry.definition}</p>
    <pre><code>${entry.syntax}</code></pre>
    <p><strong>Example:</strong></p>
    <pre><code>${entry.example}</code></pre>
    <a href="${entry.source}" target="_blank" class="source-link">View more</a>
    `;
    container.appendChild(div);
}


