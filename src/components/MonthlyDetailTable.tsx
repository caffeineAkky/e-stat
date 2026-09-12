import type { MonthlyTradeData, Units } from "@/types/estat"

type MonthlyDetailTableProps = {
    rows: MonthlyTradeData[];
    units: Units;
}

export default function MonthlyDetailTable({ rows, units }: MonthlyDetailTableProps ) {
    return (
        <table>
            <thead>
                <tr>
                    <th>月</th>
                    <th>数量({units.quantity.label})</th>
                    <th>金額({units.amount})</th>
                </tr>
            </thead>

            <tbody>
                {rows.map((row) => (
                    <tr key={row.month}>
                        <td>{row.month}</td>
                        <td>{row.quantity}</td>
                        <td>{row.amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
