# PRISMORA-v2 Standalone Storybook
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json ./
RUN npm install

# Development stage for Storybook
FROM base AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Create cache directories
RUN mkdir -p node_modules/.cache storybook-static

# Expose port
EXPOSE 8006

# Start Storybook in development mode
CMD ["npm", "run", "storybook"]
