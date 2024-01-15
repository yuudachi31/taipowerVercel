FROM node:14.18.0

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 8080

ENTRYPOINT ["yarn", "start"]