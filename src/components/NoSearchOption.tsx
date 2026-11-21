import Notice from "./Notice"

export default function NoSearchOption() {
    return (
      <Notice variant="error" title="検索条件を読み込めませんでした">
        <p>e-Stat（政府統計の総合窓口）に接続できませんでした。</p>
        <p>時間をおいて、ページを再読み込みしてください。</p>
      </Notice>
    )
}
