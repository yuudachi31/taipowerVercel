# 使用官方 Node.js 镜像作为基础镜像
FROM node:14 as build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 安装依赖
RUN yarn install

# 将应用程序文件复制到容器
COPY . .

# 构建 React 应用程序
RUN yarn build

# 使用 Nginx 作为 Web 服务器
FROM nginx:alpine

# 将构建好的 React 应用复制到 Nginx 的默认站点目录
COPY --from=build /app/build /usr/share/n0ginx/html

# 暴露 Nginx 默认端口
EXPOSE 80
