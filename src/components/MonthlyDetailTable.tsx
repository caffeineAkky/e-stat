import type { MonthlyTradeData, Units } from "@/types/estat"
import formatNumber from "@/lib/estat/formatNumber"
import toUnitSuffix from "@/lib/estat/toUnitSuffix"

// 月の行は横に読むものなので、縦罫線は横罫線より薄くして行のまとまりを見せる
const lineClassName = "border border-line border-x-line/50";
const headerCellClassName = `${lineClassName} bg-th px-3 py-1.5 font-bold`;
const cellClassName = `${lineClassName} px-3 py-1.5`;
// 数値は桁をそろえて比べやすくするため、右寄せにして数字の幅を等幅にする
const numberCellClassName = `${cellClassName} text-right tabular-nums`;

type MonthlyDetailTableProps = {
    rows: MonthlyTradeData[];
    units: Units;
}

export default function MonthlyDetailTable({ rows, units }: MonthlyDetailTableProps ) {
    return (
        // 年別の表と同じ割合で列幅を固定し、品目によって表の形が変わらないようにする
        <table className="w-full table-fixed border-collapse text-sm">
            {/* 月 20%・数量 40%・金額 40%。年別の表と同じ割合にしている */}
            <colgroup>
                <col className="w-1/5" />
                <col className="w-2/5" />
                <col className="w-2/5" />
            </colgroup>
            <thead>
                <tr>
                    <th className={`${headerCellClassName} text-left`}>月</th>
                    <th className={`${headerCellClassName} text-right`}>数量{toUnitSuffix(units.quantity.label)}</th>
                    <th className={`${headerCellClassName} text-right`}>金額({units.amount})</th>
                </tr>
            </thead>

            <tbody>
                {rows.map((row) => (
                    // 行を目で追いやすいよう、偶数行だけ背景色を変える
                    <tr key={row.month} className="bg-surface even:bg-zebra">
                        <td className={cellClassName}>{row.month}</td>
                        <td className={numberCellClassName}>{formatNumber(row.quantity)}</td>
                        <td className={numberCellClassName}>{formatNumber(row.amount)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
