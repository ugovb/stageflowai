# Rapport Technique : Architecture & Stratégie StageFlow AI

Ce document présente l'état des lieux technique, l'architecture logicielle et la feuille de route pour le développement, le déploiement et la maintenance de la plateforme **StageFlow AI**. Il répond aux points clés de vigilance identifiés : Cahier des charges, Architecture, Scalabilité, Sécurité et DevOps.

---

## 1. Cahier des Charges & Scope (MVP)

Le projet est piloté par une approche **Agile**, structurée autour d'un **Product Requirement Document (PRD)** vivant. Le développement est découpé en "Épopées" (Epics) claires pour garantir une livraison itérative.

### État d'avancement des Épopées
*   ✅ **Epic 1 : Foundation** (Terminée)
    *   Mise en place du Monorepo (Turborepo).
    *   Configuration de la Base de Données (PostgreSQL) et de l'Authentification (Supabase).
*   ✅ **Epic 2 : Socratic Engine** (Terminée)
    *   Moteur de Chatbot IA contextuel (LangChain + OpenRouter).
    *   Système de "Phases" et validation des compétences.
*   ✅ **Epic 3 : Gamification & UX** (Terminée)
    *   Dashboard interactif ("Metro Map").
    *   Système de profil et d'inventaire de compétences (RPG-style).
*   🔄 **Epic 4 : Search & Apply** (En cours de finalisation)
    *   Moteur de recherche d'entreprises (DuckDuckGo integration).
    *   Générateur de CV PDF automatisé.

### Ressources & Contraintes
*   **Budget :** Optimisation des coûts (Tier gratuit pour le MVP).
*   **Temps :** Cycle de développement court pour tester le "Market Fit".

---

## 2. Architecture Logicielle

Nous avons opté pour une architecture **"Headless Modular Monolith"** moderne, favorisant la séparation des préoccupations tout en gardant une complexité de gestion faible.

### Stack Technique
*   **Frontend (L'Experience Utilisateur) :**
    *   **Framework :** Next.js 14+ (React Server Components).
    *   **UI/UX :** Tailwind CSS, Framer Motion (Animations), Shadcn/UI (Composants accessibles).
    *   **Raison du choix :** Performance (SSR/SEO), réactivité et écosystème riche.
*   **Backend (L'Intelligence) :**
    *   **Framework :** FastAPI (Python).
    *   **Logic :** LangChain (Orchestration IA), Pydantic (Validation de données).
    *   **Raison du choix :** Python est le standard pour l'IA. FastAPI offre des performances asynchrones exceptionnelles.
*   **Base de Données & Auth :**
    *   **Provider :** Supabase (PostgreSQL managé).
    *   **Features :** Auth (JWT), Database, Vector Store (pgvector pour l'IA).

### Flux de Données
1.  **Client (Next.js) :** Interagit avec l'API via des requêtes REST sécurisées (JWT).
2.  **API Gateway (FastAPI) :** Reçoit les requêtes, valide les données, interroge l'IA ou la DB.
3.  **IA (OpenRouter) :** Traite le langage naturel et renvoie des réponses en streaming (SSE).

---

## 3. Gestion Dev Local & API Tierces

### Environnement de Développement
*   **Monorepo :** Un seul dépôt Git contenant le Front et le Back, géré par `Turborepo`.
*   **Commandes unifiées :** `pnpm dev` lance toute la stack en parallèle.
*   **Configuration :** Gestion stricte des variables d'environnement (`.env`) non versionnées.

### API Tierces & Coûts
| Service | Rôle | Modèle de Coût |
| :--- | :--- | :--- |
| **OpenRouter** | Accès aux LLM (GPT-4o, etc.) | Pay-as-you-go (Flexible) |
| **Supabase** | DB, Auth, Stockage | Gratuit (MVP) puis mensuel |
| **DuckDuckGo** | Recherche d'entreprises | Gratuit ( via librairie Python) |
| **Vercel** | Hébergement Frontend | Gratuit (Hobby) |

---

## 4. Scalabilité, Persistance & Disponibilité

### Persistance des Données
*   Toutes les données critiques (Utilisateurs, Chats, Compétences) sont stockées dans **PostgreSQL** sur Supabase.
*   Backups automatiques quotidiens (Point-in-time recovery disponible en version payante).

### Scalabilité
*   **Frontend :** Déployé sur **Vercel (Edge Network)**. Scalabilité automatique et mondiale.
*   **Backend :** FastAPI est "Stateless". Il peut être déployé sur des conteneurs (Docker) et scalé horizontalement (plusieurs instances) derrière un Load Balancer si la charge augmente.
*   **Database :** PostgreSQL peut gérer des millions de lignes. Supabase permet de monter en puissance (Compute/RAM) instantanément.

---

## 5. Déploiement, DevOps & Sécurité

### Pipeline DevOps
*   **CI/CD :** GitHub Actions (à configurer) pour lancer les tests (Pytest/Jest) et le déploiement automatique sur `git push`.
*   **Conteneurisation :** Le Backend est Dockerisé pour garantir que "ça marche partout comme sur ma machine".

### Sécurité & RGPD
*   **Authentification :** Déléguée à Supabase Auth. Nous ne stockons **jamais** de mots de passe en clair.
*   **Isolation des données :** Utilisation de **RLS (Row Level Security)** dans PostgreSQL : un utilisateur ne peut techniquement pas lire les données d'un autre, même en cas de faille API.
*   **Données Personnelles :** Minimisation de la collecte (Nom, Email, École). Conformité RGPD à prévoir (Droit à l'oubli, Export des données).

---

## 6. Maintenance & Monitoring

*   **Logs :** Centralisation des logs (Frontend et Backend) pour le débogage.
*   **Monitoring Erreurs :** Intégration prévue de **Sentry** pour être alerté en temps réel des crashs utilisateurs.
*   **Analytics :** Utilisation de **PostHog** (Privacy-friendly) pour comprendre le comportement utilisateur sans utiliser Google Analytics.

---

### Conclusion
L'architecture de StageFlow AI est conçue pour être **robuste dès le premier jour** (Sécurité, Type Safety) tout en restant **flexible** pour le prototypage rapide. Nous avons évité la complexité inutile (Kubernetes, Microservices) pour nous concentrer sur la valeur produit : l'IA et l'Expérience Utilisateur.
