# Choose image to build from
FROM node:8.12.0-jessie

# Choose and create workdir for our app 
WORKDIR /usr/src/app

# Install all dependencies
COPY package.json ./

# Get the code
COPY ./src/ /usr/src/app

RUN npm install

# Compiling dependencies
RUN apt update
RUN apt install pandoc -y

# Define command to run the app
CMD [ "npm", "start" ]

