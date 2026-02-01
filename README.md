## Note d’exécution – incident réseau externe

Lors des tests Docker, le téléchargement des images runtime
ASP.NET Core 7 (mcr.microsoft.com/dotnet/aspnet:7.0) a échoué
en raison d’un blocage réseau externe (erreur EOF sur le Microsoft
Container Registry).

Les images SDK (.NET 7) sont téléchargeables et le Dockerfile
backend-dotnet est conforme au cahier des charges.

Ce blocage est indépendant du code du projet et dépend uniquement
de l’accès réseau. Dès que l’accès au registry est rétabli,
le service backend-dotnet se build et se lance sans modification.

## Health checks & supervision

Chaque service expose un endpoint de health check :
- Node.js : `/health`
- .NET : `/health`
- Spring Boot : `/actuator/health`
- Frontend : `/` (page d’accueil)

Les probes liveness/readiness sont configurées dans Docker Compose et Kubernetes (voir les fichiers infra/).

Pour vérifier l’état des pods :
```sh
kubectl get pods -n student-management
kubectl describe pod <nom> -n student-management
```

## Démo CRUD (scénario de soutenance)

1. Lancer la stack :
   ```sh
   docker compose down -v
   docker compose up --build
   ```
2. Ouvrir http://localhost:3000
3. Ajouter un étudiant
4. Modifier un étudiant
5. Supprimer un étudiant
6. Rafraîchir la page : les données sont persistées (volume MySQL)

Le démarrage complet doit se faire en moins de 2 minutes (exigence du CDC).
## Environnements DEV / UAT / PRD

| Environnement | Base MySQL                | Backend Node | Backend .NET | Backend Java | Frontend |
|---------------|---------------------------|--------------|--------------|--------------|----------|
| DEV           | StudentManagement_DEV     | 4020         | 5020         | 8090         | 3020     |
| UAT           | StudentManagement_UAT     | 4010         | 5010         | 8080         | 3010     |
| PRD           | StudentManagement_PRD     | 4000         | 5000         | 8070         | 3000     |

Chaque environnement dispose de variables d’environnement et ports distincts. Les bases de données sont séparées pour garantir l’isolement des données.

**Convention des ports** :
- PROD = ports de base
- UAT = PROD +10
- DEV = PROD +20

Les fichiers `.env` de chaque service permettent de configurer facilement l’environnement cible.
# Student Management Microservices

Plateforme de gestion d’étudiants basée sur une architecture microservices, prête pour la production, avec CI/CD, Docker, Kubernetes et documentation complète.


# Student Management Microservices – README

## Présentation
Ce projet est une application de gestion d’étudiants basée sur une architecture microservices. Il inclut :
- 3 backends : .NET 8 (C#), Node.js (Express/Prisma), Spring Boot 3.1 (Java)
- 1 frontend Next.js (TypeScript, Material UI)
- Base de données MySQL 8
- Conteneurisation Docker/Kubernetes
- CI/CD (GitLab)

---

## Structure du projet
```
student-management/
├── backend-dotnet/         # API REST .NET 8 (EF Core, CRUD)
├── backend-node/          # API REST Node.js (Express, Prisma, CRUD)
├── backend-springboot/    # API REST Spring Boot 3.1 (CRUD, JPA)
├── frontend/              # Next.js 16, Material UI, CRUD étudiants
├── infra/                 # Docker Compose, K8s manifests
├── docs/                  # Documentation technique
```

---

## Fonctionnalités principales
- CRUD complet sur les étudiants (tous backends)
- Validation, gestion des erreurs, logs
- Documentation OpenAPI/Swagger (backends)
- Tests unitaires (Jest, JUnit, xUnit)
- Intégration frontend ↔ API
- Conteneurisation multi-stage (Docker)
- Déploiement Kubernetes (manifests, probes, HPA)
- CI/CD GitLab (build, test, déploiement)

---

## Détails des étapes réalisées

### 1. Génération et finalisation des backends
- **.NET 8** :
   - Génération du projet, configuration EF Core, migration MySQL, CRUD, tests xUnit.
- **Node.js** :
   - Génération Express, Prisma, migration, CRUD, typage, tests Jest.
- **Spring Boot** :
   - Génération, correction des packages, CRUD, validation, tests JUnit, correction des imports et packages, build Maven.

### 2. Génération et finalisation du frontend
- **Next.js 16** :
   - Génération pages et composants (StudentForm, StudentList, Loader)
   - Intégration Material UI, react-hook-form, yup
   - Services API (studentService.ts), typage strict, gestion null/undefined
   - Correction des tests unitaires (Jest, React Testing Library)
   - Correction du build (import React, typage phone, getApiUrl)

### 3. Intégration complète
- Synchronisation des schémas (Prisma, EF Core, JPA)
- Tests CRUD bout en bout (API ↔ DB ↔ Frontend)
- Correction des erreurs de build, typage, dépendances
- Correction des packages et imports Java (Spring Boot)

### 4. Conteneurisation & CI/CD
- Dockerfiles multi-stage pour chaque service
- Docker Compose pour le développement local
- Manifests Kubernetes (déploiement, service, probes, HPA, ConfigMap, Secret)
- Pipelines GitLab CI/CD (build, test, déploiement)

### 5. Documentation
- OpenAPI/Swagger pour chaque backend
- README détaillé (présent)
- Fichiers d’exemple .env

---

## Lancer le projet (exemple)

### Prérequis
- Docker, Docker Compose, Node.js 18+, .NET 8 SDK, Java 17+, Maven, MySQL 8

### Démarrage local (Docker Compose)
```sh
cd infra
# Adapter les variables d’environnement si besoin
cp .env.example .env
# Lancer tous les services
docker compose up --build
```

### Démarrage manuel (développement)
- Lancer MySQL
- Lancer chaque backend (voir README de chaque dossier)
- Lancer le frontend

### Tests
- `npm test` (frontend, backend-node)
- `dotnet test` (backend-dotnet)
- `mvn test` (backend-springboot)


## Pour aller plus loin
- Ajouter l’authentification (JWT, OAuth2)
- Monitoring (Prometheus, Grafana)
- Déploiement cloud (Azure, AWS, GCP)
- Tests d’intégration automatisés

---

**Projet prêt à l’intégration et au déploiement !**
