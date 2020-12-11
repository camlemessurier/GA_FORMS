FROM node:12-alpine

WORKDIR /home/app/web

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000
