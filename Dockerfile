FROM node:18

RUN mkdir -p /app/src

WORKDIR /app/src

COPY package.json .

RUN pnpm install

COPY . .

EXPOSE 8080

CMD ["pnpm", "start"]