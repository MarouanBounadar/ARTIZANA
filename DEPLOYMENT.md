# Deployment Guide for Artizaana

This guide provides instructions for deploying the Artizaana application in various environments.

## Prerequisites

- Node.js 18+
- npm or pnpm

## Option 1: Vercel Deployment (Recommended)

Vercel is the easiest platform for deploying Next.js applications.

1. Create an account on [Vercel](https://vercel.com) if you don't have one
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Run the following command in the project directory and follow the prompts:
   ```bash
   vercel
   ```
4. For subsequent deployments, use:
   ```bash
   vercel --prod
   ```

## Option 2: Static Export

For static hosting platforms:

1. Modify `next.config.mjs` to enable static exports:
   ```js
   const nextConfig = {
     output: 'export',
     // ...other configs
   }
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. The static files will be in the `out` directory, which can be deployed to any static hosting service:
   - GitHub Pages
   - Netlify
   - AWS S3
   - Firebase Hosting

## Option 3: Self-Hosting with Node.js

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Build the application:
   ```bash
   npm run build
   ```

3. Start the production server:
   ```bash
   npm start
   ```

4. The application will be available at http://localhost:3000 by default

## Option 4: Docker Deployment

1. Create a `Dockerfile` in the project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects anonymous telemetry data
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

2. Build the Docker image:
   ```bash
   docker build -t artizaana .
   ```

3. Run the container:
   ```bash
   docker run -p 3000:3000 artizaana
   ```

## Environment Variables

Create a `.env` file based on the `.env.example` template. In production, make sure to set the appropriate values.

## Troubleshooting

- **Dependencies installation fails**: Use `npm install --legacy-peer-deps` to bypass dependency conflicts
- **Build errors**: Check the Next.js version compatibility with your Node.js version
- **Static export issues**: Make sure all dynamic paths are properly configured in the application 