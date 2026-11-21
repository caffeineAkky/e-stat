import type { Metadata } from "next";
import { BIZ_UDPGothic, Geist_Mono } from "next/font/google";
import "./globals.css";

const bizUDPGothic = BIZ_UDPGothic({
  variable: "--font-biz-udp-gothic",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "e-Stat 貿易統計ナビ",
  description: "国・品目・年を指定して、e-Stat の貿易統計を時系列の表で表示し、Excel でダウンロードできます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${bizUDPGothic.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-header-border bg-header text-on-header">
          <div className="mx-auto max-w-4xl px-4 py-5">
            <h1 className="text-xl font-bold">e-Stat 貿易統計ナビ</h1>
            <p className="mt-1 text-sm text-on-header/80">
              年・国・品目を選んで、貿易統計を表で確認できます。
              <br />
              また、表の内容を Excel でダウンロードすることもできます。
            </p>
          </div>
        </header>
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6">{children}</main>
        <footer className="border-t border-line px-4 py-3 text-center text-xs text-fg-sub">
          このサービスは、政府統計総合窓口(e-Stat)のAPI機能を使用していますが、サービスの内容は国によって保証されたものではありません。
        </footer>
      </body>
    </html>
  );
}
