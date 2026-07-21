/**
 * MoBendriss — Module de gestion des ressources
 * Rendu, filtrage et gestion des favoris
 */

const ResourceModule = (() => {
    // State
    let currentFilter = { cycle: 'all', type: 'all', search: '', favoritesOnly: false };
    let favorites = new Set();

    // DOM Elements
    const grid = document.getElementById('resource-grid');
    const researchGrid = document.getElementById('research-grid');
    const searchInput = document.getElementById('resource-filter');
    const cycleFilter = document.getElementById('cycle-filter');
    const typeFilter = document.getElementById('type-filter');
    const favFilter = document.getElementById('favorites-filter');
    const countEl = document.getElementById('resource-count');
    const emptyEl = document.getElementById('resource-empty');

    // ── Initialization ────────────────────────────────────────
    function init() {
        loadFavorites();
        bindEvents();
        render();
        renderResearch();
    }

    // ── Load Favorites from localStorage ──────────────────────
    function loadFavorites() {
        try {
            const stored = localStorage.getItem('mb-favorites');
            if (stored) {
                favorites = new Set(JSON.parse(stored));
            }
        } catch (e) {
            favorites = new Set();
        }
    }

    // ── Save Favorites to localStorage ────────────────────────
    function saveFavorites() {
        try {
            localStorage.setItem('mb-favorites', JSON.stringify([...favorites]));
        } catch (e) {}
    }

    // ── Toggle Favorite ───────────────────────────────────────
    function toggleFavorite(id) {
        if (favorites.has(id)) {
            favorites.delete(id);
        } else {
            favorites.add(id);
        }
        saveFavorites();
        render();
    }

    // ── Bind Events ───────────────────────────────────────────
    function bindEvents() {
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                currentFilter.search = e.target.value.toLowerCase().trim();
                render();
            }, 200));
        }

        if (cycleFilter) {
            cycleFilter.addEventListener('change', (e) => {
                currentFilter.cycle = e.target.value;
                render();
            });
        }

        if (typeFilter) {
            typeFilter.addEventListener('change', (e) => {
                currentFilter.type = e.target.value;
                render();
            });
        }

        if (favFilter) {
            favFilter.addEventListener('click', () => {
                currentFilter.favoritesOnly = !currentFilter.favoritesOnly;
                favFilter.classList.toggle('active', currentFilter.favoritesOnly);
                favFilter.querySelector('i').className = currentFilter.favoritesOnly
                    ? 'fa-solid fa-star'
                    : 'fa-regular fa-star';
                render();
            });
        }
    }

    // ── Filter Resources ──────────────────────────────────────
    function filterResources(resources, isResearch = false) {
        return resources.filter(r => {
            // Research tab shows only superieur + recherche type
            if (isResearch) {
                return r.cycle === 'superieur' && r.type === 'recherche';
            }

            // Cycle filter
            if (currentFilter.cycle !== 'all' && r.cycle !== currentFilter.cycle) return false;

            // Type filter
            if (currentFilter.type !== 'all' && r.type !== currentFilter.type) return false;

            // Favorites filter
            if (currentFilter.favoritesOnly && !favorites.has(r.id)) return false;

            // Search filter
            if (currentFilter.search) {
                const lang = document.documentElement.lang || 'fr';
                const searchStr = [
                    r.title,
                    r.titleAr,
                    r.description,
                    r.descAr,
                    r.level,
                    r.levelAr,
                    ...(r.tags || [])
                ].join(' ').toLowerCase();
                return searchStr.includes(currentFilter.search);
            }

            return true;
        });
    }

    // ── Get Current Language ──────────────────────────────────
    function getLang() {
        return document.documentElement.lang || 'fr';
    }

    // ── Get Cycle Label ───────────────────────────────────────
    function getCycleLabel(cycle) {
        const lang = getLang();
        const key = `cycle.${cycle}`;
        return (I18N[lang] && I18N[lang][key]) || cycle;
    }

    // ── Get Type Icon ─────────────────────────────────────────
    function getTypeIcon(type) {
        const icons = {
            cours: 'fa-book-open',
            td: 'fa-pen-to-square',
            exam: 'fa-file-lines',
            recherche: 'fa-flask'
        };
        return icons[type] || 'fa-file';
    }

    // ── Create Resource Card HTML ─────────────────────────────
    function createCardHTML(resource, index) {
        const lang = getLang();
        const isAr = lang === 'ar';
        const title = isAr ? (resource.titleAr || resource.title) : resource.title;
        const desc = isAr ? (resource.descAr || resource.description) : resource.description;
        const level = isAr ? (resource.levelAr || resource.level) : resource.level;
        const isFav = favorites.has(resource.id);
        const i18n = I18N[lang] || I18N.fr;

        return `
            <article class="resource-card" style="animation-delay: ${index * 0.08}s" data-id="${resource.id}">
                <div class="resource-card-header">
                    <div class="resource-type-icon ${resource.type}">
                        <i class="fa-solid ${getTypeIcon(resource.type)}"></i>
                    </div>
                    <button class="resource-fav-btn ${isFav ? 'active' : ''}"
                            onclick="ResourceModule.toggleFavorite('${resource.id}')"
                            aria-label="${isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}">
                        <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-star"></i>
                    </button>
                </div>
                <h3>${escapeHTML(title)}</h3>
                <p>${escapeHTML(desc)}</p>
                <div class="resource-meta">
                    <span class="resource-badge cycle">${getCycleLabel(resource.cycle)}</span>
                    <span class="resource-badge type">${level}</span>
                </div>
                <div class="resource-card-actions">
                    <a href="${resource.downloadUrl || '#'}" class="resource-btn primary" target="_blank" rel="noopener">
                        <i class="fa-solid fa-download"></i> ${i18n['resource.download']}
                    </a>
                    <a href="${resource.previewUrl || '#'}" class="resource-btn secondary" target="_blank" rel="noopener">
                        <i class="fa-solid fa-eye"></i> ${i18n['resource.preview']}
                    </a>
                </div>
            </article>
        `;
    }

    // ── Render Main Grid ──────────────────────────────────────
    function render() {
        if (!grid) return;

        const filtered = filterResources(RESOURCES);
        const lang = getLang();
        const i18n = I18N[lang] || I18N.fr;

        // Update count
        if (countEl) {
            countEl.textContent = i18n['resource.count'].replace('{count}', filtered.length);
        }

        // Render cards
        if (filtered.length === 0) {
            grid.innerHTML = '';
            if (emptyEl) emptyEl.hidden = false;
        } else {
            if (emptyEl) emptyEl.hidden = true;
            grid.innerHTML = filtered.map((r, i) => createCardHTML(r, i)).join('');
        }

        // Announce to screen readers
        const announcer = document.getElementById('tab-announcer');
        if (announcer) {
            announcer.textContent = `${filtered.length} ${lang === 'ar' ? 'موارد' : 'ressources'}`;
        }
    }

    // ── Render Research Grid ──────────────────────────────────
    function renderResearch() {
        if (!researchGrid) return;

        const research = filterResources(RESOURCES, true);
        if (research.length === 0) {
            researchGrid.innerHTML = `<p class="empty-note">${getLang() === 'ar' ? 'لا توجد موارد بحثية بعد.' : 'Aucune ressource de recherche pour le moment.'}</p>`;
        } else {
            researchGrid.innerHTML = research.map((r, i) => createCardHTML(r, i)).join('');
        }
    }

    // ── Utility: Escape HTML ──────────────────────────────────
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ── Utility: Debounce ─────────────────────────────────────
    function debounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // Public API
    return {
        init,
        render,
        renderResearch,
        toggleFavorite
    };
})();
