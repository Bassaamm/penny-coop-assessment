# Penny Coop Assessment

## Features

### Required

- Signup, Signin, and Signout functionality
- Session persistence for 8 hours
- Code hosted on GitHub
- A walkthrough recording demonstrating functionality and code

### Bonus (Implemented)

- Forgot Password feature
- List of protected data (Users / Products)
- MongoDB Atlas as cloud database
- Deployment on Google Cloud Platform (Cloud Run)

---

## Tech Stack

- **Frontend**: Angular (Nx workspace)
- **Backend**: NestJS (Nx workspace)
- **Database**: MongoDB Atlas
- **Cache**: Redis via Upstash
- **Deployment**: Google Cloud Run
- **CI/CD**: GitHub Actions
- **Monorepo Management**: Nx.dev

---

## Live Demo

- **Frontend**: [https://penny-coop-frontend-url](https://penny-coop-frontend-678553266708.europe-west1.run.app/landing)
- **Backend**: [https://penny-coop-backend-url](https://penny-coop-backend-678553266708.europe-west1.run.app)

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/penny-coop-assessment.git

cd penny-coop-assessment

npm install
```

### Environment Variables

```bash
JWT_SECRET=your-secret-key
JWT_EXPIRATION_TIME=30m
JWT_REFRESH_TOKEN_EXPIRATION_TIME=8m

FRONTEND_URL=http://localhost:4200

REDIS_HOST=your-upstash-host
REDIS_PORT=6379
REDIS_USERNAME=default
REDIS_PASSWORD=your-password
REDIS_TLS=true

MONGODB_URI=mongodb+srv://... your Mongo Atlas URI
MONGODB_USERNAME=
MONGODB_PASSWORD=
```

### Running Locally

```bash
npx nx serve penny-coop-assessment
```

#### Runs on: http://localhost:4200

### Backend (via Docker Compose)

```bash
docker-compose up --build
```

#### API available at: http://localhost:3000/api

## Docker Compose

### The docker-compose.yml (inside apps/backend) runs only backend-related services:

```bash
backend

mongodb (local dev DB)

redis (local dev cache)
```

## Build Commands

### Backend (manual build)

```bash
npx nx run backend:build
```

### Frontend (production build)

```bash
npx nx build penny-coop-assessment --configuration=production
```

## Deployment Overview

### Both frontend and backend are deployed to Google Cloud Run using GitHub Actions.

#### - Docker images are pushed to Google Artifact Registry

#### - Deployments are triggered automatically on push to main

#### - Environment variables are injected using --set-env-vars in gcloud run deploy

```bash
apps/
├── backend/              → NestJS backend
└── penny-coop-assessment/ → Angular frontend
```
