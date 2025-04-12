FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx nx run backend:build

FROM node:18-alpine AS runner
WORKDIR /app

COPY apps/dist/backend/package.json ./package.json
RUN npm install --omit=dev

COPY apps/dist/backend ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
