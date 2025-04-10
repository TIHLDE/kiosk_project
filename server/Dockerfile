FROM node:current-alpine

WORKDIR /app

# Copy the package.json and package-lock.json into the container
COPY ./package.json ./package-lock.json ./

# Install the dependencies
RUN npm install

# Now copy the rest of your files (e.g., dist)
COPY ./dist ./dist

# Set environment variables
ARG SKIP_ENV_VALIDATION=1

EXPOSE 8001

# Run the WebSocket server
CMD ["node", "dist/index.js"]
