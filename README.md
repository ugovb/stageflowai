# 🚀 StageFlow AI

**L'assistant IA qui transforme vos expériences en candidatures percutantes.**

StageFlow AI guide les étudiants à travers un processus d'introspection socratique pour identifier leurs compétences cachées, puis génère des documents de candidature personnalisés.

## ✨ Fonctionnalités

- 🤖 **Coaching IA Socratique** - Un assistant qui pose les bonnes questions
- 📊 **Metro Map** - Visualisez votre progression en 10 étapes
- 🎯 **Skill Inventory** - Vos compétences extraites et validées
- 🔍 **Recherche d'entreprises** - Trouvez des stages par zone et domaine
- 📄 **Génération de CV/Lettres** - Documents personnalisés en PDF

## 🛠️ Installation

### Option A : Self-Hosted (Docker)

```bash
# 1. Cloner le repo
git clone https://github.com/[username]/stageflow-ai.git
cd stageflow-ai

# 2. Configurer les variables d'environnement
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

# 3. Ajouter votre clé OpenRouter dans apps/api/.env
# OPENROUTER_API_KEY=sk-or-v1-xxxxx

# 4. Lancer l'application
docker-compose up --build

# 5. Accéder à http://localhost:3000
```

### Option B : Cloud (stageflow.app)
Rendez-vous sur stageflow.app et créez un compte.

## 📁 Structure du Projet

```
stageflow-ai/
├── apps/
│   ├── web/           # Next.js 14 (React)
│   │   ├── src/
│   │   │   ├── app/           # App Router pages
│   │   │   ├── components/    # Composants React
│   │   │   └── lib/           # Utilitaires
│   ├── api/           # FastAPI (Python)
│   │   ├── app/
│   │   │   ├── api/       # Routes API
│   │   │   ├── core/      # Config, DB
│   │   │   └── services/  # Logique métier
│   │   └── migrations/    # SQL migrations
├── docker-compose.yml
└── README.md
```

## 🔑 Variables d'Environnement

| Variable | Description | Requis |
| :--- | :--- | :--- |
| `OPENROUTER_API_KEY` | Clé API OpenRouter | ✅ |
| `DATABASE_URL` | URL PostgreSQL | ✅ |
| `JWT_SECRET` | Secret pour les tokens | ✅ |

## 🤝 Contribution
Les contributions sont bienvenues ! Voir CONTRIBUTING.md.

## 📄 Licence
MIT - Voir LICENSE

## 🔗 Liens

- Documentation
- Politique de Confidentialité
- CGU

---

## COMMANDES UTILES

```bash
# Développement
docker-compose up --build

# Logs backend uniquement
docker-compose logs -f backend

# Reset DB
docker-compose down -v
docker-compose up --build

# Tests
cd apps/api && pytest
cd apps/web && npm test
```
