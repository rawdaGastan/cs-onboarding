
FROM node:lts-alpine

WORKDIR /client

COPY package.json .

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

CMD npm run serve

EXPOSE 8080