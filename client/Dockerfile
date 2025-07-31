# Use Node.js 20 with full build tools for better compatibility
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .npmrc ./

# Install dependencies with proper handling of optional dependencies
RUN npm ci --include=optional --legacy-peer-deps --no-audit

# Copy source code
COPY . .

# Clean install to ensure proper dependencies
RUN rm -rf node_modules package-lock.json
RUN npm install --include=optional --legacy-peer-deps --no-audit

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies (serve)
RUN npm ci --only=production --no-audit

# Expose port
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]
