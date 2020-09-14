# 构建阶段
FROM node:alpine as builder
WORKDIR /app
COPY package.json .

RUN pwd

RUN npm config set registry https://registry.npm.taobao.org
RUN npm install node-sass && npm rebuild node-sass
RUN npm install
COPY . .

RUN npm run build

# 运行阶段
FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
