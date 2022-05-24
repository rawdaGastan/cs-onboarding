FROM node:alpine

WORKDIR /server

COPY . .

RUN npm install\
    && npm install typescript -g


RUN tsc

CMD npm run dev
EXPOSE 3000