# 【Udemy講座】Book Commerce App

## 概要
Book Commerce Appは電子書籍販売プラットフォームです。
ユーザーは電子書籍を閲覧・購入できます。

※本アプリはUdemy講座で作成したアプリです。

## 技術スタック

| 技術 | ロゴ |
| ---- | ---- |
| Next.js | <img src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png" height="50px"> |
| React | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" height="50px"> |
| TypeScript | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" height="50px"> |
| NextAuth | <img src="https://next-auth.js.org/img/logo/logo-sm.png" height="50px"> |
| Prisma | <img src="https://avatars.githubusercontent.com/u/17219288?s=200&v=4" height="50px"> |
| Stripe | <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" height="50px"> |
| Tailwind CSS | <img src="https://avatars.githubusercontent.com/u/67109815?s=200&v=4" height="50px"> |
| MicroCMS | <img src="https://avatars.githubusercontent.com/u/59202820?s=200&v=4" height="50px"> |
| Vercel | <img src="https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png" height="50px"> |

## 環境構築手順
1. リポジトリをクローンする
```
git clone https://github.com/yourusername/book-commerce-app.git
cd book-commerce-app
```

2. 依存関係をインストールする
```
npm install
# またはnstall
yarn install
```
3. 環境変数を設定する
`.env.local`ファイルを作成し、必要な環境変数を設定します。
```
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
MICROCMS_API_KEY=your_microcms_api_keyase_anon_key
MICROCMS_SERVICE_DOMAIN=your_microcms_domain
STRIPE_SECRET_KEY=your_stripe_secret_keyT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. データベースをセットアップする
```
npx prisma migrate dev
```

5. 開発サーバーを起動する
```
npm run dev
# またはn dev
yarn dev
```

6. ブラウザで [http://localhost:3000](http://localhost:3000) を開く
