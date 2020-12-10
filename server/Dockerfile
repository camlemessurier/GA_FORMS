FROM node:12-alpine

WORKDIR /home/app/server

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . . 

EXPOSE 4000
