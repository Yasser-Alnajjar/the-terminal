# ===========================================
# 1️⃣ Base Image
# ===========================================
FROM oven/bun:1 AS base
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# ===========================================
# 2️⃣ Dependencies Layer
# ===========================================
FROM base AS deps
COPY bun.lockb* bun.lock* package.json ./
RUN bun install --frozen-lockfile

# ===========================================
# 3️⃣ Builder Layer
# ===========================================
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build and prepare release
RUN bun run build:linux && \
    bun run copy:release

# ===========================================
# 4️⃣ Production Runner
# ===========================================
FROM oven/bun:1 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=5188

# Copy release folder only (clean production image)
COPY --from=builder /app/release ./release

WORKDIR /app/release

EXPOSE 5188

# Start app from release folder
CMD ["bun","server.js"]
