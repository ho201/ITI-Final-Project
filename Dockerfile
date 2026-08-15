FROM node:24.13.1

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@11.18.0

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]