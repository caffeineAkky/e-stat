import type { TradeResult } from "@/types/estat"
import ExcelDownloadButton from "./ExcelDownloadButton"
import AnnualDataRow from "./AnnualDataRow"

type SearchResultProps = {
    result: TradeResult
}

export default function SearchResult({
    result,
}: SearchResultProps) {

    return (
        <div>
            <p>
                品目：{result.item.name}
            </p>
            <p>
                国名：{result.country.name}
            </p>
            <table>
                <thead>
                <tr>
                    <th>年</th>
                    <th>数量({result.units.quantity.label})</th>
                    <th>金額({result.units.amount})</th>
                    <th>月別詳細を見る</th>
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

            <ExcelDownloadButton rows={result.annualData} />
        </div>

    )
}
