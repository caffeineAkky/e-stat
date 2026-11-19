<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## GithubActions実行時レビューの指示
- reviewの際は、結果を日本語で出力してください

## 作業の進め方
- イシュー番号を渡されたら gh issue view で読み、
  方針を2〜3案（トレードオフ付き）出して承認を待つ
- 実装前に触るファイルを列挙する。5つを超えるなら分割を提案する
- 1ステップごとにコミットして止まる
- 各ステップの最後に、変更理由をファイルごとに依存順で1行ずつ説明する
- AGENTS.md の nextjs-agent-rules ブロックは next dev が管理するので触らない
