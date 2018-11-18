# Choose image to build from
FROM node:8.12.0-jessie

# Choose and create workdir for our app
WORKDIR /usr/src/app

# Install all dependencies
COPY package*.json ./

RUN npm install

# Bundle our app source code
COPY . .

# Bind app to specific port
EXPOSE 8080

# Define command to run the app
CMD [ "npm", "start" ]

