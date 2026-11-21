import type { TradeResult } from "@/types/estat"
import removeCodePrefix from "@/lib/estat/removeCodePrefix"
import ExcelDownloadButton from "./ExcelDownloadButton"
import AnnualDataRow from "./AnnualDataRow"

const headerCellClassName = "border border-foreground/20 bg-foreground/5 px-3 py-2 font-bold";

type SearchResultProps = {
    result: TradeResult
}

export default function SearchResult({
    result,
}: SearchResultProps) {
    // 結果は1年分だけなので、先頭の年がその表の年になる
    const year = result.annualData[0].year;

    return (
        <section className="mt-8 flex flex-col gap-4">
            {/* ダウンロードボタンを見出しと同じ行に置き、「この条件の表を落とす」ことが分かるようにする。
                表の下に置くと、月別詳細を開いたときにボタンが押し出されて動いてしまう。
                スマホ幅ではボタンを見出しの下に回す */}
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                {/* どの条件の表か分かるように、年・国・品目を見出しにする。
                    長い品目名は見出しの中で折り返し、ボタンを押し出さない */}
                <h2 className="min-w-0 text-lg font-bold break-words">
                    {year}年 ／ {removeCodePrefix(result.country.name)} ／ {removeCodePrefix(result.item.name)}
                </h2>
                <ExcelDownloadButton result={result} />
            </div>

            {/* スマホ幅で表が収まらないときは、ページ全体ではなく表だけを横にスクロールさせる */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                    <tr>
                        <th className={`${headerCellClassName} text-left`}>年</th>
                        <th className={`${headerCellClassName} text-right`}>数量({result.units.quantity.label})</th>
                        <th className={`${headerCellClassName} text-right`}>金額({result.units.amount})</th>
                    </tr>
                    </thead>

                    <tbody>
                        {result.annualData.map((data) => (
                            <AnnualDataRow
                                key={data.year}
                                data={data}
                                units={result.units}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
