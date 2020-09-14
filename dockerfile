FROM node:alpine

ENV PROJECT_ENV production
ENV NODE_ENV production

WORKDIR /code
ADD . /code

RUN npm install --production && npm run build && npm install -g http-server

CMD http-server ./public -p 9002
