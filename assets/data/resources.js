/**
 * MoBendriss — Base de données des ressources
 * Données des ressources mathématiques par cycle et type
 */

const RESOURCES = [
    // ── Collège ───────────────────────────────────────────────
    {
        id: "col-001",
        title: "Les nombres relatifs",
        titleAr: "الأعداد الصحيحة",
        description: "Cours complet sur les nombres relatifs : définitions, droite graduée, comparaison et opérations.",
        descAr: "درس كامل عن الأعداد الصحيحة: التعريفات، المستقيم المدرج، المقارنة والعمليات.",
        cycle: "college",
        type: "cours",
        level: "1ère année collège",
        levelAr: "السنة الأولى إعدادي",
        tags: ["nombres", "relatifs", "bases"],
        downloadUrl: "#",
        previewUrl: "#"
    },
    {
        id: "col-002",
        title: "Fractions — Exercices corrigés",
        titleAr: "الكسور — تمارين محلولة",
        description: "Série d'exercices progressifs sur les fractions : simplification, opérations et problèmes.",
        descAr: "سلسلة تمارين تدريجية على الكسور: التبسيط، العمليات والمسائل.",
        cycle: "college",
        type: "td",
        level: "2ème année collège",
        levelAr: "السنة الثانية إعدادي",
        tags: ["fractions", "exercices"],
        downloadUrl: "#",
        previewUrl: "#"
    },
    {
        id: "col-003",
        title: "Géométrie dans l'espace",
        titleAr: "الهندسة في الفضاء",
        description: "Cours sur les figures géométriques dans l'espace : cube, prisme, pyramide et leurs propriétés.",
        descAr: "درس عن الأشكال الهندسية في الفضاء: المكعب، الموشور، الهرم وخصائصها.",
        cycle: "college",
        type: "cours",
        level: "3ème année collège",
        levelAr: "السنة الثالثة إعدادي",
        tags: ["géométrie", "espace", "figures"],
        downloadUrl: "#",
        previewUrl: "#"
    },
    {
        id: "col-004",
        title: "Examen blanc — 3ème année collège",
        titleAr: "امتحان إعدادي — السنة الثالثة",
        description: "Examen blanc avec corrigé complet pour la préparation au brevet.",
        descAr: "امتحان تدريبي مع التصحيح الكامل للتحضير للامتحان الإعدادي.",
        cycle: "college",
        type: "exam",
        level: "3ème année collège",
        levelAr: "السنة الثالثة إعدادي",
        tags: ["examen", "brevet", "blanc"],
        downloadUrl: "#",
        previewUrl: "#"
    },

    // ── Lycée ─────────────────────────────────────────────────
    {
        id: "lyc-001",
        title: "Limites et continuité",
        titleAr: "النهايات والاتصال",
        description: "Cours approfondi sur les limites de fonctions, formes indéterminées et théorème des valeurs intermédiaires.",
        descAr: "درس معمق في نهايات الدوال، الأشكال غير المحددة ونظرية القيم المتوسطة.",
        cycle: "lycee",
        type: "cours",
        level: "1ère année bac",
        levelAr: "السنة الأولى باكالوريا",
        tags: ["limites", "continuité", "analyse"],
        downloadUrl: "#",
        previewUrl: "#"
    },
    {
        id: "lyc-002",
        title: "Dérivation — Exercices types",
        titleAr: "التفاضل — تمارين نمطية",
        description: "Recueil d'exercices types sur la dérivation : dérivée usuelle, sens de variation, extremums.",
        descAr: "مجموعة تمارين نمطية على التفاضل: المشتقة الشائعة، اتجاه التغير، القيم القصوى.",
        cycle: "lycee",
        type: "td",
        level: "1ère année bac",
        levelAr: "السنة الأولى باكالوريا",
        tags: ["dérivation", "variation", "extremums"],
        downloadUrl: "#",
        previewUrl: "#"
    },
    {
        id: "lyc-003",
        title: "Probabilités et statistiques",
        titleAr: "الاحتمالات والإحصاء",
        description: "Cours sur les probabilités : événements, arbre de probabilités, loi binomiale.",
        descAr: "درس في الاحتمالات: الأحداث، شجرة الاحتمالات، التوزيع الثنائي.",
        cycle: "lycee",
        type: "cours",
        level: "2ème année bac",
        levelAr: "السنة الثانية باكالوريا",
        tags: ["probabilités", "binomiale", "stats"],
        downloadUrl: "#",
        previewUrl: "#"
    },
    {
        id: "lyc-004",
        title: "Examen national — Sciences maths",
        titleAr: "الامتحان الوطني — علوم رياضية",
        description: "Sujets d'examens nationaux corrigés pour la filière Sciences Mathématiques.",
        descAr: " مواضيع الامتحانات الوطنية المحلولة لشعبة العلوم الرياضية.",
        cycle: "lycee",
        type: "exam",
        level: "2ème année bac",
        levelAr: "السنة الثانية باكالوريا",
        tags: ["examen", "national", "sciences-maths"],
        downloadUrl: "#",
        previewUrl: "#"
    },
    {
        id: "lyc-005",
        title: "Suites numériques",
        titleAr: "التسلسلات العددية",
        description: "Cours complet sur les suites arithmétiques, géométriques et suites récurrentes.",
        descAr: "درس كامل عن التسلسلات الحسابية، الهندسية والتسلسلات التكرارية.",
        cycle: "lycee",
        type: "cours",
        level: "1ère année bac",
        levelAr: "السنة الأولى باكالوريا",
        tags: ["suites", "arithmétique", "géométrique"],
        downloadUrl: "#",
        previewUrl: "#"
    },
    {
        id: "lyc-006",
        title: "Trigonométrie — TD",
        titleAr: "علم المثلثات — تطبيقات",
        description: "Travaux dirigés sur les fonctions trigonométriques, équations et inéquations.",
        descAr: "تطبيقات على الدوال المثلثية، المعادلات والمتباينات.",
        cycle: "lycee",
        type: "td",
        level: "1ère année bac",
        levelAr: "السنة الأولى باكالوريا",
        tags: ["trigonométrie", "équations"],
        downloadUrl: "#",
        previewUrl: "#"
    },

    // ── Supérieur ─────────────────────────────────────────────
    {
        id: "sup-001",
        title: "Analyse réelle — Fondamentaux",
        titleAr: "التحليل الحقيقي — الأساسيات",
        description: "Cours universitaire sur l'analyse réelle : suites, séries, intégration de Riemann.",
        descAr: "درس جامعي في التحليل الحقيقي: التسلسلات، المتسلسلات، تكامل ريمان.",
        cycle: "superieur",
        type: "cours",
        level: "1ère année universitaire",
        levelAr: "السنة الأولى جامعي",
        tags: ["analyse", "riemann", "séries"],
        downloadUrl: "#",
        previewUrl: "#"
    },
    {
        id: "sup-002",
        title: "Algèbre linéaire — Matrices",
        titleAr: "الجبر الخطوي — المصفوفات",
        description: "TD sur les matrices : opérations, déterminants, systèmes linéaires.",
        descAr: "تطبيقات على المصفوفات: العمليات، المحددات، الأنظمة الخطية.",
        cycle: "superieur",
        type: "td",
        level: "1ère année universitaire",
        levelAr: "السنة الأولى جامعي",
        tags: ["algèbre", "matrices", "déterminants"],
        downloadUrl: "#",
        previewUrl: "#"
    },
    {
        id: "sup-003",
        title: "Examen final — Analyse I",
        titleAr: "امتحان نهائي — تحليل I",
        description: "Examen final corrigé d'Analyse I pour les étudiants de MPSI/Licence.",
        descAr: "امتحان نهائي محلول في التحليل I لطلبة MPSI/الإجازة.",
        cycle: "superieur",
        type: "exam",
        level: "1ère année universitaire",
        levelAr: "السنة الأولى جامعي",
        tags: ["examen", "analyse-I", "final"],
        downloadUrl: "#",
        previewUrl: "#"
    },
    {
        id: "sup-004",
        title: "Équations différentielles",
        titleAr: "المعادلات التفاضلية",
        description: "Cours sur les équations différentielles du 1er et 2nd ordre : méthodes de résolution.",
        descAr: "درس عن المعادلات التفاضلية من الرتبة الأولى والثانية: طرق الحل.",
        cycle: "superieur",
        type: "cours",
        level: "2ème année universitaire",
        levelAr: "السنة الثانية جامعي",
        tags: ["EDO", "différentielles", "résolution"],
        downloadUrl: "#",
        previewUrl: "#"
    },
    {
        id: "sup-005",
        title: "Topologie de ℝ",
        titleAr: "طوبولوجيا ℝ",
        description: "Article introductif sur la topologie de ℝ : ouverts, fermés, compacts et connexité.",
        descAr: "مقال تعريفي حول طوبولوجيا ℝ: المفتوحات، المغلقات، المتراصات والتواصل.",
        cycle: "superieur",
        type: "recherche",
        level: "2ème année universitaire",
        levelAr: "السنة الثانية جامعي",
        tags: ["topologie", "compacts", "connexité"],
        downloadUrl: "#",
        previewUrl: "#"
    },
    {
        id: "sup-006",
        title: "Introduction à l'analyse fonctionnelle",
        titleAr: "مقدمة في التحليل الدالي",
        description: "Notes de recherche sur les espaces de Hilbert, opérateurs linéaires continus.",
        descAr: "ملاحظات بحثية حول فضاءات هيلبرت، المؤثرات الخطية المستمرة.",
        cycle: "superieur",
        type: "recherche",
        level: "3ème année universitaire",
        levelAr: "السنة الثالثة جامعي",
        tags: ["hilbert", "opérateurs", "fonctionnelle"],
        downloadUrl: "#",
        previewUrl: "#"
    }
];

// ── Traductions i18n ─────────────────────────────────────────
const I18N = {
    fr: {
        // Navigation
        "nav.accueil": "Accueil",
        "nav.apropos": "À propos",
        "nav.maths": "Mathématiques",
        "nav.recherche": "Recherche",
        "nav.faq": "FAQ",
        "nav.contact": "Contact",

        // Accessibility
        "accessibility.skip": "Aller au contenu principal",

        // Header
        "eyebrow": "Enseignant de mathématiques",
        "tagline": "Plateforme académique des mathématiques",

        // Hero
        "hero.kicker": "Plateforme académique gratuite",
        "hero.title": "Apprenez les mathématiques avec rigueur et clarté.",
        "hero.description": "Cours structurés, exercices progressifs, examens corrigés et ressources avancées pour les cycles secondaire et supérieur.",
        "hero.start": "Commencer",
        "hero.research": "Recherche",

        // Stats
        "stats.cycles": "Cycles éducatifs",
        "stats.resources": "Ressources évolutives",
        "stats.languages": "Langues",

        // À propos
        "apropos.heading": "À propos",
        "apropos.bio": "Enseignant de mathématiques passionné par la pédagogie et la transmission des savoirs. Cette plateforme regroupe des ressources gratuites pour les élèves et les étudiants.",
        "apropos.domaines": "Domaines d'expertise",
        "apropos.tag1": "Algèbre",
        "apropos.tag2": "Analyse",
        "apropos.tag3": "Géométrie",
        "apropos.tag4": "Didactique",

        // Mathématiques
        "maths.heading": "Mathématiques",
        "maths.sub": "Explorez les ressources par cycle et par type.",

        // Filtres
        "filter.allCycles": "Tous les cycles",
        "filter.college": "Collège",
        "filter.lycee": "Lycée",
        "filter.superieur": "Supérieur",
        "filter.allTypes": "Tous les types",
        "filter.cours": "Cours",
        "filter.td": "TD",
        "filter.exam": "Examens",
        "filter.recherche": "Recherche",
        "filter.favorites": "Favoris",
        "filter.noResults": "Aucun résultat trouvé.",

        // Recherche
        "recherche.heading": "Recherche & Supérieur",
        "recherche.sub": "Ressources avancées pour les étudiants du supérieur.",

        // FAQ
        "faq.heading": "Questions fréquentes",
        "faq.q1": "Comment télécharger un document ?",
        "faq.a1": "Cliquez sur le bouton « Télécharger » de la ressource souhaitée.",
        "faq.q2": "Les ressources sont-elles gratuites ?",
        "faq.a2": "Oui, toutes les ressources sont gratuites et libres d'usage pédagogique.",
        "faq.q3": "Comment vous contacter ?",
        "faq.a3": "Utilisez le formulaire de l'onglet Contact.",

        // Contact
        "contact.heading": "Contact",
        "contact.intro": "Pour toute question ou collaboration, écrivez-moi.",
        "contact.nameLabel": "Nom",
        "contact.emailLabel": "E-mail",
        "contact.messageLabel": "Message",
        "contact.submit": "Envoyer",

        // Sidebar
        "sidebar.mathBtn": "Mathématiques",
        "sidebar.researchBtn": "Recherche",
        "sidebar.newsTitle": "Actualités",
        "sidebar.newBadge": "Nouveau",
        "sidebar.news1": "Mise en ligne des ressources pour le cycle collégial.",
        "sidebar.news2": "Ajout des séries d'exercices pour la 1ère BAC.",

        // Légal
        "legal.heading": "Confidentialité",
        "legal.privacy1": "Aucune donnée personnelle n'est collectée en dehors du formulaire de contact.",

        // Footer
        "footer.rights": "© 2026 MoBendriss. Tous droits réservés.",
        "footer.tagline": "Conçu avec rigueur.",
        "footer.legalLink": "Confidentialité",

        // Search
        "search.placeholder": "Rechercher…",

        // Resource actions
        "resource.download": "Télécharger",
        "resource.preview": "Aperçu",
        "resource.count": "{count} ressource(s) trouvée(s)",

        // Cycle labels
        "cycle.college": "Collège",
        "cycle.lycee": "Lycée",
        "cycle.superieur": "Supérieur"
    },

    ar: {
        // Navigation
        "nav.accueil": "الرئيسية",
        "nav.apropos": "حول",
        "nav.maths": "الرياضيات",
        "nav.recherche": "البحث",
        "nav.faq": "أسئلة شائعة",
        "nav.contact": "اتصل بنا",

        // Accessibility
        "accessibility.skip": "الانتقال إلى المحتوى الرئيسي",

        // Header
        "eyebrow": "أستاذ الرياضيات",
        "tagline": "منصة أكاديمية للرياضيات",

        // Hero
        "hero.kicker": "منصة أكاديمية مجانية",
        "hero.title": "تعلّم الرياضيات بدقة ووضوح.",
        "hero.description": "دروس منظمة، تمارين تدريجية، امتحانات محلولة وموارد متقدمة للسلك الثانوي والتعليم العالي.",
        "hero.start": "ابدأ الآن",
        "hero.research": "البحث",

        // Stats
        "stats.cycles": "أطوار تعليمية",
        "stats.resources": "موارد متجددة",
        "stats.languages": "لغات",

        // À propos
        "apropos.heading": "حول",
        "apropos.bio": "أستاذ رياضيات شغوف بالبيداغوجيا ونقل المعرفة. تجمع هذه المنصة موارد مجانية للتلاميذ والطلاب.",
        "apropos.domaines": "مجالات الخبرة",
        "apropos.tag1": "الجبر",
        "apropos.tag2": "التحليل",
        "apropos.tag3": "الهندسة",
        "apropos.tag4": "الديداكتيك",

        // Mathématiques
        "maths.heading": "الرياضيات",
        "maths.sub": "استكشف الموارد حسب الطور والنوع.",

        // Filtres
        "filter.allCycles": "جميع الأطوار",
        "filter.college": "الإعدادي",
        "filter.lycee": "الثانوي",
        "filter.superieur": "التعليم العالي",
        "filter.allTypes": "جميع الأنواع",
        "filter.cours": "دروس",
        "filter.td": "تطبيقات",
        "filter.exam": "امتحانات",
        "filter.recherche": "بحث",
        "filter.favorites": "المفضلة",
        "filter.noResults": "لم يتم العثور على نتائج.",

        // Recherche
        "recherche.heading": "البحث والتعليم العالي",
        "recherche.sub": "موارد متقدمة لطلبة التعليم العالي.",

        // FAQ
        "faq.heading": "أسئلة متكررة",
        "faq.q1": "كيف أقوم بتحميل وثيقة؟",
        "faq.a1": "انقر على زر «تحميل» الخاص بالموارد المطلوبة.",
        "faq.q2": "هل الموارد مجانية؟",
        "faq.a2": "نعم، جميع الموارد مجانية ومفتوحة للاستخدام التعليمي.",
        "faq.q3": "كيف أتواصل معكم؟",
        "faq.a3": "استخدم نموذج الاتصال في تبويب «اتصل بنا».",

        // Contact
        "contact.heading": "اتصل بنا",
        "contact.intro": "لأي سؤال أو تعاون، راسلني.",
        "contact.nameLabel": "الاسم",
        "contact.emailLabel": "البريد الإلكتروني",
        "contact.messageLabel": "الرسالة",
        "contact.submit": "إرسال",

        // Sidebar
        "sidebar.mathBtn": "الرياضيات",
        "sidebar.researchBtn": "البحث",
        "sidebar.newsTitle": "آخر الأخبار",
        "sidebar.newBadge": "جديد",
        "sidebar.news1": "نشر موارد السلك الإعدادي.",
        "sidebar.news2": "إضافة سلاسل تمارين للسنة الأولى باكالوريا.",

        // Légal
        "legal.heading": "الخصوصية",
        "legal.privacy1": "لا يتم جمع أي بيانات شخصية خارج نموذج الاتصال.",

        // Footer
        "footer.rights": "© 2026 MoBendriss. جميع الحقوق محفوظة.",
        "footer.tagline": "صُمم بدقة.",
        "footer.legalLink": "الخصوصية",

        // Search
        "search.placeholder": "بحث…",

        // Resource actions
        "resource.download": "تحميل",
        "resource.preview": "معاينة",
        "resource.count": "تم العثور على {count} مورد(موارد)",

        // Cycle labels
        "cycle.college": "الإعدادي",
        "cycle.lycee": "الثانوي",
        "cycle.superieur": "التعليم العالي"
    }
};
