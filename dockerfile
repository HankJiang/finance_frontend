FROM node:12.6.0-buster-slim

ENV PROJECT_ENV production
ENV NODE_ENV production

WORKDIR /code
ADD . /code

RUN npm install --production
RUN npm install -g node-sass
RUN npm rebuild node-sass --force
RUN npm audit fix
RUN npm run build
RUN npm install -g http-server

CMD http-server ./public -p 9002
