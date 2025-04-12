FROM node:18-alpine

WORKDIR /app

COPY apps/dist/backend/package.json ./package.json
RUN npm install --omit=dev

COPY apps/dist/backend ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
