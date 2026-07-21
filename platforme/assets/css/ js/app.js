// MoBendriss Academy — Application principale
// Tabs, thème, langue, recherche, rendu, confetti, etc.

(function () {
  'use strict';

  const RM = RESOURCES_MODULE;
  const LS = localStorage;

  // ─── Traductions ───
  const TR = {
    fr: {
      'nav.accueil': 'Accueil', 'nav.apropos': 'À propos', 'nav.maths': 'Mathématiques',
      'nav.recherche': 'Recherche', 'nav.faq': 'FAQ', 'nav.contact': 'Contact',
      'hero.kicker': 'Plateforme académique gratuite',
      'hero.title': 'Apprenez les mathématiques avec rigueur et clarté.',
      'hero.description': 'Cours structurés, exercices progressifs, examens corrigés et ressources avancées pour les cycles secondaire et supérieur.',
      'hero.start': 'Commencer', 'hero.research': 'Recherche',
      'stats.cycles': 'Cycles éducatifs', 'stats.resources': 'Ressources évolutives', 'stats.languages': 'Langues',
      'apropos.heading': 'À propos', 'apropos.bio': 'Enseignant de mathématiques passionné par la pédagogie et la transmission des savoirs. Cette plateforme regroupe des ressources gratuites pour les élèves et les étudiants.',
      'apropos.domaines': "Domaines d'expertise",
      'apropos.tag1': 'Algèbre', 'apropos.tag2': 'Analyse', 'apropos.tag3': 'Géométrie', 'apropos.tag4': 'Didactique', 'apropos.tag5': 'Probabilités', 'apropos.tag6': 'Topologie',
      'maths.heading': 'Mathématiques', 'maths.sub': 'Explorez les ressources par cycle et par type.',
      'recherche.heading': 'Recherche & Supérieur', 'recherche.sub': 'Ressources avancées pour les étudiants du supérieur.',
      'faq.heading': 'Questions fréquentes', 'faq.q1': 'Comment télécharger un document ?', 'faq.a1': 'Cliquez sur le bouton « Télécharger » de la ressource souhaitée.',
      'faq.q2': 'Les ressources sont-elles gratuites ?', 'faq.a2': 'Oui, toutes les ressources sont gratuites et libres d\'usage pédagogique.',
      'faq.q3': 'Comment vous contacter ?', 'faq.a3': 'Utilisez le formulaire de l\'onglet Contact.',
      'faq.q4': 'Puis-je contribuer ?', 'faq.a4': 'Bien sûr ! Envoyez-moi un message via le formulaire de contact.',
      'contact.heading': 'Contact', 'contact.intro': 'Pour toute question ou collaboration, écrivez-moi.',
      'contact.nameLabel': 'Nom', 'contact.emailLabel': 'E-mail', 'contact.messageLabel': 'Message', 'contact.submit': 'Envoyer',
      'contact.sent': '✅ Message envoyé avec succès !', 'contact.error': '❌ Une erreur est survenue.',
      'legal.heading': 'Confidentialité', 'legal.privacy1': 'Aucune donnée personnelle n\'est collectée en dehors du formulaire de contact.',
      'sidebar.mathBtn': 'Mathématiques', 'sidebar.researchBtn': 'Recherche',
      'sidebar.newsTitle': 'Actualités', 'sidebar.newBadge': 'Nouveau',
      'news.1': 'Mise en ligne des ressources pour le cycle collégial.',
      'news.2': 'Ajout des séries d\'exercices pour la 1ère BAC.',
      'news.3': 'Nouvelle section recherche séminaire EDP.',
      'filter.allCycles': 'Tous les cycles', 'filter.college': 'Collège', 'filter.lycee': 'Lycée', 'filter.superieur': 'Supérieur',
      'filter.allTypes': 'Tous les types', 'filter.cours': 'Cours', 'filter.td': 'TD', 'filter.exam': 'Examens', 'filter.recherche': 'Recherche',
      'filter.allCategories': 'Toutes les catégories', 'filter.favorites': 'Favoris',
      'filter.noResults': 'Aucun résultat trouvé.',
      'pagination.prev': 'Précédent', 'pagination.next': 'Suivant', 'pagination.page': 'Page',
      'resource.download': 'Télécharger', 'resource.downloads': 'téléchargements',
      'toast.favAdded': 'Ajouté aux favoris ⭐', 'toast.favRemoved': 'Retiré des favoris 💔',
      'sort.newest': 'Plus récent', 'sort.popular': 'Populaire',
      'shortcuts.search': 'Chercher', 'shortcuts.close': 'Fermer',
      'app.ressources': 'Ressources', 'app.downloads': 'Téléchargements', 'app.featured': 'À la une',
      'app.stats': 'Statistiques',
      'reset': 'Réinitialiser les filtres',
      'search.placeholder': 'Rechercher…',
      'offline': 'Mode hors ligne',
    },
    ar: {
      'nav.accueil': 'الرئيسية', 'nav.apropos': 'عن الموقع', 'nav.maths': 'الرياضيات',
      'nav.recherche': 'البحث', 'nav.faq': 'الأسئلة', 'nav.contact': 'اتصل بنا',
      'hero.kicker': 'منصة أكاديمية مجانية',
      'hero.title': 'تعلم الرياضيات بدقة ووضوح.',
      'hero.description': 'دروس منظمة، تمارين تدريجية، امتحانات مصححة وموارد متقدمة للمرحلتين الثانوية والجامعية.',
      'hero.start': 'ابدأ', 'hero.research': 'البحث',
      'stats.cycles': 'المراحل التعليمية', 'stats.resources': 'موارد متطورة', 'stats.languages': 'اللغات',
      'apropos.heading': 'عن الموقع', 'apropos.bio': 'أستاذ رياضيات شغوف بالتربية ونقل المعرفة. هذه المنصة تضم موارد مجانية للتلاميذ والطلاب.',
      'apropos.domaines': 'مجالات الخبرة',
      'apropos.tag1': 'الجبر', 'apropos.tag2': 'التحليل', 'apropos.tag3': 'الهندسة', 'apropos.tag4': 'الديداكتيك', 'apropos.tag5': 'الاحتمالات', 'apropos.tag6': 'التوبولوجيا',
      'maths.heading': 'الرياضيات', 'maths.sub': 'استكشف الموارد حسب المرحلة والنوع.',
      'recherche.heading': 'البحث والجامعة', 'recherche.sub': 'موارد متقدمة لطلاب التعليم العالي.',
      'faq.heading': 'الأسئلة المتكررة',
      'faq.q1': 'كيف يمكن تحميل وثيقة؟', 'faq.a1': 'انقر على زر «تحميل» في المورد المطلوب.',
      'faq.q2': 'هل الموارد مجانية؟', 'faq.a2': 'نعم، جميع الموارد مجانية للاستخدام التعليمي.',
      'faq.q3': 'كيف يمكن الاتصال بكم؟', 'faq.a3': 'استخدم نموذج الاتصال في علامة تبويب الاتصال.',
      'faq.q4': 'هل يمكنني المساهمة؟', 'faq.a4': 'بالطبع! أرسل لي رسالة عبر نموذج الاتصال.',
      'contact.heading': 'اتصل بنا', 'contact.intro': 'لأي سؤال أو تعاون، راسلني.',
      'contact.nameLabel': 'الاسم', 'contact.emailLabel': 'البريد الإلكتروني', 'contact.messageLabel': 'الرسالة', 'contact.submit': 'إرسال',
      'contact.sent': '✅ تم إرسال الرسالة بنجاح!', 'contact.error': '❌ حدث خطأ. حاول مرة أخرى.',
      'legal.heading': 'الخصوصية', 'legal.privacy1': 'لا يتم جمع أي بيانات شخصية خارج نموذج الاتصال.',
      'sidebar.mathBtn': 'الرياضيات', 'sidebar.researchBtn': 'البحث',
      'sidebar.newsTitle': 'آخر الأخبار', 'sidebar.newBadge': 'جديد',
      'news.1': 'نشر موارد المرحلة الإعدادية.',
      'news.2': 'إضافة سلاسل تمارين للأولى باك.',
      'news.3': 'قسم جديد لأبحاث ندوة المعادلات التفاضلية.',
      'filter.allCycles': 'جميع المراحل', 'filter.college': 'الإعدادي', 'filter.lycee': 'الثانوي', 'filter.superieur': 'الجامعي',
      'filter.allTypes': 'جميع الأنواع', 'filter.cours': 'دروس', 'filter.td': 'تمارين', 'filter.exam': 'امتحانات', 'filter.recherche': 'بحث',
      'filter.allCategories': 'جميع التصنيفات', 'filter.favorites': 'المفضلة',
      'filter.noResults': 'لم يتم العثور على نتائج.',
      'pagination.prev': 'السابق', 'pagination.next': 'التالي', 'pagination.page': 'صفحة',
      'resource.download': 'تحميل', 'resource.downloads': 'تحميل',
      'toast.favAdded': 'تمت الإضافة إلى المفضلة ⭐', 'toast.favRemoved': 'تمت الإزالة من المفضلة 💔',
      'sort.newest': 'الأحدث', 'sort.popular': 'الأكثر تحميلاً',
      'shortcuts.search': 'بحث', 'shortcuts.close': 'إغلاق',
      'app.ressources': 'موارد', 'app.downloads': 'تحميل', 'app.featured': 'مميز',
      'app.stats': 'إحصائيات',
      'reset': 'إعادة تعيين الفلاتر',
      'search.placeholder': 'بحث…',
      'offline': 'وضع عدم الاتصال',
    },
  };
  function _(key) { const l = RM.getLang(); return (TR[l] && TR[l][key]) || (TR.fr && TR.fr[key]) || key; }

  // ─── Cycle / Type labels ───
  const CYCLE_LABELS = { fr: { college: 'Collège', lycee: 'Lycée', superieur: 'Supérieur' }, ar: { college: 'الإعدادي', lycee: 'الثانوي', superieur: 'الجامعي' } };
  const TYPE_LABELS = { fr: { cours: 'Cours', td: 'TD', exam: 'Examen', recherche: 'Recherche' }, ar: { cours: 'درس', td: 'تمارين', exam: 'امتحان', recherche: 'بحث' } };
  function cl(key) { const l = RM.getLang(); return (CYCLE_LABELS[l] && CYCLE_LABELS[l][key]) || key; }
  function tl(key) { const l = RM.getLang(); return (TYPE_LABELS[l] && TYPE_LABELS[l][key]) || key; }

  // ─── État de l'UI ───
  let currentTab = 'accueil';
  let currentTheme = LS.getItem('mb-theme') || (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  let mobileNavOpen = false;
  let previewResource = null;

  // ─── DOM refs ───
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  // ─── Toast ───
  function showToast(msg, icon, duration = 2000) {
    const container = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`;
    container.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(20px)'; t.style.transition = 'all 0.3s ease'; }, duration - 300);
    setTimeout(() => t.remove(), duration);
  }

  // ─── Confetti ───
  function fireConfetti() {
    try {
      const canvas = document.getElementById('confetti-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const colors = ['#B8860B', '#D4A843', '#1E3A5F', '#F8FAFC'];
      const particles = [];
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: canvas.width / 2 + (Math.random() - 0.5) * 100,
          y: canvas.height * 0.6,
          w: 6 + Math.random() * 6,
          h: 4 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 8,
          vy: -Math.random() * 8 - 4,
          rot: Math.random() * 360,
          rv: (Math.random() - 0.5) * 8,
          life: 1,
        });
      }
      let frames = 60;
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frames--;
        for (const p of particles) {
          p.x += p.vx;
          p.vy += 0.15;
          p.y += p.vy;
          p.rot += p.rv;
          p.life = Math.max(0, frames / 60);
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot * Math.PI / 180);
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
        if (frames > 0) requestAnimationFrame(animate);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      animate();
    } catch (e) {}
  }

  // ─── Math Particles Background ───
  function initMathParticles() {
    const canvas = document.getElementById('math-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const symbols = '∫∑π√Δ∂∞∇λθαβγφψ∮∏⊕⊗ℏ∀∃∅∈ℝℂℕℤℚ';
    const particles = [];

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        s: symbols[Math.floor(Math.random() * symbols.length)],
        size: 10 + Math.random() * 18, speed: 0.12 + Math.random() * 0.25,
        alpha: 0.02 + Math.random() * 0.03, dx: (Math.random() - 0.5) * 0.3,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      for (const p of particles) {
        ctx.font = `${p.size}px 'IBM Plex Mono', monospace`;
        ctx.fillStyle = isDark ? `rgba(212,168,67,${p.alpha})` : `rgba(30,58,95,${p.alpha})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        p.y -= p.speed;
        p.x += p.dx;
        if (p.y < -p.size) { p.y = canvas.height + p.size; p.x = Math.random() * canvas.width; }
        if (p.x < -p.size || p.x > canvas.width + p.size) p.dx *= -1;
        ctx.fillText(p.s, p.x, p.y);
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ─── Initialisation ───
  function init() {
    // Appliquer le thème initial
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');

    // Appliquer la langue initiale
    const savedLang = LS.getItem('mb-lang');
    if (savedLang === 'ar' || savedLang === 'fr') {
      RM.setLang(savedLang);
      document.documentElement.setAttribute('lang', savedLang);
      document.documentElement.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
      const lt = document.getElementById('lang-toggle-label');
      if (lt) lt.textContent = savedLang === 'fr' ? 'AR' : 'FR';
    }

    // Hash routing
    const hash = window.location.hash.replace('#', '');
    if (hash && ['accueil', 'apropos', 'mathematiques', 'recherche', 'faq', 'contact', 'confidentialite'].includes(hash)) {
      currentTab = hash;
    }

    // Online/offline
    if (!navigator.onLine) {
      const b = document.getElementById('offline-banner');
      if (b) b.style.display = 'flex';
    }
    window.addEventListener('offline', () => {
      const b = document.getElementById('offline-banner');
      if (b) b.style.display = 'flex';
    });
    window.addEventListener('online', () => {
      const b = document.getElementById('offline-banner');
      if (b) b.style.display = 'none';
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const si = document.getElementById('site-search');
        if (si) { si.focus(); switchTab('mathematiques'); }
      }
      if (e.key === 'Escape') { closePreview(); setMobileNav(false); }
    });

    // Render UI
    renderAll();
    setupEventListeners();
    initMathParticles();
  }

  // ─── Rendu complet ───
  function renderAll() {
    renderTab();
    renderResources();
    renderStats();
    renderNews();
    updateTitle();
  }

  // ─── Titre dynamique ───
  function updateTitle() {
    const titles = {
      accueil: RM.getLang() === 'fr' ? 'Accueil' : 'الرئيسية',
      apropos: RM.getLang() === 'fr' ? 'À propos' : 'عن الموقع',
      mathematiques: RM.getLang() === 'fr' ? 'Mathématiques' : 'الرياضيات',
      recherche: RM.getLang() === 'fr' ? 'Recherche' : 'البحث',
      faq: RM.getLang() === 'fr' ? 'FAQ' : 'الأسئلة',
      contact: RM.getLang() === 'fr' ? 'Contact' : 'اتصل بنا',
      confidentialite: RM.getLang() === 'fr' ? 'Confidentialité' : 'الخصوصية',
    };
    document.title = `${titles[currentTab] || 'MoBendriss'}${RM.getLang() === 'ar' ? ' | موبندريس' : ' | MoBendriss Academy'}`;
  }

  // ─── Tabs ───
  function switchTab(tab) {
    currentTab = tab;
    window.location.hash = tab;
    setMobileNav(false);
    renderTab();
    renderResources();
    updateTitle();
  }

  function renderTab() {
    $$('.tab-content').forEach(el => {
      el.classList.remove('active-content');
      el.style.display = 'none';
    });
    const active = document.getElementById(`content-${currentTab}`);
    if (active) {
      active.style.display = 'block';
      // Force reflow then add class for animation
      void active.offsetWidth;
      active.classList.add('active-content');
    }
    $$('.nav-link').forEach(el => {
      const tab = el.dataset.tab;
      el.setAttribute('aria-selected', tab === currentTab ? 'true' : 'false');
    });
  }

  function setMobileNav(open) {
    mobileNavOpen = open;
    const menu = document.getElementById('desktop-tabs');
    if (menu) menu.classList.toggle('mobile-open', open);
    const lines = document.querySelectorAll('.hamburger-line');
    lines.forEach(l => l.classList.toggle('open', open));
    const btn = document.querySelector('.hamburger-btn');
    if (btn) btn.setAttribute('aria-expanded', open);
  }

  // ─── Thème ───
  function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.classList.add('theme-transitioning');
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    LS.setItem('mb-theme', currentTheme);
    const icon = document.querySelector('#theme-toggle i');
    if (icon) icon.className = `fa-solid fa-${currentTheme === 'light' ? 'moon' : 'sun'}`;
    setTimeout(() => document.body.classList.remove('theme-transitioning'), 500);
  }

  // ─── Langue ───
  function toggleLang() {
    const newLang = RM.getLang() === 'fr' ? 'ar' : 'fr';
    RM.setLang(newLang);
    document.documentElement.setAttribute('lang', newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    LS.setItem('mb-lang', newLang);
    const lt = document.getElementById('lang-toggle-label');
    if (lt) lt.textContent = newLang === 'fr' ? 'AR' : 'FR';
    renderAll();
  }

  // ─── Ressources ───
  function renderResources() {
    RM.setOnUpdate(renderResources);
    const items = RM.filter();
    const total = RM.getTotalCount();
    const totalPages = RM.getTotalPagesCount();
    const currentPage = RM.getCurrentPage();
    const lang = RM.getLang();
    const loading = false;

    // Compteur
    const countEl = document.getElementById('resource-count');
    if (countEl) {
      countEl.textContent = `${total} ${lang === 'fr' ? 'ressource(s)' : 'مورد/موارد'}`;
      if (totalPages > 1) countEl.textContent += ` — ${_('pagination.page')} ${currentPage}/${totalPages}`;
    }

    const grid = document.getElementById('resource-grid');
    if (!grid) return;

    if (items.length === 0) {
      grid.innerHTML = `<div class="empty-state">
        <div class="empty-state-icon"><i class="fa-regular fa-face-frown"></i></div>
        <p>${_('filter.noResults')}</p>
        ${RM.hasActiveFilters() ? `<button class="btn btn-secondary" onclick="APP.resetFilters()"><i class="fa-solid fa-rotate-left"></i> ${_('reset')}</button>` : ''}
      </div>`;
      return;
    }

    grid.innerHTML = items.map(r => buildCard(r)).join('') + (totalPages > 1 ? buildPagination(currentPage, totalPages) : '');
  }

  function buildCard(r) {
    const lang = RM.getLang();
    const title = lang === 'ar' && r.titleAr ? r.titleAr : r.title;
    const desc = lang === 'ar' && r.descriptionAr ? r.descriptionAr : r.description;
    const icon = r.icon || 'fa-solid fa-file-pdf';
    const cycLabel = cl(r.cycle);
    const typLabel = tl(r.type);
    const isFav = RM.isFav(r.id);
    const downloads = r.downloads || 0;
    const highlighted = RM.getSearch().trim() ? highlightText(title, RM.getSearch()) : title;

    return `<article class="resource-card" data-id="${r.id}">
      <div class="resource-card-header">
        <div class="resource-card-icon"><i class="${icon}"></i></div>
        <div class="resource-card-badges">
          <span class="badge badge-cycle">${cycLabel}</span>
          <span class="badge badge-type">${typLabel}</span>
          ${r.featured ? '<span class="badge badge-featured">★</span>' : ''}
        </div>
      </div>
      <h3>${highlighted}</h3>
      <p>${desc.length > 120 ? desc.slice(0, 120) + '…' : desc}</p>
      ${r.level ? `<div class="resource-card-footer" style="border:none;padding-top:0.2rem"><span class="meta" style="font-size:0.75rem;color:var(--text-muted)">${r.level}</span></div>` : ''}
      <div class="resource-card-footer">
        <div class="meta">${downloads} ${_('resource.downloads')}</div>
        <div class="actions">
          <button class="card-action-btn ${isFav ? 'favorited' : ''}" onclick="APP.toggleFav(${r.id})" aria-label="${isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}">
            <i class="fa-${isFav ? 'solid' : 'regular'} fa-star"></i>
          </button>
          <button class="preview-btn" onclick="APP.preview(${r.id})" aria-label="Aperçu"><i class="fa-solid fa-eye"></i></button>
          <button class="download-btn"><i class="fa-solid fa-download"></i> <span>${_('resource.download')}</span></button>
        </div>
      </div>
    </article>`;
  }

  function highlightText(text, query) {
    if (!query.trim()) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
    return parts.map(p => p.toLowerCase() === query.trim().toLowerCase() ? `<mark class="search-highlight">${p}</mark>` : p).join('');
  }

  function buildPagination(current, total) {
    return `<nav class="pagination">
      <button class="pagination-btn" ${current <= 1 ? 'disabled' : ''} onclick="APP.goPage(${current - 1})">
        <i class="fa-solid fa-chevron-left"></i> <span>${_('pagination.prev')}</span>
      </button>
      <span class="pagination-info">${_('pagination.page')} ${current}/${total}</span>
      <button class="pagination-btn" ${current >= total ? 'disabled' : ''} onclick="APP.goPage(${current + 1})">
        <span>${_('pagination.next')}</span> <i class="fa-solid fa-chevron-right"></i>
      </button>
    </nav>`;
  }

  // ─── Stats Mini ───
  function renderStats() {
    const el = document.getElementById('sidebar-stats');
    if (!el) return;
    el.innerHTML = `<h4 class="widget-title"><i class="fa-solid fa-chart-simple"></i> ${_('app.stats')}</h4>
      <div class="stats-mini">
        <div class="stats-mini-item"><span class="stats-mini-value">${RM.getAll().length}</span><span class="stats-mini-label">${_('app.ressources')}</span></div>
        <div class="stats-mini-item"><span class="stats-mini-value">${RM.getTotalDownloads().toLocaleString()}</span><span class="stats-mini-label">${_('app.downloads')}</span></div>
        <div class="stats-mini-item"><span class="stats-mini-value">${RM.getFeaturedCount()}</span><span class="stats-mini-label">${_('app.featured')}</span></div>
      </div>`;
  }

  // ─── News ───
  function renderNews() {
    const list = document.getElementById('news-list');
    if (!list) return;
    const dates = RM.getLang() === 'fr' ? ['JUIL. 2026', 'JUIN 2026', 'MAI 2026'] : ['يوليو 2026', 'يونيو 2026', 'ماي 2026'];
    list.innerHTML = [1, 2, 3].map(i => `
      <li class="news-item">
        <span class="news-date">${dates[i - 1]}</span>
        ${i === 1 ? `<span class="news-badge">${_('sidebar.newBadge')}</span>` : ''}
        <p>${_(`news.${i}`)}</p>
      </li>`).join('');
  }

  // ─── Preview ───
  function preview(id) {
    const r = RM.getAll().find(x => x.id === id);
    if (!r) return;
    previewResource = r;
    const lang = RM.getLang();
    const title = lang === 'ar' && r.titleAr ? r.titleAr : r.title;
    const desc = lang === 'ar' && r.descriptionAr ? r.descriptionAr : r.description;
    const cycLabel = cl(r.cycle);
    const typLabel = tl(r.type);

    const overlay = document.getElementById('preview-overlay');
    const content = document.getElementById('preview-content');
    if (!overlay || !content) return;

    content.innerHTML = `
      <div class="preview-dialog-header">
        <div class="preview-dialog-badges">
          <span class="badge badge-cycle">${cycLabel}</span>
          <span class="badge badge-type">${typLabel}</span>
          ${r.featured ? '<span class="badge badge-featured">★</span>' : ''}
        </div>
        <button class="preview-dialog-close" onclick="APP.closePreview()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <h3 class="preview-dialog-title">${title}</h3>
      <p class="preview-dialog-desc">${desc}</p>
      <div class="preview-dialog-meta-grid">
        ${r.level ? `<div class="preview-dialog-meta"><strong>${lang === 'fr' ? 'Niveau :' : 'المستوى:'}</strong> ${r.level}</div>` : ''}
        <div class="preview-dialog-meta"><strong>${lang === 'fr' ? 'Téléchargements :' : 'مرات التحميل:'}</strong> ${r.downloads || 0}</div>
        ${r.category ? `<div class="preview-dialog-meta"><strong>${lang === 'fr' ? 'Catégorie :' : 'التصنيف:'}</strong> ${r.category}</div>` : ''}
        ${r.tags ? `<div class="preview-dialog-tags">${r.tags.split(',').map(t => `<span class="tag-pill" style="font-size:0.7rem;padding:0.15rem 0.5rem">${t.trim()}</span>`).join('')}</div>` : ''}
      </div>
      <div class="preview-dialog-actions">
        <button class="btn btn-primary" onclick="APP.closePreview()"><i class="fa-solid fa-download"></i> ${_('resource.download')}</button>
        <button class="btn btn-secondary" onclick="APP.closePreview()">${lang === 'fr' ? 'Fermer' : 'إغلاق'}</button>
      </div>`;
    overlay.classList.add('open');
  }

  function closePreview() {
    previewResource = null;
    const overlay = document.getElementById('preview-overlay');
    if (overlay) overlay.classList.remove('open');
  }

  // ─── Favoris ───
  function toggleFav(id) {
    const added = RM.toggleFav(id);
    if (added) fireConfetti();
    showToast(added ? _('toast.favAdded') : _('toast.favRemoved'), added ? '⭐' : '💔');
    renderResources();
    renderStats();
  }

  function goPage(p) {
    RM.setPage(p);
    renderResources();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetFilters() {
    RM.resetFilters();
    document.getElementById('resource-filter').value = '';
    document.getElementById('cycle-filter').value = 'all';
    document.getElementById('type-filter').value = 'all';
    document.getElementById('category-filter').value = 'all';
    document.getElementById('sort-filter').value = 'newest';
    document.getElementById('favorites-filter').classList.remove('active');
    document.getElementById('site-search').value = '';
    renderResources();
  }

  // ─── Event Listeners ───
  function setupEventListeners() {
    // Filtres
    const rf = document.getElementById('resource-filter');
    if (rf) rf.addEventListener('input', (e) => { RM.setSearch(e.target.value); renderResources(); });

    const cf = document.getElementById('cycle-filter');
    if (cf) cf.addEventListener('change', (e) => { RM.setCycle(e.target.value); renderResources(); });

    const tf = document.getElementById('type-filter');
    if (tf) tf.addEventListener('change', (e) => { RM.setType(e.target.value); renderResources(); });

    const caf = document.getElementById('category-filter');
    if (caf) caf.addEventListener('change', (e) => { RM.setCategory(e.target.value); renderResources(); });

    const sf = document.getElementById('sort-filter');
    if (sf) sf.addEventListener('change', (e) => { RM.setSort(e.target.value); renderResources(); });

    const ff = document.getElementById('favorites-filter');
    if (ff) ff.addEventListener('click', () => {
      const active = ff.classList.toggle('active');
      RM.setFavFilter(active);
      renderResources();
    });

    // Nav search
    const ss = document.getElementById('site-search');
    if (ss) ss.addEventListener('input', (e) => {
      RM.setSearch(e.target.value);
      switchTab('mathematiques');
      renderResources();
    });

    // Back to top
    window.addEventListener('scroll', () => {
      const btn = document.getElementById('back-to-top');
      if (!btn) return;
      btn.classList.toggle('visible', window.scrollY > 400);
    });

    // Preview overlay click to close
    const po = document.getElementById('preview-overlay');
    if (po) po.addEventListener('click', (e) => { if (e.target === po) closePreview(); });
  }

  // ─── Expose globally ───
  window.APP = { switchTab, toggleTheme, toggleLang, toggleFav, preview, closePreview, goPage, resetFilters };

  // ─── Démarrage ───
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
