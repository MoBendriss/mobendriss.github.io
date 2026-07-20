(function () {
    "use strict";

    console.log("[MoBendriss] app.js chargé ✔");

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var TAB_IDS = ["accueil", "apropos", "mathematiques", "recherche", "faq", "contact", "confidentialite"];
    var isNavigatingByHash = false;
    var lastActiveTab = "accueil";

    function isValidTab(id) { return TAB_IDS.indexOf(id) !== -1; }

    function typesetAll() {
        if (window.MathJax && typeof window.MathJax.typesetPromise === "function") {
            try {
                if (typeof window.MathJax.typesetClear === "function") {
                    window.MathJax.typesetClear();
                }
                window.MathJax.typesetPromise().catch(function () {});
            } catch (e) {}
        } else {
            setTimeout(typesetAll, 300);
        }
    }

    function positionIndicator(button) {
        var indicator = document.querySelector(".nav-indicator");
        var list = document.querySelector(".navigation-bar ul");
        if (!indicator || !button || !list) return;
        var listRect = list.getBoundingClientRect();
        var btnRect = button.getBoundingClientRect();
        indicator.style.left = (btnRect.left - listRect.left) + "px";
        indicator.style.width = btnRect.width + "px";
    }

    function revealChildren(panel) {
        var items = panel.querySelectorAll(".resource-item, .resource-card, .abstract-box, .empty-note, .info-item, .faq-item, .level-title, .home-hero, .stat-card");
        items.forEach(function (el, i) {
            el.classList.remove("is-visible");
            el.classList.add("reveal");
            if (reduceMotion) { el.classList.add("is-visible"); return; }
            el.style.transitionDelay = (i * 40) + "ms";
            requestAnimationFrame(function () {
                requestAnimationFrame(function () { el.classList.add("is-visible"); });
            });
        });
    }

    function switchTab(tabId, opts) {
        opts = opts || {};
        if (!isValidTab(tabId)) { console.warn("[MoBendriss] onglet invalide :", tabId); return; }
        lastActiveTab = tabId;
        console.log("[MoBendriss] switchTab →", tabId);

        document.querySelectorAll(".nav-link").forEach(function (link) {
            var selected = link.getAttribute("data-tab") === tabId;
            link.setAttribute("aria-selected", String(selected));
            link.setAttribute("tabindex", selected ? "0" : "-1");
        });

        document.querySelectorAll(".tab-content").forEach(function (panel) {
            panel.classList.remove("active-content");
            panel.hidden = true;
            panel.setAttribute("aria-hidden", "true");
        });

        var activeTab = document.getElementById("tab-" + tabId);
        if (activeTab) {
            positionIndicator(activeTab);
            try { activeTab.scrollIntoView({ block: "nearest", inline: "center", behavior: reduceMotion ? "auto" : "smooth" }); } catch (e) {}
        }

        var activePanel = document.getElementById("content-" + tabId);
        if (activePanel) {
            activePanel.classList.add("active-content");
            activePanel.hidden = false;
            activePanel.setAttribute("aria-hidden", "false");
            revealChildren(activePanel);
        }

        if (opts.updateHash !== false && history.pushState) {
            try { isNavigatingByHash = true; history.pushState({ tab: tabId }, "", "#" + tabId); }
            catch (e) {} finally { isNavigatingByHash = false; }
        }

        if (opts.scrollTop !== false) {
            window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        }

        setTimeout(typesetAll, 50);
    }
    window.switchTab = switchTab;

    document.addEventListener("click", function (e) {
        var navBtn = e.target.closest(".nav-link");
        if (navBtn) {
            e.preventDefault();
            switchTab(navBtn.getAttribute("data-tab"));
            return;
        }
        var openBtn = e.target.closest("[data-open-tab]");
        if (openBtn) {
            e.preventDefault();
            switchTab(openBtn.getAttribute("data-open-tab"));
            return;
        }
    });

    document.addEventListener("keydown", function (e) {
        var btn = e.target.closest && e.target.closest(".nav-link");
        if (!btn) return;
        var idx = TAB_IDS.indexOf(btn.getAttribute("data-tab"));
        if (idx === -1) return;
        var newIdx = null;
        if (e.key === "ArrowRight") newIdx = (idx + 1) % TAB_IDS.length;
        else if (e.key === "ArrowLeft") newIdx = (idx - 1 + TAB_IDS.length) % TAB_IDS.length;
        else if (e.key === "Home") newIdx = 0;
        else if (e.key === "End") newIdx = TAB_IDS.length - 1;
        if (newIdx !== null) {
            e.preventDefault();
            switchTab(TAB_IDS[newIdx], { scrollTop: false });
            var nb = document.getElementById("tab-" + TAB_IDS[newIdx]);
            if (nb) nb.focus();
        }
    });

    function init() {
        var initial = location.hash ? location.hash.substring(1) : "accueil";
        if (!isValidTab(initial)) initial = "accueil";
        switchTab(initial, { updateHash: false, scrollTop: false });

        document.querySelectorAll(".sidebar-widget").forEach(function (el, i) {
            el.classList.add("reveal");
            if (reduceMotion) { el.classList.add("is-visible"); return; }
            el.style.transitionDelay = (i * 90) + "ms";
            requestAnimationFrame(function () {
                requestAnimationFrame(function () { el.classList.add("is-visible"); });
            });
        });

        setTimeout(typesetAll, 200);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    window.addEventListener("popstate", function () {
        if (isNavigatingByHash) return;
        var id = location.hash ? location.hash.substring(1) : "accueil";
        if (!isValidTab(id)) id = "accueil";
        switchTab(id, { updateHash: false, scrollTop: false });
    });

    window.addEventListener("resize", function () {
        positionIndicator(document.querySelector('.nav-link[aria-selected="true"]'));
    });

    var navList = document.querySelector(".navigation-bar ul");
    if (navList) {
        navList.addEventListener("scroll", function () {
            positionIndicator(document.querySelector('.nav-link[aria-selected="true"]'));
        }, { passive: true });
    }

    var I18N = {
        fr: {
            eyebrow: "Enseignant de mathématiques",
            tagline: "Plateforme académique des mathématiques",
            "nav.accueil": "Accueil", "nav.apropos": "À propos", "nav.maths": "Mathématiques",
            "nav.recherche": "Recherche", "nav.faq": "FAQ", "nav.contact": "Contact",
            "search.placeholder": "Rechercher…",
            "accessibility.skip": "Aller au contenu principal",
            "hero.kicker": "Plateforme académique gratuite",
            "hero.title": "Apprenez les mathématiques avec rigueur et clarté.",
            "hero.description": "Cours structurés, exercices progressifs, examens corrigés et ressources avancées pour les cycles secondaire et supérieur.",
            "hero.start": "Commencer", "hero.research": "Recherche",
            "stats.cycles": "Cycles éducatifs", "stats.resources": "Ressources évolutives", "stats.languages": "Langues",
            "apropos.heading": "À propos",
            "apropos.bio": "Enseignant de mathématiques passionné par la pédagogie et la transmission des savoirs. Cette plateforme regroupe des ressources gratuites pour les élèves et les étudiants.",
            "apropos.domaines": "Domaines d'expertise",
            "apropos.tag1": "Algèbre", "apropos.tag2": "Analyse", "apropos.tag3": "Géométrie", "apropos.tag4": "Didactique",
            "maths.heading": "Mathématiques", "maths.sub": "Explorez les ressources par cycle et par type.",
            "recherche.heading": "Recherche & Supérieur", "recherche.sub": "Ressources avancées pour les étudiants du supérieur.",
            "filter.allCycles": "Tous les cycles", "filter.college": "Collège", "filter.lycee": "Lycée", "filter.superieur": "Supérieur",
            "filter.allTypes": "Tous les types", "filter.cours": "Cours", "filter.td": "TD", "filter.exam": "Examens", "filter.recherche": "Recherche",
            "filter.favorites": "Favoris", "filter.noResults": "Aucun résultat trouvé.",
            "faq.heading": "Questions fréquentes",
            "faq.q1": "Comment télécharger un document ?", "faq.a1": "Cliquez sur le bouton « Télécharger » de la ressource souhaitée.",
            "faq.q2": "Les ressources sont-elles gratuites ?", "faq.a2": "Oui, toutes les ressources sont gratuites et libres d'usage pédagogique.",
            "faq.q3": "Comment vous contacter ?", "faq.a3": "Utilisez le formulaire de l'onglet Contact.",
            "contact.heading": "Contact", "contact.intro": "Pour toute question ou collaboration, écrivez-moi.",
            "contact.nameLabel": "Nom", "contact.emailLabel": "E-mail", "contact.messageLabel": "Message", "contact.submit": "Envoyer",
            "legal.heading": "Confidentialité", "legal.privacy1": "Aucune donnée personnelle n'est collectée en dehors du formulaire de contact.",
            "footer.rights": "© 2026 MoBendriss. Tous droits réservés.", "footer.tagline": "Conçu avec rigueur.", "footer.legalLink": "Confidentialité",
            "sidebar.mathBtn": "Mathématiques", "sidebar.researchBtn": "Recherche", "sidebar.newsTitle": "Actualités", "sidebar.newBadge": "Nouveau",
            "sidebar.news1": "Mise en ligne des ressources pour le cycle collégial.", "sidebar.news2": "Ajout des séries d'exercices pour la 1ère BAC."
        },
        ar: {
            eyebrow: "أستاذ مادة الرياضيات",
            tagline: "منصة أكاديمية للرياضيات",
            "nav.accueil": "الرئيسية", "nav.apropos": "من أنا", "nav.maths": "الرياضيات",
            "nav.recherche": "البحث العلمي", "nav.faq": "الأسئلة الشائعة", "nav.contact": "اتصال",
            "search.placeholder": "بحث…",
            "accessibility.skip": "الانتقال إلى المحتوى الرئيسي",
            "hero.kicker": "منصة أكاديمية مجانية",
            "hero.title": "تعلّم الرياضيات بدقة ووضوح.",
            "hero.description": "دروس منظمة، تمارين متدرجة، امتحانات مصححة وموارد متقدمة للسلكين الثانوي والعالي.",
            "hero.start": "ابدأ", "hero.research": "البحث العلمي",
            "stats.cycles": "أسلاك تعليمية", "stats.resources": "موارد قابلة للتطوير", "stats.languages": "لغات",
            "apropos.heading": "من أنا",
            "apropos.bio": "أستاذ رياضيات شغوف بالتربية والتعليم. هذه المنصة تجمع موارد مجانية للتلاميذ والطلبة.",
            "apropos.domaines": "مجالات الخبرة",
            "apropos.tag1": "الجبر", "apropos.tag2": "التحليل", "apropos.tag3": "الهندسة", "apropos.tag4": "الديدكتيك",
            "maths.heading": "الرياضيات", "maths.sub": "استكشف الموارد حسب السلك والنوع.",
            "recherche.heading": "البحث والتعليم العالي", "recherche.sub": "موارد متقدمة لطلبة التعليم العالي.",
            "filter.allCycles": "كل الأسلاك", "filter.college": "الإعدادي", "filter.lycee": "الثانوي", "filter.superieur": "العالي",
            "filter.allTypes": "كل الأنواع", "filter.cours": "دروس", "filter.td": "تمارين", "filter.exam": "امتحانات", "filter.recherche": "بحث علمي",
            "filter.favorites": "المفضلة", "filter.noResults": "لم يتم العثور على نتائج.",
            "faq.heading": "الأسئلة الشائعة",
            "faq.q1": "كيف أحمّل وثيقة؟", "faq.a1": "انقر على زر « تحميل » الخاص بالمورد المطلوب.",
            "faq.q2": "هل الموارد مجانية؟", "faq.a2": "نعم، جميع الموارد مجانية ومفتوحة للاستعمال التربوي.",
            "faq.q3": "كيف أتواصل معك؟", "faq.a3": "استخدم استمارة لسان « اتصال ».",
            "contact.heading": "اتصال", "contact.intro": "لأي سؤال أو تعاون، تواصل معي.",
            "contact.nameLabel": "الاسم", "contact.emailLabel": "البريد الإلكتروني", "contact.messageLabel": "الرسالة", "contact.submit": "إرسال",
            "legal.heading": "الخصوصية", "legal.privacy1": "لا يتم جمع أي بيانات شخصية خارج استمارة الاتصال.",
            "footer.rights": "© 2026 MoBendriss. جميع الحقوق محفوظة.", "footer.tagline": "صُمم بدقة.", "footer.legalLink": "الخصوصية",
            "sidebar.mathBtn": "الرياضيات", "sidebar.researchBtn": "البحث العلمي", "sidebar.newsTitle": "آخر المستجدات", "sidebar.newBadge": "جديد",
            "sidebar.news1": "نشر موارد خاصة بالمستوى الإعدادي.", "sidebar.news2": "إضافة سلاسل تمارين للسنة الأولى باكالوريا."
        }
    };

    function applyLang(lang) {
        if (!I18N[lang]) lang = "fr";
        document.documentElement.setAttribute("lang", lang);
        document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            var key = el.getAttribute("data-i18n");
            var val = I18N[lang][key] || I18N.fr[key];
            if (val !== undefined) el.innerHTML = val;
        });
        document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
            var key = el.getAttribute("data-i18n-placeholder");
            var val = I18N[lang][key] || I18N.fr[key];
            if (val !== undefined) el.setAttribute("placeholder", val);
        });

        var label = document.querySelector(".lang-toggle-label");
        var langBtn = document.getElementById("lang-toggle");
        if (label) label.textContent = lang === "ar" ? "FR" : "AR";
        if (langBtn) langBtn.setAttribute("aria-label", lang === "ar" ? "Switch to French" : "التبديل إلى العربية");

        try { localStorage.setItem("mb-lang", lang); } catch (e) {}
        document.dispatchEvent(new CustomEvent("mb:language-changed", { detail: { lang: lang } }));
        if (window.MBRenderResources) window.MBRenderResources();
        setTimeout(typesetAll, 80);
    }

    var langToggle = document.getElementById("lang-toggle");
    if (langToggle) {
        applyLang(document.documentElement.getAttribute("lang") === "ar" ? "ar" : "fr");
        langToggle.addEventListener("click", function () {
            var current = document.documentElement.getAttribute("lang") === "ar" ? "ar" : "fr";
            applyLang(current === "ar" ? "fr" : "ar");
        });
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        var icon = document.querySelector("#theme-toggle i");
        var btn = document.getElementById("theme-toggle");
        if (icon) icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
        if (btn) btn.setAttribute("aria-label", theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre");
        try { localStorage.setItem("mb-theme", theme); } catch (e) {}
    }

    var themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        applyTheme(document.documentElement.getAttribute("data-theme") || "light");
        themeToggle.addEventListener("click", function () {
            applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
        });
    }

    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker.register("./sw.js").catch(function () {});
        });
    }
})();
