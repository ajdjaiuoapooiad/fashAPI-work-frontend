# ベースイメージとしてNode.jsのLTSバージョンを指定
FROM node:lts-alpine

# 作業ディレクトリを作成
WORKDIR /app

# 依存関係のファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# 開発サーバー起動コマンド
CMD ["npm", "run", "dev"]

# 公開するポートを指定
EXPOSE 3000