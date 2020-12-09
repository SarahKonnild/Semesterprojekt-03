FROM node:latest

WORKDIR /usr/src/app

RUN npm install -g nodemon

COPY nodeopcua.ts /usr/src/app/nodeopcua.ts

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

COPY . /usr/src/app

RUN npm install

EXPOSE 5000

CMD ["npm","start"]