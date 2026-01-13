# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建项目
RUN pnpm run build

# 生产阶段
FROM node:18-alpine

WORKDIR /app

# 安装 serve 或使用 vite preview
RUN npm install -g serve

# 从构建阶段复制构建产物
COPY --from=builder /app/dist ./dist

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["serve", "-s", "dist", "-l", "3000"]
