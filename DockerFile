# Use Node.js v14
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["node", "./bin/www"]
