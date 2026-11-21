import type { MonthlyTradeData, Units } from "@/types/estat"
import formatNumber from "@/lib/estat/formatNumber"

const headerCellClassName = "border border-foreground/20 bg-foreground/5 px-3 py-1.5 font-bold";
const cellClassName = "border border-foreground/20 px-3 py-1.5";
// 数値は桁をそろえて比べやすくするため、右寄せにして数字の幅を等幅にする
const numberCellClassName = `${cellClassName} text-right tabular-nums`;

type MonthlyDetailTableProps = {
    rows: MonthlyTradeData[];
    units: Units;
}

export default function MonthlyDetailTable({ rows, units }: MonthlyDetailTableProps ) {
    return (
        <table className="w-full border-collapse text-sm">
            <thead>
                <tr>
                    <th className={`${headerCellClassName} text-left`}>月</th>
                    <th className={`${headerCellClassName} text-right`}>数量({units.quantity.label})</th>
                    <th className={`${headerCellClassName} text-right`}>金額({units.amount})</th>
                </tr>
            </thead>

            <tbody>
                {rows.map((row) => (
                    <tr key={row.month}>
                        <td className={cellClassName}>{row.month}</td>
                        <td className={numberCellClassName}>{formatNumber(row.quantity)}</td>
                        <td className={numberCellClassName}>{formatNumber(row.amount)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
