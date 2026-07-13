document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("#search-input");
    const genreSelect = document.querySelector("#genre-select");
    const availabilityCheckbox = document.querySelector("#availability-checkbox");
    const sortYearButton = document.querySelector("#sort-year-button");
    const catalogList = document.querySelector("#catalog-list");
    const resultsCount = document.querySelector("#results-count");
    const bookCards = Array.from(catalogList.querySelectorAll(".book-card"));

    function applyFilters() {
        const query = searchInput.value.trim().toLowerCase();
        const selectedGenre = genreSelect.value;
        const onlyAvailable = availabilityCheckbox.checked;

        let visibleCount = 0;

        bookCards.forEach((card) => {
            const title = card.dataset.title.toLowerCase();
            const author = card.dataset.author.toLowerCase();
            const genre = card.dataset.genre;
            const available = card.dataset.available === "true";

            const matchesText =
                !query || title.includes(query) || author.includes(query);
            const matchesGenre =
                selectedGenre === "all" || genre === selectedGenre;
            const matchesAvailability = !onlyAvailable || available;

            const isVisible = matchesText && matchesGenre && matchesAvailability;

            if (isVisible) {
                card.classList.remove("book-card--hidden");
                visibleCount += 1;
            } else {
                card.classList.add("book-card--hidden");
            }
        });

        resultsCount.textContent = visibleCount.toString();
    }

    function sortByYear() {
        const currentDirection = sortYearButton.dataset.sortDirection || "asc";
        const newDirection = currentDirection === "asc" ? "desc" : "asc";

        const sortedCards = [...bookCards].sort((a, b) => {
            const yearA = parseInt(a.dataset.year, 10);
            const yearB = parseInt(b.dataset.year, 10);

            if (newDirection === "asc") {
                return yearA - yearB;
            }
            return yearB - yearA;
        });

        sortedCards.forEach((card) => catalogList.appendChild(card));

        sortYearButton.dataset.sortDirection = newDirection;
        sortYearButton.textContent =
            newDirection === "asc" ? "Sort by year ↑" : "Sort by year ↓";

        applyFilters();
    }

    function setupDetailsToggle() {
        catalogList.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) return;

            if (target.classList.contains("book-card__toggle-details")) {
                const card = target.closest(".book-card");
                if (!card) return;

                const details = card.querySelector(".book-card__details");
                if (!details) return;

                const isHidden = details.hasAttribute("hidden");

                if (isHidden) {
                    details.removeAttribute("hidden");
                    target.textContent = "Hide details";
                } else {
                    details.setAttribute("hidden", "");
                    target.textContent = "More details";
                }
            }
        });
    }

    searchInput.addEventListener("input", applyFilters);
    genreSelect.addEventListener("change", applyFilters);
    availabilityCheckbox.addEventListener("change", applyFilters);
    sortYearButton.addEventListener("click", sortByYear);

    setupDetailsToggle();
    applyFilters();
});
