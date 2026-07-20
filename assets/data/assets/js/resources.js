(function () {
    "use strict";

    var resources = window.MB_RESOURCES || [];

    var state = {
        query: "",
        cycle: "all",
        type: "all",
        favoritesOnly: false
    };

    var favoriteKey = "mb-favorites";

    function getFavorites() {
        try {
            return JSON.parse(localStorage.getItem(favoriteKey) || "[]");
        } catch (e) {
            return [];
        }
    }

    function saveFavorites(items) {
        try {
            localStorage.setItem(favoriteKey, JSON.stringify(items));
        } catch (e) {}
    }

    function currentLanguage() {
        return document.documentElement.getAttribute("lang") === "ar" ? "ar" : "fr";
    }

    function localized(value) {
        if (!value) return "";
        if (typeof value === "string") return value;
        var lang = currentLanguage();
        return value[lang] || value.fr || value.ar || "";
    }

    function normalize(value) {
        return String(value || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    function typeLabel(type) {
        var lang = currentLanguage();
        var map = {
            cours:     { fr: "COURS", ar: "درس" },
            td:        { fr: "TD", ar: "تمارين" },
            exam:      { fr: "EXAM", ar: "امتحان" },
            recherche: { fr: "RESEARCH", ar: "بحث" }
        };
        return (map[type] || { fr: type, ar: type })[lang];
    }

    function makeElement(tag, className, text) {
        var el = document.createElement(tag);
        if (className) el.className = className;
        if (text !== undefined) el.textContent = text;
        return el;
    }

    function getFilteredResources() {
        var query = normalize(state.query);
        var favorites = getFavorites();

        return resources.filter(function (r) {
            var text = normalize([
                localized(r.title),
                localized(r.description),
                r.level,
                r.type
            ].concat(r.topics || []).join(" "));

            var matchesQuery = !query || text.indexOf(query) !== -1;
            var matchesCycle = state.cycle === "all" || r.cycle === state.cycle;
            var matchesType = state.type === "all" || r.type === state.type;
            var matchesFav = !state.favoritesOnly || favorites.indexOf(r.id) !== -1;

            return matchesQuery && matchesCycle && matchesType && matchesFav;
        });
    }

    function renderResources() {
        var grid = document.getElementById("resource-grid");
        var empty = document.getElementById("resource-empty");
        var count = document.getElementById("resource-count");
        if (!grid) return;

        var items = getFilteredResources();
        var favorites = getFavorites();
        var lang = currentLanguage();

        grid.replaceChildren();

        items.forEach(function (r) {
            var card = makeElement("article", "resource-item resource-card type-" + r.type);
            var body = makeElement("div", "resource-card-body");
            var header = makeElement("div", "resource-card-header");

            var tag = makeElement("span", "resource-tag", typeLabel(r.type));

            var favorite = makeElement("button", "favorite-button");
            var isFav = favorites.indexOf(r.id) !== -1;
            favorite.type = "button";
            favorite.setAttribute("aria-pressed", String(isFav));
            favorite.setAttribute("aria-label",
                lang === "ar" ? "إضافة إلى المفضلة" : "Ajouter aux favoris");
            favorite.appendChild(makeElement("i", isFav ? "fa-solid fa-star" : "fa-regular fa-star"));

            favorite.addEventListener("click", function () {
                var current = getFavorites();
                var index = current.indexOf(r.id);
                if (index === -1) current.push(r.id);
                else current.splice(index, 1);
                saveFavorites(current);
                renderResources();
            });

            header.appendChild(tag);
            header.appendChild(favorite);

            var title = makeElement("h3", "resource-card-title", localized(r.title));
            var desc = makeElement("p", "resource-card-description", localized(r.description));

            var footer = makeElement("div", "resource-card-footer");
            var meta = makeElement("span", "resource-metadata", r.level);

            var download = makeElement("a", "resource-download");
            download.href = r.file;
            download.setAttribute("download", "");
            download.innerHTML =
                '<i class="fa-solid fa-arrow-down"></i><span>' +
                (lang === "ar" ? "تحميل" : "Télécharger") + "</span>";

            footer.appendChild(meta);
            footer.appendChild(download);

            body.appendChild(header);
            body.appendChild(title);
            body.appendChild(desc);
            body.appendChild(footer);
            card.appendChild(body);
            grid.appendChild(card);
        });

        if (count) {
            count.textContent = lang === "ar"
                ? items.length + " مورد متاح"
                : items.length + " ressource(s) disponible(s)";
        }

        if (empty) empty.hidden = items.length !== 0;

        typesetMath(grid);
    }

    function typesetMath(root) {
        if (!root || !window.MathJax || typeof MathJax.typesetPromise !== "function") return;
        try {
            if (typeof MathJax.typesetClear === "function") MathJax.typesetClear([root]);
            MathJax.typesetPromise([root]).catch(function () {});
        } catch (e) {}
    }

    function bind(id, event, handler) {
        var el = document.getElementById(id);
        if (el) el.addEventListener(event, handler);
    }

    bind("resource-filter", "input", function (e) {
        state.query = e.target.value;
        renderResources();
    });

    bind("cycle-filter", "change", function (e) {
        state.cycle = e.target.value;
        renderResources();
    });

    bind("type-filter", "change", function (e) {
        state.type = e.target.value;
        renderResources();
    });

    bind("favorites-filter", "click", function () {
        state.favoritesOnly = !state.favoritesOnly;
        this.classList.toggle("is-active", state.favoritesOnly);
        renderResources();
    });

    var globalSearch = document.getElementById("site-search");
    if (globalSearch) {
        globalSearch.addEventListener("input", function () {
            state.query = globalSearch.value;
            var filter = document.getElementById("resource-filter");
            if (filter) filter.value = state.query;
            if (state.query.trim() && typeof switchTab === "function") {
                switchTab("mathematiques", { updateHash: false, scrollTop: false });
            }
            renderResources();
        });
    }

    document.addEventListener("mb:language-changed", renderResources);

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", renderResources);
    } else {
        renderResources();
    }

    window.MBRenderResources = renderResources;
})();
