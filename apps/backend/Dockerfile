FROM node:20-alpine

WORKDIR /repo

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npx nx build backend

EXPOSE 3000

# Run the built file. Adjust the path if your NX output is elsewhere.
CMD ["node", "apps/dist/main.js"]
