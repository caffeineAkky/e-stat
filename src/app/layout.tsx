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
        <main className="flex-1">{children}</main>
        <footer className="border-t px-4 py-3 text-center text-xs text-gray-500">
          このサービスは、政府統計総合窓口(e-Stat)のAPI機能を使用していますが、サービスの内容は国によって保証されたものではありません。
        </footer>
      </body>
    </html>
  );
}
