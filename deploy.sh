#!/bin/bash

# 设置错误退出，确保任何一步失败时脚本终止执行
set -e

# 日志打印函数
log() {
  echo -e "\033[1;32m[$(date '+%Y-%m-%d %H:%M:%S')] $1\033[0m"
}

# 1. 更新代码库
log "1. 更新代码库..."
git pull origin main

# 2. 停止并移除现有容器
log "2. 停止并移除现有容器..."
docker-compose down

# 3. 构建前端应用
log "3. 构建前端应用..."
npm run build

# 4. 构建新的 Docker 镜像
log "4. 构建新的 Docker 镜像..."
docker-compose build

# 5. 启动容器
log "5. 启动容器..."
docker-compose up -d

log "部署完成！"
