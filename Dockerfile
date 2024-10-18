# Use an official Node.js runtime as the base image
FROM node:18-alpine 

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps


# Copy the rest of the application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Expose port 5050 to the outside world
EXPOSE 5050

# Start the Nginx server to serve the built files
CMD ["npx", "serve", "-s", "build"]

