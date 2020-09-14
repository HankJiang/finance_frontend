FROM node:12.6.0-buster-slim

ENV PROJECT_ENV production
ENV NODE_ENV production

WORKDIR /code
ADD . /code

RUN npm config set registry https://registry.npm.taobao.org
RUN npm install --production
RUN npm install -g serve
RUN npm rebuild node-sass
RUN npm run build

CMD serve -s build -p 9002
