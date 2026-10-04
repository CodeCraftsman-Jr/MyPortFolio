FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build && node copy-files.js

FROM nginx:alpine
LABEL org.opencontainers.image.source="https://github.com/VarSys-Org/MyPortFolio"
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
