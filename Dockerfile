# Choose the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the npm dependencies
RUN npm ci --only=production

# Copy the application code to the working directory
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
