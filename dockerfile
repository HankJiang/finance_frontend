# 构建阶段
FROM node:12.6.0-buster-slim as builder
WORKDIR '/app'
COPY package.json .

RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
RUN npm rebuild node-sass
COPY . .

RUN npm run build

# 运行阶段
FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
