# resume_log.Dockerfile

FROM node:16-bullseye



# 设置工作目录
WORKDIR /app

# 拷贝文件
COPY ./resume_log /app

# 安装依赖
RUN npm install

# 启动服务
CMD ["node", "server.js"]