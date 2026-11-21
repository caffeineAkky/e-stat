// src/app/loading.tsx
// この表示が出るのは、URL を直接開いたときと再読み込みしたときだけ（フォームからの検索中は出ない）。
// そのときはフォームも消えているので、フォームと結果表の両方の形を同じ位置・高さで描き、
// 読み込みが終わって中身に差し替わったときに画面ががたつかないようにする。
// 形は SearchForm と SearchResult のクラスに合わせている

// 動きを減らす設定の人には点滅させない
const barClassName = "rounded-md bg-foreground/10 motion-safe:animate-pulse";
const headerCellClassName = "border border-foreground/20 bg-foreground/5 px-3 py-2";
const cellClassName = "border border-foreground/20 px-3 py-2";

function FieldSkeleton({ labelWidth, fieldClassName }: { labelWidth: string; fieldClassName: string }) {
    return (
        <div className="flex flex-col gap-1">
            {/* ラベル（text-sm の1行分の高さ） */}
            <div className={`h-5 ${labelWidth} ${barClassName}`} />
            {/* select（h-10） */}
            <div className={`h-10 ${fieldClassName} ${barClassName}`} />
        </div>
    );
}

function CellBar({ align }: { align: "left" | "right" }) {
    // セルの中身の1行分（line-height 1.5rem）の高さにする
    return (
        <div className={`h-6 w-1/2 ${align === "right" ? "ml-auto" : ""} ${barClassName}`} />
    );
}

export default function Loading() {
    return (
        <div role="status" aria-busy="true">
            {/* 見た目はスケルトンだけにし、読み上げでは従来どおりの文言で伝える */}
            <span className="sr-only">読み込み中…</span>

            <div aria-hidden="true">
                {/* SearchForm と同じグリッド */}
                <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
                    <FieldSkeleton labelWidth="w-6" fieldClassName="w-full sm:w-24" />
                    <FieldSkeleton labelWidth="w-6" fieldClassName="w-full" />
                    <FieldSkeleton labelWidth="w-10" fieldClassName="w-full" />
                    <div className={`h-10 w-full sm:w-24 ${barClassName}`} />
                </div>

                {/* SearchResult と同じ並び */}
                <section className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        {/* 見出し（text-lg の1行分の高さ） */}
                        <div className={`h-7 w-2/3 sm:w-1/2 ${barClassName}`} />
                        {/* Excel ダウンロードボタン */}
                        <div className={`h-10 w-40 shrink-0 ${barClassName}`} />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[32rem] table-fixed border-collapse">
                            <colgroup>
                                <col className="w-1/5" />
                                <col className="w-2/5" />
                                <col className="w-2/5" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th className={headerCellClassName}><CellBar align="left" /></th>
                                    <th className={headerCellClassName}><CellBar align="right" /></th>
                                    <th className={headerCellClassName}><CellBar align="right" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* 結果は1年分なので1行 */}
                                <tr>
                                    <td className={cellClassName}><CellBar align="left" /></td>
                                    <td className={cellClassName}><CellBar align="right" /></td>
                                    <td className={cellClassName}><CellBar align="right" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
