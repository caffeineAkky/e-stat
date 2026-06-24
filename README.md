This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## MVP

e-Statの貿易統計データを取得し、指定条件に応じて時系列の表として表示・Excel出力する。

## 最初に対応する条件

- 統計: 貿易統計
- 輸出入: 輸出
- 国・地域: アメリカ
- 品目: 自動車
- 期間: 2025年1月〜2025年2月

## 最初の出力形式

| 年月 | 自動車 |
|---|---:|
| 2025-01 | xxx |
| 2025-02 | xxx |

## 後で対応すること

- 国固定 / 品目固定の切り替え
- 複数国
- 複数品目
- Excel出力
- グラフ表示
- 検索履歴
- Supabaseキャッシュ