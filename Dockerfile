FROM node:18

# Install pnpm globally
RUN npm install -g pnpm

RUN mkdir -p /app/src

WORKDIR /app/src

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

EXPOSE 8080

# Use pnpm for production
CMD ["pnpm", "start"]