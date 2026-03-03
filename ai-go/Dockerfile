FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

ENV VITE_HOST=0.0.0.0
ENV VITE_PORT=8100

EXPOSE 8100

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "8100"]