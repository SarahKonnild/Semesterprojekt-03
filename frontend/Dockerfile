#
# @author Kasper Svane
# 
# Dockerfile for the Frontend

# Instructing the Docker engine to built the image from Node with the latest version
FROM node:latest

# Defining the working directory
WORKDIR /usr/src/app

# Copy the extension into the container
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

# Copy the entire backend folder into the container
COPY . /usr/src/app

# Install all the need extension in the package.json file
RUN npm install 

# The container is listening on port 3000
EXPOSE 3000

# The executing command to run when the container is running is to start React as the client
CMD ["npm","start"]