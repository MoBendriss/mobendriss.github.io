// MoBendriss Academy — Resource Logic Module
// Gestion des ressources : filtrage, recherche, pagination, favoris

const RESOURCES_MODULE = (() => {
  const ITEMS_PER_PAGE = 8;

  // ─── State ───
  let resources = window.MB_RESOURCES || [];
  let filtered = [...resources];
  let currentPage = 1;
  let favorites = JSON.parse(localStorage.getItem('mb-favorites') || '[]');
  let lang = localStorage.getItem('mb-lang') || 'fr';
  let searchQuery = '';
  let cycleFilter = 'all';
  let typeFilter = 'all';
  let categoryFilter = 'all';
  let sortMode = 'newest';
  let favoritesFilter = false;
  let onUpdate = null;

  // ─── Categories ───
  function getCategories() {
    const cats = new Set(resources.filter(r => r.category).map(r => r.category));
    return Array.from(cats).sort();
  }

  // ─── Filter ───
  function filter() {
    let f = [...resources];
    if (cycleFilter !== 'all') f = f.filter(r => r.cycle === cycleFilter);
    if (typeFilter !== 'all') f = f.filter(r => r.type === typeFilter);
    if (categoryFilter !== 'all') f = f.filter(r => r.category === categoryFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      f = f.filter(r => {
        const title = lang === 'ar' && r.titleAr ? r.titleAr : r.title;
        const desc = lang === 'ar' && r.descriptionAr ? r.descriptionAr : r.description;
        return title.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
      });
    }
    if (favoritesFilter) f = f.filter(r => favorites.includes(r.id));
    if (sortMode === 'popular') f.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
    else f.sort((a, b) => b.id - a.id);
    filtered = f;
    if (currentPage > getTotalPages()) currentPage = 1;
    return getPage();
  }

  // ─── Pagination ───
  function getTotalPages() { return Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)); }
  function getPage() {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }
  function setPage(p) { currentPage = p; if (onUpdate) onUpdate(); }

  // ─── Favorites ───
  function toggleFav(id) {
    const idx = favorites.indexOf(id);
    if (idx > -1) favorites.splice(idx, 1);
    else favorites.push(id);
    localStorage.setItem('mb-favorites', JSON.stringify(favorites));
    if (onUpdate) onUpdate();
    return idx === -1; // true = added
  }
  function isFav(id) { return favorites.includes(id); }

  // ─── Stats ───
  function getTotalDownloads() { return resources.reduce((s, r) => s + (r.downloads || 0), 0); }
  function getFeaturedCount() { return resources.filter(r => r.featured).length; }

  // ─── Setters ───
  function setSearch(q) { searchQuery = q; currentPage = 1; }
  function setCycle(c) { cycleFilter = c; currentPage = 1; }
  function setType(t) { typeFilter = t; currentPage = 1; }
  function setCategory(c) { categoryFilter = c; currentPage = 1; }
  function setSort(s) { sortMode = s; currentPage = 1; }
  function setFavFilter(v) { favoritesFilter = v; currentPage = 1; }
  function setLang(l) { lang = l; }
  function getSearch() { return searchQuery; }
  function getCycle() { return cycleFilter; }
  function getType() { return typeFilter; }
  function getCategory() { return categoryFilter; }
  function getSort() { return sortMode; }
  function getFavFilter() { return favoritesFilter; }
  function getCurrentPage() { return currentPage; }
  function getTotalCount() { return filtered.length; }
  function getTotalPagesCount() { return getTotalPages(); }
  function getAll() { return resources; }
  function getFiltered() { return filtered; }
  function getLang() { return lang; }
  function resetFilters() { searchQuery = ''; cycleFilter = 'all'; typeFilter = 'all'; categoryFilter = 'all'; favoritesFilter = false; currentPage = 1; }
  function hasActiveFilters() { return searchQuery || cycleFilter !== 'all' || typeFilter !== 'all' || categoryFilter !== 'all' || favoritesFilter; }
  function setOnUpdate(fn) { onUpdate = fn; }

  // ─── Research (superieur only) ───
  function getResearchResources() { return resources.filter(r => r.cycle === 'superieur'); }

  return {
    filter, getPage, setPage, getTotalPages, getTotalPagesCount,
    toggleFav, isFav, getTotalCount, getCurrentPage,
    setSearch, setCycle, setType, setCategory, setSort, setFavFilter, setLang,
    getSearch, getCycle, getType, getCategory, getSort, getFavFilter, getLang,
    getCategories, getAll, getFiltered, getTotalDownloads, getFeaturedCount,
    getResearchResources,
    resetFilters, hasActiveFilters, setOnUpdate,
    ITEMS_PER_PAGE,
  };
})();
