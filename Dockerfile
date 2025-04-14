FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install --production

# 复制源代码
COPY . .

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=80

# 暴露端口
EXPOSE 80

# # 启动命令
# CMD ["npm", "start"] 

# FROM node:18-alpine

# WORKDIR /app
# COPY ./service /app

# RUN npm install

# CMD ["node", "app.js"]
