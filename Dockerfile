FROM node:23-alpine3.20
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn predeploy
CMD  yarn run dev