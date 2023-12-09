FROM node:14.18.0

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]