FROM node:20-alpine
WORKDIR /backend

COPY . .

RUN yarn install

CMD ["npm", "start"]

EXPOSE 3000