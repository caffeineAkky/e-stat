// app/error.tsx
"use client";

import Notice from "@/components/Notice";

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const digest = error instanceof Error ? (error as Error & { digest?: string }).digest : undefined;

  return (
    // ほかのエラー表示（接続失敗・不正な条件など）と同じ枠で出す
    <Notice variant="error" title="予期しないエラーが発生しました">
      {/* 問い合わせのときにサーバーのログと突き合わせるための ID なので、目立たせず等幅で出す */}
      {digest && <p className="font-mono text-sm opacity-80">エラーID: {digest}</p>}
      {/* 次にできる操作は再試行だけなので、文字色と背景色を反転させて目立たせる。
          強調色（accent）は検索ボタン・合計行・フォーカスリングに限っているので使わない */}
      <button
        type="button"
        onClick={() => retry()}
        className="mt-2 h-10 self-start whitespace-nowrap rounded-md border border-fg bg-fg px-6 font-bold text-surface hover:bg-fg/85"
      >
        もう一度試す
      </button>
    </Notice>
  );
}
