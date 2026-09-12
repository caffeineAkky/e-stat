import type { SearchConditions } from "@/types/search"
import type { TradeResult } from "@/types/estat"
import ExcelDownloadButton from "./ExcelDownloadButton"
import AnnualDataRow from "./AnnualDataRow"

type SearchResultProps = {
    conditions: SearchConditions;
    result: TradeResult;
}

export default function SearchResult({
    conditions,
    result,
}: SearchResultProps) {

    return (
        <div>
            <p>
                品目：{conditions.item}
            </p>
            <p>
                国名：{conditions.area}
            </p>
            <table>
                <thead>
                <tr>
                    <th>年</th>
                    <th>数量({result.units.quantityUnit})</th>
                    <th>金額({result.units.amountUnit})</th>
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