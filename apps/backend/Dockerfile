FROM node:18-alpine

WORKDIR /app

# ✅ Use correct path to built package.json
COPY apps/dist/backend/package.json ./package.json

RUN npm install --omit=dev

COPY apps/dist/backend ./

EXPOSE 3000

CMD ["node", "main.js"]
