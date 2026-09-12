import type { MonthlyTradeData, TradeUnits } from "@/types/estat"

type MonthlyDetailTableProps = {
    rows: MonthlyTradeData[];
    units: TradeUnits;
}

export default function MonthlyDetailTable({ rows, units}: MonthlyDetailTableProps ) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>月</th>
                        <th>数量({units.quantityUnit})</th>
                        <th>金額({units.amountUnit})</th>
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
        </>
    )
}