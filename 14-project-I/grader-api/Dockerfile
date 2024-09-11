FROM node:18-alpine

EXPOSE 7000

WORKDIR /app

RUN apk add --update docker openrc
RUN rc-update add docker boot
RUN addgroup node docker

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["node", "worker.js"]
