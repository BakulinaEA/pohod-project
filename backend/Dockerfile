FROM node:20-alpine as builder
WORKDIR /backend

COPY . .

RUN yarn install

RUN yarn build

FROM node:20-alpine
WORKDIR /backend

COPY --from=builder /backend  .

EXPOSE 3000

CMD ["npm", "start"]