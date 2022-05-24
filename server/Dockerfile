FROM alpine:latest

# Install OpenSSL
RUN apk update && \
  apk add --no-cache openssl && \
  rm -rf "/var/cache/apk/*"

WORKDIR /server/src
RUN mkdir -p keys
WORKDIR /server/src/keys

RUN openssl genrsa -out key.pem
RUN openssl req -new -key key.pem -out csr.pem -subj "/C=EG/ST=Cairo/L=Cairo/O=Codescalers/OU=IT/CN=calc"
RUN openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem


FROM node:alpine

WORKDIR /server

COPY . .

RUN npm install\
    && npm install typescript -g

RUN tsc

CMD npm run dev
EXPOSE 3000