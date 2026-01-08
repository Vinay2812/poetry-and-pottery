FROM oven/bun:1 AS base

WORKDIR /app

# Install dependencies with bun
FROM base AS deps

COPY package.json bun.lock* ./
COPY prisma/schema.prisma ./prisma/schema.prisma
COPY prisma.config.ts ./prisma.config.ts
RUN bun install --no-save --frozen-lockfile

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN bun run prisma:generate

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Build arguments
ARG NEXT_PUBLIC_API_ENDPOINT
ARG NEXT_PUBLIC_DOMAIN
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG DATABASE_URL

# Set as environment variables for the build process
ENV NEXT_PUBLIC_API_ENDPOINT=${NEXT_PUBLIC_API_ENDPOINT}
ENV NEXT_PUBLIC_DOMAIN=${NEXT_PUBLIC_DOMAIN}
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
ENV DATABASE_URL=${DATABASE_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma/generated ./prisma/generated
COPY . .
RUN bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0"
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --no-log-init -g nodejs nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["bun", "./server.js"]