FROM node:18-alpine

EXPOSE 7000

WORKDIR /app

RUN apk add --update docker openrc
RUN rc-update add docker boot
RUN addgroup node docker

COPY package.json package-lock.json ./

# Install dependencies (include nodemon for hot reloading)
RUN npm install --global nodemon && npm install

COPY . .

# Use nodemon to start the app with hot reloading
CMD ["nodemon", "--watch", ".", "worker.js"]
