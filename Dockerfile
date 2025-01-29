FROM node:20.12.1-alpine3.18 AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
# RUN yarn predeploy
CMD  yarn run dev