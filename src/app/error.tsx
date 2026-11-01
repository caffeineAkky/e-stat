// app/error.tsx
"use client";

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const digest = error instanceof Error ? (error as Error & { digest?: string }).digest : undefined;

  return (
    <div>
      <h2>予期しないエラーが発生しました</h2>
      {digest && <p>エラーID: {digest}</p>}
      <button onClick={() => retry()}>もう一度試す</button>
    </div>
  );
}
