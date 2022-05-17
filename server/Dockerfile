FROM node:alpine

WORKDIR /server

COPY package.json .

RUN npm install\
    && npm install typescript -g

COPY . .

RUN tsc

CMD npm run dev
EXPOSE 3000