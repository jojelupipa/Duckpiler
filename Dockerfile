# Choose image to build from
FROM node:8.15.0-jessie

# Choose and create workdir for our app 
WORKDIR /usr/src/app

# Install all dependencies
COPY package.json ./
RUN npm install

# Get the code
COPY ./src ./src 

# Enable port that our server will be listening at
EXPOSE 80

# Compiling dependencies
RUN apt-get update
RUN apt-get install sudo
RUN apt-get install pandoc -y

# Define command to run the app
CMD [ "sudo" ,"npm", "start" ]

