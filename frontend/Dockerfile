FROM node:latest

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm install

COPY . /usr/src/app

EXPOSE 3000

CMD ["npm","start"]