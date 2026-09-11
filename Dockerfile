FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
COPY pnpm-*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY server.js ./

EXPOSE 8080

CMD ["pnpm", "run", "start"]