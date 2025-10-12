
const modal = document.getElementById("welcome-container");
const closeBtn = document.getElementById("closeModal");

closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    setTimeout(() => {
    modal.style.display = "none";
    }, 500);
});

