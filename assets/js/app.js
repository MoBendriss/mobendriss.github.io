/**
 * MoBendriss — Application principale
 * Gestion des onglets, thème, langue et interactions
 */

const App = (() => {
    // ── State ─────────────────────────────────────────────────
    let currentTab = 'accueil';
    let currentTheme = 'light';
    let currentLang = 'fr';

    // ── DOM Elements ──────────────────────────────────────────
    const tabButtons = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    const navIndicator = document.querySelector('.nav-indicator');
    const openTabButtons = document.querySelectorAll('[data-open-tab]');
    const announcer = document.getElementById('tab-announcer');

    // ── Initialization ────────────────────────────────────────
    function init() {
        loadState();
        applyTheme();
        applyLanguage();
        bindEvents();
        activateTab(currentTab, false);
        updateNavIndicator();

        // Init resource module
        if (typeof ResourceModule !== 'undefined') {
            ResourceModule.init();
        }

        // Trigger MathJax rendering
        if (window.MathJax && MathJax.typesetPromise) {
            MathJax.typesetPromise().catch(() => {});
        }
    }

    // ── Load State from localStorage ──────────────────────────
    function loadState() {
        try {
            const theme = localStorage.getItem('mb-theme');
            if (theme) currentTheme = theme;

            const lang = localStorage.getItem('mb-lang');
            if (lang) currentLang = lang;

            const tab = sessionStorage.getItem('mb-tab');
            if (tab) currentTab = tab;
        } catch (e) {}
    }

    // ── Save State ────────────────────────────────────────────
    function saveState() {
        try {
            localStorage.setItem('mb-theme', currentTheme);
            localStorage.setItem('mb-lang', currentLang);
            sessionStorage.setItem('mb-tab', currentTab);
        } catch (e) {}
    }

    // ── Theme Toggle ──────────────────────────────────────────
    function applyTheme() {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = currentTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            }
            themeToggle.setAttribute('aria-label',
                currentTheme === 'dark' ? 'Mode clair' : 'Mode sombre'
            );
        }
        // Update theme-color meta
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.content = currentTheme === 'dark' ? '#0C1526' : '#132038';
        }
    }

    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme();
        saveState();

        // Announce
        announce(currentTheme === 'dark' ? 'Mode sombre activé' : 'Mode clair activé');
    }

    // ── Language Toggle ───────────────────────────────────────
    function applyLanguage() {
        const html = document.documentElement;
        html.setAttribute('lang', currentLang);
        html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

        // Update lang toggle label
        if (langToggle) {
            const label = langToggle.querySelector('.lang-toggle-label');
            if (label) {
                label.textContent = currentLang === 'ar' ? 'FR' : 'AR';
            }
            langToggle.setAttribute('aria-label',
                currentLang === 'ar' ? 'Passer en français' : 'التبديل إلى العربية'
            );
        }

        // Apply translations
        applyTranslations();
    }

    function toggleLanguage() {
        currentLang = currentLang === 'fr' ? 'ar' : 'fr';
        applyLanguage();
        saveState();

        // Re-render resources with new language
        if (typeof ResourceModule !== 'undefined') {
            ResourceModule.render();
            ResourceModule.renderResearch();
        }

        // Announce
        announce(currentLang === 'ar' ? 'تم التبديل إلى العربية' : 'Passage en français');
    }

    // ── Apply i18n Translations ───────────────────────────────
    function applyTranslations() {
        const translations = I18N[currentLang];
        if (!translations) return;

        // Translate elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key]) {
                el.textContent = translations[key];
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[key]) {
                el.placeholder = translations[key];
            }
        });
    }

    // ── Tab Management ────────────────────────────────────────
    function activateTab(tabName, animate = true) {
        currentTab = tabName;

        // Update tab buttons
        tabButtons.forEach(btn => {
            const isActive = btn.dataset.tab === tabName;
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
            btn.classList.toggle('active', isActive);
        });

        // Update tab panels
        tabPanels.forEach(panel => {
            const isActive = panel.id === `content-${tabName}`;
            if (isActive) {
                panel.hidden = false;
                panel.classList.add('active-content');
                if (animate) {
                    panel.style.animation = 'none';
                    panel.offsetHeight; // Force reflow
                    panel.style.animation = '';
                }
            } else {
                panel.hidden = true;
                panel.classList.remove('active-content');
            }
        });

        // Update URL hash
        if (animate) {
            history.replaceState(null, '', `#${tabName}`);
        }

        // Update nav indicator
        updateNavIndicator();

        // Save state
        saveState();

        // Announce tab change
        const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeBtn && announcer) {
            const label = activeBtn.querySelector('[data-i18n]');
            if (label) {
                announcer.textContent = `${label.textContent} — ${currentLang === 'ar' ? 'تم التحميل' : 'chargé'}`;
            }
        }

        // Scroll to top of content
        const mainContent = document.getElementById('main-content');
        if (mainContent && animate) {
            mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // ── Update Nav Indicator ──────────────────────────────────
    function updateNavIndicator() {
        if (!navIndicator) return;

        const activeBtn = document.querySelector(`[role="tab"][aria-selected="true"]`);
        if (!activeBtn) return;

        const li = activeBtn.closest('li');
        if (!li) return;

        const rect = li.getBoundingClientRect();
        const parentRect = li.closest('ul').getBoundingClientRect();

        navIndicator.style.width = `${rect.width}px`;
        navIndicator.style.left = `${rect.left - parentRect.left}px`;
    }

    // ── Bind Events ───────────────────────────────────────────
    function bindEvents() {
        // Tab clicks
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                activateTab(btn.dataset.tab);
            });
        });

        // Keyboard navigation for tabs
        const tabList = document.querySelector('[role="tablist"]');
        if (tabList) {
            tabList.addEventListener('keydown', (e) => {
                const tabs = [...tabList.querySelectorAll('[role="tab"]')];
                const currentIndex = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');

                let newIndex;
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    newIndex = (currentIndex + 1) % tabs.length;
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    newIndex = 0;
                } else if (e.key === 'End') {
                    e.preventDefault();
                    newIndex = tabs.length - 1;
                }

                if (newIndex !== undefined) {
                    tabs[newIndex].focus();
                    activateTab(tabs[newIndex].dataset.tab);
                }
            });
        }

        // Theme toggle
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        // Language toggle
        if (langToggle) {
            langToggle.addEventListener('click', toggleLanguage);
        }

        // Open tab buttons (CTAs)
        openTabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.openTab;
                if (tab) activateTab(tab);
            });
        });

        // Handle URL hash on load
        const hash = window.location.hash.slice(1);
        if (hash && document.getElementById(`content-${hash}`)) {
            currentTab = hash;
        }

        // Handle resize for nav indicator
        window.addEventListener('resize', debounce(updateNavIndicator, 100));

        // Handle back/forward navigation
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            if (hash && document.getElementById(`content-${hash}`) && hash !== currentTab) {
                activateTab(hash);
            }
        });
    }

    // ── Screen Reader Announcement ────────────────────────────
    function announce(message) {
        if (announcer) {
            announcer.textContent = '';
            requestAnimationFrame(() => {
                announcer.textContent = message;
            });
        }
    }

    // ── Utility: Debounce ─────────────────────────────────────
    function debounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // ── Public API ────────────────────────────────────────────
    return {
        init,
        activateTab,
        toggleTheme,
        toggleLanguage
    };
})();

// ── Launch App ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', App.init);
