FROM node:20-alpine

WORKDIR /app

# 先 COPY 鎖定依賴，加速 cache
COPY package.json package-lock.json* ./

# 強制安裝所有包（包含 devDependencies）
RUN npm ci --legacy-peer-deps   # 用 ci 更嚴格，會用 lockfile

# 再 COPY 其他檔案
COPY . .

ENV VITE_HOST=0.0.0.0
ENV VITE_PORT=8100

EXPOSE 8100

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "8100"]