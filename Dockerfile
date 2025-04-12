# ベースイメージとしてNode.jsのLTSバージョンを指定
FROM node:lts-alpine AS base

# 作業ディレクトリを作成
WORKDIR /app

# 依存関係のファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ビルドに必要な依存関係のみをインストール (productionビルドの場合)
FROM base AS builder
ARG NODE_ENV=production
RUN npm install --omit=dev

# アプリケーションのソースコードをコピー
COPY . .

# Next.jsアプリケーションをビルド
RUN npm run build

# 本番環境用の軽量なNode.jsイメージ
FROM node:lts-alpine AS production

# 作業ディレクトリを設定
WORKDIR /app

# ビルドされたアプリケーションをコピー
COPY --from=builder /app/.next .
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# 本番環境に必要な依存関係のみをインストール
RUN npm install --omit=dev

# 起動コマンド
CMD ["npm", "start"]

# 公開するポートを指定
EXPOSE 3000