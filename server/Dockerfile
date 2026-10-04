# Portfolio API. Build from the repo root so shared/ is included:
#   docker build -f server/Dockerfile -t ghcr.io/codecraftsman-jr/portfolio-api:latest .
FROM node:22-alpine
WORKDIR /app

# Server dependencies live at /app/node_modules so both server/ and shared/ resolve them.
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY shared ./shared
COPY server/src ./server/src
COPY server/scripts/migrate.ts server/scripts/seed.ts ./server/scripts/
COPY server/migrations ./server/migrations
COPY server/tsconfig.json ./server/tsconfig.json

# tsx reads server/tsconfig.json (the @shared alias) from the working directory.
WORKDIR /app/server
ENV NODE_ENV=production PORT=3020
USER node
EXPOSE 3020
# 127.0.0.1, not localhost: on Alpine localhost resolves to ::1 and the server listens on IPv4.
HEALTHCHECK --interval=15s --timeout=5s --retries=5 CMD wget -qO- http://127.0.0.1:3020/health || exit 1
CMD ["node", "--import", "tsx", "src/index.ts"]
