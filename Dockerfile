FROM node:alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV production

# Bundle package dependencies
COPY package*.json /app/

# Install package dependencies
RUN npm install --production

# Bundle app source
COPY . /app

# Expose default port
EXPOSE 3000

# Add default entrypoint
CMD [ "node", "app.js" ]