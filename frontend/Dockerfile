FROM node:latest

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

COPY . /usr/src/app

RUN npm install -g npm@7.0.15

EXPOSE 3000

CMD ["npm","start"]