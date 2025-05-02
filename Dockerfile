FROM node:18

RUN mkdir -p /app/src

WORKDIR /app/src

COPY package.json pnpm-lock.yaml ./

# Use pnpm to install dependencies
RUN pnpm install

COPY . .

EXPOSE 8080

# Use pnpm for production
CMD ["pnpm", "start"]