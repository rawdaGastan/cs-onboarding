FROM node:12-alpine

WORKDIR /svelte-client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENV HOST=0.0.0.0

CMD ["npm", "start"]