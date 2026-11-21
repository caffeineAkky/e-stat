import createExportRows from "@/lib/estat/createExportRows";
import type { AnnualTradeData, MonthlyTradeData, TradeResult } from "@/types/estat";

// 1〜12月の月別データ。lastPublishedMonth より後の月は未公表として null にする
function monthlyDataUntil(lastPublishedMonth: number): MonthlyTradeData[] {
    return Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;
        return month <= lastPublishedMonth
            ? { month, quantity: month * 10, amount: month * 100 }
            : { month, quantity: null, amount: null };
    });
}

function annual(year: number, overrides: Partial<AnnualTradeData> = {}): AnnualTradeData {
    return {
        year,
        totalQuantity: 780,
        totalAmount: 7800,
        monthlyData: monthlyDataUntil(12),
        ...overrides,
    };
}

function tradeResult(overrides: Partial<TradeResult> = {}): TradeResult {
    return {
        // e-Stat の名前は「財務省のコード_名前」の形で返る
        item: { code: "00100000", name: "001_生きた動物" },
        country: { code: "50105", name: "105_中華人民共和国" },
        units: { quantity: { code: "NO", label: "頭" }, amount: "千円" },
        annualData: [annual(2025)],
        ...overrides,
    };
}

describe("createExportRows", () => {
    it("outputs the annual total as month 0, followed by each month, with item, country and units on every row", () => {
        const rows = createExportRows(tradeResult());

        expect(rows[0]).toEqual({
            年: 2025,
            月: 0,
            品目コード: "00100000",
            品目名: "生きた動物",
            国コード: "50105",
            国名: "中華人民共和国",
            数量: 780,
            数量単位: "頭",
            金額: 7800,
            金額単位: "千円",
        });
        expect(rows[1]).toEqual({
            年: 2025,
            月: 1,
            品目コード: "00100000",
            品目名: "生きた動物",
            国コード: "50105",
            国名: "中華人民共和国",
            数量: 10,
            数量単位: "頭",
            金額: 100,
            金額単位: "千円",
        });
    });

    it("orders the columns as year, month, item, country, quantity and amount", () => {
        const [firstRow] = createExportRows(tradeResult());

        expect(Object.keys(firstRow)).toEqual([
            "年",
            "月",
            "品目コード",
            "品目名",
            "国コード",
            "国名",
            "数量",
            "数量単位",
            "金額",
            "金額単位",
        ]);
    });

    it("outputs 13 rows: the annual total, then January to December", () => {
        const rows = createExportRows(tradeResult());

        expect(rows.map((row) => row.月)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });

    it("keeps codes as strings so leading zeros are not lost in Excel", () => {
        const [firstRow] = createExportRows(tradeResult());

        expect(firstRow.品目コード).toBe("00100000");
        expect(firstRow.国コード).toBe("50105");
    });

    it("removes the code prefix from item and country names", () => {
        const [firstRow] = createExportRows(tradeResult());

        expect(firstRow.品目名).toBe("生きた動物");
        expect(firstRow.国名).toBe("中華人民共和国");
    });

    it("uses the name as it is when it has no code prefix", () => {
        const [firstRow] = createExportRows(
            tradeResult({
                item: { code: "00100000", name: "生きた動物" },
                country: { code: "50105", name: "中華人民共和国" },
            }),
        );

        expect(firstRow.品目名).toBe("生きた動物");
        expect(firstRow.国名).toBe("中華人民共和国");
    });

    it("leaves unit cells empty when the units are unknown", () => {
        const [firstRow] = createExportRows(
            tradeResult({ units: { quantity: {} } }),
        );

        expect(firstRow.数量単位).toBeNull();
        expect(firstRow.金額単位).toBeNull();
    });

    it("leaves quantity and amount cells empty for unpublished months and missing totals", () => {
        const rows = createExportRows(
            tradeResult({
                annualData: [
                    annual(2026, {
                        totalQuantity: undefined,
                        totalAmount: undefined,
                        monthlyData: monthlyDataUntil(9),
                    }),
                ],
            }),
        );

        expect(rows[0]).toMatchObject({ 月: 0, 数量: null, 金額: null });
        expect(rows[9]).toMatchObject({ 月: 9, 数量: 90, 金額: 900 });
        expect(rows[10]).toMatchObject({ 月: 10, 数量: null, 金額: null });
    });

    it("leaves the unit cells empty for unpublished months", () => {
        const rows = createExportRows(
            tradeResult({ annualData: [annual(2026, { monthlyData: monthlyDataUntil(9) })] }),
        );

        expect(rows[10]).toMatchObject({ 月: 10, 数量単位: null, 金額単位: null });
    });

    it("leaves only the quantity unit empty when only the quantity is missing", () => {
        const rows = createExportRows(
            tradeResult({
                annualData: [annual(2025, { totalQuantity: null, totalAmount: 7800 })],
            }),
        );

        expect(rows[0]).toMatchObject({
            数量: null,
            数量単位: null,
            金額: 7800,
            金額単位: "千円",
        });
    });
});
