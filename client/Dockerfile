# Build stage - use full Node.js for better compatibility with native modules
FROM node:20-bullseye-slim AS builder

# Install essential build tools
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .npmrc ./

# Clean any existing installations and install fresh
RUN rm -rf node_modules package-lock.json || true

# Install ALL dependencies including optional ones (this is key for Rollup)
RUN npm install --include=optional --legacy-peer-deps --no-audit

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage - minimal image
FROM node:20-alpine AS production

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy only the built application
COPY --from=builder /app/dist ./dist

# Use environment variable for port or default to 3000
ENV PORT=3000

# Expose port
EXPOSE $PORT

# Start the application
CMD serve -s dist -l $PORT
