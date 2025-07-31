# Use Node.js 18 official image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .npmrc ./

# Install dependencies with clean slate
RUN rm -rf node_modules package-lock.json
RUN npm install --include=optional --no-audit
RUN npm rebuild

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies (serve)
RUN npm ci --only=production

# Expose port
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]
