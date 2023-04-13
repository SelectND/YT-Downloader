FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN apk update
RUN apk add
RUN apk add ffmpeg

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD [ "node", "./bin/www" ]