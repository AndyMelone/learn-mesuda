FROM node:20.12.1-alpine3.18 AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN chmod +x ./script.sh
EXPOSE 9000
CMD  ["./script.sh"]

