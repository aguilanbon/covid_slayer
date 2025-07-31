# Use Node.js 20 official image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .npmrc ./

# Install dependencies with clean slate
RUN npm install --legacy-peer-deps --no-audit --prefer-offline

# Copy source code
COPY . .

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
