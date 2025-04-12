# Stage 1: Build Angular App
FROM node:18-alpine as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npx nx build penny-coop-assessment --configuration=production

FROM nginx:alpine

COPY --from=builder /app/dist/apps/penny-coop-assessment /usr/share/nginx/html
COPY apps/penny-coop-assessment/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
