(function () {
    "use strict";

    var state = {
        query: "",
        cycle: "all",
        type: "all",
        favoritesOnly: false,
        allResources: [],
        loaded: false,
        error: false
    };

    var FAV_KEY = "mb-favorites";

    function lang() {
        return document.documentElement.getAttribute("lang") === "ar" ? "ar" : "fr";
    }

    function getFavs() {
        try { return JSON.parse(localStorage.getItem(FAV_KEY) || "[]"); } catch (e) { return []; }
    }

    function saveFavs(list) {
        try { localStorage.setItem(FAV_KEY, JSON.stringify(list)); } catch (e) {}
    }

    function normalize(str) {
        return String(str || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    }

    function escapeHtml(str) {
        return String(str || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function formatDate(str, l) {
        try {
            var d = new Date(str);
            if (isNaN(d.getTime())) return str;
            return d.toLocaleDateString(l === "ar" ? "ar-MA" : "fr-FR", {
                year: "numeric", month: "short", day: "numeric"
            });
        } catch (e) { return str; }
    }

    function typeLabel(type, l) {
        var map = {
            cours:     { fr: "COURS",    ar: "درس" },
            td:        { fr: "TD",       ar: "تمارين" },
            exam:      { fr: "EXAM",     ar: "امتحان" },
            recherche: { fr: "RESEARCH", ar: "بحث" }
        };
        return (map[type] || { fr: type, ar: type })[l];
    }

    function getFiltered() {
        var q = normalize(state.query);
        var favs = getFavs();
        var l = lang();

        return state.allResources.filter(function (r) {
            var titleKey = l === "ar" ? "title_ar" : "title_fr";
            var descKey  = l === "ar" ? "description_ar" : "description_fr";
            var text = normalize([r[titleKey], r[descKey], r.level, r.type, r.topics].join(" "));

            var mQ = !q || text.indexOf(q) !== -1;
            var mC = state.cycle === "all" || r.cycle === state.cycle;
            var mT = state.type  === "all" || r.type  === state.type;
            var mF = !state.favoritesOnly || favs.indexOf(r.id) !== -1;

            return mQ && mC && mT && mF;
        });
    }

    function showSkeleton() {
        var grid = document.getElementById("resource-grid");
        if (!grid) return;
        var html = "";
        for (var i = 0; i < 3; i++) {
            html += '<div class="skeleton-card">'
                + '<div class="skeleton-line short"></div>'
                + '<div class="skeleton-line long"></div>'
                + '<div class="skeleton-line medium"></div>'
                + '<div class="skeleton-footer">'
                + '<div class="skeleton-line mini"></div>'
                + '<div class="skeleton-btn"></div>'
                + '</div></div>';
        }
        grid.innerHTML = html;
    }

    function toggleFav(id, card) {
        var favs = getFavs();
        var idx  = favs.indexOf(id);
        if (idx === -1) favs.push(id);
        else favs.splice(idx, 1);
        saveFavs(favs);

        var isFav = favs.indexOf(id) !== -1;
        var btn  = card.querySelector(".favorite-button");
        var icon = card.querySelector(".favorite-button i");
        if (btn)  btn.setAttribute("aria-pressed", String(isFav));
        if (icon) icon.className = isFav ? "fa-solid fa-star" : "fa-regular fa-star";
    }

    function buildCard(r) {
        var l       = lang();
        var favs    = getFavs();
        var isFav   = favs.indexOf(r.id) !== -1;
        var titleKey = l === "ar" ? "title_ar"       : "title_fr";
        var descKey  = l === "ar" ? "description_ar" : "description_fr";
        var title   = r[titleKey] || r.title_fr || r.id;
        var desc    = r[descKey]  || r.description_fr || "";
        var dlLabel = l === "ar" ? "تحميل" : "Telecharger";
        var favLbl  = l === "ar" ? "إضافة للمفضلة" : "Ajouter aux favoris";
        var dateTxt = r.updated ? formatDate(r.updated, l) : "";

        var card = document.createElement("article");
        card.className = "resource-card type-" + (r.type || "cours");
        card.setAttribute("data-id", r.id);

        card.innerHTML =
            '<div class="resource-card-body">'
          +   '<div class="resource-card-header">'
          +     '<span class="resource-tag">' + typeLabel(r.type, l) + '</span>'
          +     '<button class="favorite-button" type="button"'
          +       ' aria-pressed="' + isFav + '"'
          +       ' aria-label="' + favLbl + '">'
          +       '<i class="' + (isFav ? "fa-solid" : "fa-regular") + ' fa-star"></i>'
          +     '</button>'
          +   '</div>'
          +   '<h3 class="resource-card-title">' + escapeHtml(title) + '</h3>'
          +   '<p class="resource-card-description">' + escapeHtml(desc) + '</p>'
          +   '<div class="resource-card-footer">'
          +     '<div class="resource-meta-group">'
          +       '<span class="resource-metadata">' + escapeHtml(r.level) + '</span>'
          +       (dateTxt
              ? '<span class="resource-date"><i class="fa-regular fa-calendar"></i> ' + escapeHtml(dateTxt) + '</span>'
              : '')
          +     '</div>'
          +     '<a class="resource-download"'
          +       ' href="' + escapeHtml(r.file || "#") + '"'
          +       ' download'
          +       ' aria-label="' + dlLabel + ' — ' + escapeHtml(title) + '">'
          +       '<i class="fa-solid fa-arrow-down"></i>'
          +       '<span>' + dlLabel + '</span>'
          +     '</a>'
          +   '</div>'
          + '</div>';

        card.querySelector(".favorite-button").addEventListener("click", function () {
            toggleFav(r.id, card);
        });

        return card;
    }

    function render() {
        var grid    = document.getElementById("resource-grid");
        var emptyEl = document.getElementById("resource-empty");
        var countEl = document.getElementById("resource-count");
        if (!grid) return;

        var items = getFiltered();
        var l     = lang();
        var cfg   = window.MB_CONFIG || {};

        grid.replaceChildren();

        if (state.error) {
            var div = document.createElement("div");
            div.className = "error-banner";
            div.innerHTML =
                '<i class="fa-solid fa-triangle-exclamation"></i>'
              + '<span>' + (l === "ar" ? (cfg.ERROR_AR || "") : (cfg.ERROR_FR || "")) + '</span>'
              + '<button class="retry-btn" type="button">'
              + (l === "ar" ? "إعادة المحاولة" : "Reessayer")
              + '</button>';
            div.querySelector(".retry-btn").addEventListener("click", function () {
                initLoad(true);
            });
            grid.appendChild(div);
            if (emptyEl) emptyEl.hidden = true;
            return;
        }

        items.forEach(function (r) {
            grid.appendChild(buildCard(r));
        });

        if (countEl) {
            countEl.textContent = l === "ar"
                ? items.length + " مورد متاح"
                : items.length + " ressource(s)";
        }

        if (emptyEl) {
            emptyEl.hidden = items.length > 0;
            if (items.length === 0) {
                emptyEl.textContent = l === "ar"
                    ? (cfg.EMPTY_AR || "")
                    : (cfg.EMPTY_FR || "");
            }
        }

        typesetMath(grid);
    }

    function typesetMath(root) {
        if (!root || !window.MathJax) return;
        if (typeof MathJax.typesetPromise !== "function") return;
        try {
            if (typeof MathJax.typesetClear === "function") MathJax.typesetClear([root]);
            MathJax.typesetPromise([root]).catch(function () {});
        } catch (e) {}
    }

    function parseCSV(text) {
        var lines = text.trim().split("\n");
        if (lines.length < 2) return [];
        var headers = lines[0].split(",").map(function (h) {
            return h.trim().replace(/^"|"$/g, "");
        });
        var out = [];
        for (var i = 1; i < lines.length; i++) {
            var vals = splitLine(lines[i]);
            if (vals.length < 3) continue;
            var obj = {};
            headers.forEach(function (h, k) {
                obj[h] = (vals[k] || "").trim().replace(/^"|"$/g, "");
            });
            if (obj.id && obj.level) out.push(obj);
        }
        return out;
    }

    function splitLine(line) {
        var res = [], cur = "", inQ = false;
        for (var i = 0; i < line.length; i++) {
            var c = line[i];
            if (c === '"') { inQ = !inQ; }
            else if (c === "," && !inQ) { res.push(cur); cur = ""; }
            else { cur += c; }
        }
        res.push(cur);
        return res;
    }

    function initLoad(force) {
        var url = (window.MB_CONFIG || {}).SHEET_URL || "";
        var hasURL = url && url.indexOf("XXXXXXXXXX") === -1 && url.length > 10;

        if (!hasURL || (!force && state.loaded)) {
            if (!hasURL) {
                state.allResources = window.MB_FALLBACK || [];
                state.loaded = true;
                state.error  = false;
                render();
            } else {
                render();
            }
            return;
        }

        showSkeleton();

        fetch(url)
            .then(function (res) {
                if (!res.ok) throw new Error("HTTP " + res.status);
                return res.text();
            })
            .then(function (csv) {
                var data = parseCSV(csv);
                state.allResources = data.length > 0 ? data : (window.MB_FALLBACK || []);
                state.loaded = true;
                state.error  = false;
                render();
            })
            .catch(function () {
                state.allResources = window.MB_FALLBACK || [];
                state.loaded = true;
                state.error  = true;
                render();
            });
    }

    function bindFilters() {
        function on(id, ev, fn) {
            var el = document.getElementById(id);
            if (el) el.addEventListener(ev, fn);
        }

        on("resource-filter", "input", function (e) {
            state.query = e.target.value;
            render();
        });

        on("cycle-filter", "change", function (e) {
            state.cycle = e.target.value;
            render();
        });

        on("type-filter", "change", function (e) {
            state.type = e.target.value;
            render();
        });

        on("favorites-filter", "click", function () {
            state.favoritesOnly = !state.favoritesOnly;
            this.classList.toggle("is-active", state.favoritesOnly);
            render();
        });
    }

    document.addEventListener("mb:language-changed", function () { render(); });

    function start() {
        bindFilters();
        state.allResources = window.MB_FALLBACK || [];
        state.loaded = true;
        render();
        initLoad(false);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start);
    } else {
        start();
    }

    window.MBRenderResources = function (force) { initLoad(!!force); };
})();
