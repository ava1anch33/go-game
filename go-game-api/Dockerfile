FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache bash git python3 make g++

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]