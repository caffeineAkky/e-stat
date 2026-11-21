<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## GithubActions実行時レビューの指示
- reviewの際は、結果を日本語で出力すること
- レビューでは、テスト方針に反するテスト(DOM 構造への依存、不要なモック)があれば指摘する

## 作業の進め方
1. ユーザーが作成したブランチがないか確認する
2. `gh issue view` でイシューを読み、方針を2〜3案（トレードオフ付き）出して承認を待つ
3. 触るファイルを列挙する。5つを超えるなら分割を提案する
4. 各変更対象を「テスト方針」の分類（1〜3）に当てはめ、分類と理由を1行で示す
5. 分類1・2がある場合は、実装の前にテストだけを書いて止まり、何を保証するテストかを説明して承認を待つ。分類3のみなら、この手順は飛ばす
6. 1ステップごとに止まる。コミットはユーザーが差分を確認してから行うので、AI はコミットしない
7. 各ステップの最後に、変更理由をファイルごとに依存順で1行ずつ説明する
8. PRは `.github/pull_request_template.md` の形式で下書きし、設計判断の欄は空けておく

## テスト方針
- 単体テストは「観察可能な振る舞い」を確かめるために書く。実装の詳細（DOM構造、子コンポーネントの呼び出し、内部状態）には結びつけない。
- テストの数より、リファクタリングしても壊れないことを優先する。
- テストは npm test で実行できる

### 実装前に必ず分類する

変更対象を次のどれかに分類し、分類と理由を最初に1行で示してから実装に入ること。

1. **ロジック（変換・パース・判定・計算）**
   - 純粋関数として `.ts` に切り出し（例: `lib/estat/`）、先にテストを書く
   - 入力→出力だけを検証する。モックは使わない
2. **状態や分岐を持つクライアントコンポーネント／カスタムフック**
   - Testing Library で、ユーザーから見える結果だけをテストする
   - 例: 「年を変えると品目の選択肢が変わる」「不正な入力では検索できない」
   - 検証しないもの: DOM の階層構造、className、子コンポーネントに渡した props
3. **表示だけのコンポーネント**（props を並べるだけのもの）
   - 単体テストは書かない
   - ロジックが混ざっていたら、1 に切り出すことを提案する

### やらないこと
- テストを通すためだけに `next/form` や `next/navigation` をモックしない。モックが必要になったら、そのコンポーネントは単体テストの対象外と判断する
- スナップショットテストは使わない
- 画面をまたぐ流れ（検索→URL変更→結果表示）は単体テストではなく E2E の対象とする
