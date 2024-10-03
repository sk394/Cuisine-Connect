# Base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json separately
# This will help leverage Docker's layer caching if dependencies don't change
COPY package.json package-lock.json ./

# Install dependencies in a separate stage for better caching
FROM base AS dependencies

# Install npm dependencies without building the app yet
RUN npm ci --prefer-offline --no-audit --progress=false

# Build the application in a new stage
FROM dependencies AS builder

# Copy all the app files
COPY . .

# Generate Prisma Client (if using Prisma in the app)
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# Final stage: Production-ready image
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy necessary files from the build stage
COPY --from=builder /app ./

# Expose the port the app runs on
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the app
CMD ["npm", "start"]
