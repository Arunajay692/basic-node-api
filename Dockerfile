# 1. Use the official Node.js LTS alpine image
FROM node:20-alpine AS base

# 2. Set working directory
WORKDIR /usr/src/app

# 3. Copy dependency definitions
COPY package*.json ./

# 4. Install production dependencies only
RUN npm ci --omit=dev

# 5. Copy application source code
COPY . .

# 6. Expose the port defined in app (default: 3000)
EXPOSE 3000

# 7. Set default environment
ENV NODE_ENV=production
ENV PORT=3000

# 8. Run as non-root user for security
USER node

# 9. Start server
CMD ["node", "src/server.js"]

