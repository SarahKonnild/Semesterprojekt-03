#
# @author Kasper Svane
# 
# Dockerfile for the Backend

# Instructing the Docker engine to built the image from Node with the latest version
FROM node:latest

# Defining the working directory
WORKDIR /usr/src/app

# Install nodemon
RUN npm install -g nodemon

# Copy the nodeopcua.ts into the container
COPY nodeopcua.ts /usr/src/app/nodeopcua.ts

# Copy the extension into the container
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

# Copy the entire backend folder into the container
COPY . /usr/src/app

# Install all the need extension in the package.json file
RUN npm install

# The container is listening on port 5000
EXPOSE 5000

# The executing command to run when the container is running is to start the server
CMD ["npm","start"]