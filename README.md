# MoBendriss Academy — منصة أكاديمية للرياضيات

Plateforme académique de mathématiques avec cours, exercices corrigés, examens et ressources scientifiques.

🌐 **Live:** [https://mobendriss.github.io](https://mobendriss.github.io)

---

## 🚀 Déploiement sur GitHub Pages

### 🔄 Automatic (via GitHub Actions)

Le déploiement est automatisé via GitHub Actions. À chaque push sur la branche `main` ou `master`:

1. Une base de données PostgreSQL temporaire est créée
2. Le schéma Drizzle est poussé
3. Les données sont seedées
4. Les données statiques sont générées
5. Next.js compile le site en static (output: export)
6. Le résultat est déployé sur GitHub Pages

### 📦 Manual Build

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer la base de données locale
echo "DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db" > .env

# 3. Pousser le schéma
npx drizzle-kit push

# 4. Seeder la base
npx tsx --env-file=.env src/db/seed.ts

# 5. Générer les données statiques
npm run generate:data

# 6. Construire le site
npm run build

# 7. Le site statique est dans le dossier `out/`
```

### 🏠 GitHub Pages Repository

Ce projet est conçu pour le dépôt **`mobendriss.github.io`** (user site).

Si vous utilisez un dépôt de projet (ex: `username/mobendriss`), décommentez la ligne `basePath` dans `next.config.ts`.

---

## 🛠️ Stack Technique

| Technologie | Usage |
|------------|-------|
| **Next.js** (App Router) | Framework React |
| **TypeScript** | Langage |
| **PostgreSQL** | Base de données |
| **Drizzle ORM** | Accès aux données |
| **Tailwind CSS** | Styles |
| **Font Awesome** | Icônes |
| **react-hot-toast** | Notifications |
| **canvas-confetti** | Animations |

## 📂 Structure du Projet

```
├── .github/workflows/deploy.yml    # CI/CD GitHub Actions
├── public/
│   ├── data/resources.json          # Données statiques générées
│   ├── icon.svg                     # Favicon
│   ├── logo.svg                     # Logo complet
│   └── manifest.webmanifest         # PWA manifest
├── src/
│   ├── app/
│   │   ├── api/                     # API routes
│   │   ├── layout.tsx              # Layout racine
│   │   ├── page.tsx                # Page d'accueil
│   │   ├── not-found.tsx           # Page 404
│   │   ├── sitemap.ts             # Sitemap
│   │   └── globals.css             # Styles globaux
│   ├── components/                 # Composants React
│   ├── db/
│   │   ├── schema.ts              # Schéma Drizzle
│   │   ├── index.ts               # Client DB
│   │   └── seed.ts                # Données de test
│   └── generate-static-data.ts    # Générateur de données statiques
├── next.config.ts
├── package.json
└── tsconfig.json
```
