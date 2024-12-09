# 构建阶段
FROM node:16-alpine AS build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

RUN adduser -D myuser

# 给 /var/run/nginx 目录创建并修改所有者和权限
RUN mkdir -p /var/run/nginx && \
    chown -R myuser:myuser /var/run/nginx && \
    chmod -R 755 /var/run/nginx

# 确保 /var/run/nginx.pid 文件可以被写入
RUN touch /var/run/nginx.pid && \
    chown myuser:myuser /var/run/nginx.pid

# 给 /var/cache/nginx/client_temp 目录创建并修改所有者和权限
RUN mkdir -p /var/cache/nginx/client_temp && \
    chown -R myuser:myuser /var/cache/nginx

USER myuser

# 暴露 80 端口
EXPOSE 80

# 切换到非root用户
USER myuser

CMD ["nginx", "-g", "daemon off;"]