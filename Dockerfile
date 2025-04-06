# ビルドステージ
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 実行ステージ
FROM node:18-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm install --production # 本番環境に必要な依存関係のみインストール
COPY --from=builder /app/.next ./next
COPY --from=builder /app/public ./public

CMD ["npm", "start"]