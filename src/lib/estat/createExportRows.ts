import type { ExportRow, TradeResult } from "@/types/estat";
import removeCodePrefix from "@/lib/estat/removeCodePrefix";

// 値が無いセルは null にする（SheetJS は null のセルを作らないので、Excel 上で空白になる）
export default function createExportRows(result: TradeResult): ExportRow[] {
    const { item, country, units } = result;

    const toRow = (
        year: number,
        month: number,
        quantity: number | null | undefined,
        amount: number | null | undefined,
    ): ExportRow => ({
        年: year,
        月: month,
        品目コード: item.code,
        品目名: removeCodePrefix(item.name),
        国コード: country.code,
        国名: removeCodePrefix(country.name),
        数量: quantity ?? null,
        // 値が空のセルには単位も出さない
        数量単位: quantity == null ? null : units.quantity.label ?? null,
        金額: amount ?? null,
        金額単位: amount == null ? null : units.amount ?? null,
    });

    // 年計の行は出さない（Excel で SUM やピボットをかけたときに二重に数えられるため）
    return result.annualData.flatMap((annual) =>
        annual.monthlyData.map((monthly) =>
            toRow(annual.year, monthly.month, monthly.quantity, monthly.amount),
        ),
    );
}
