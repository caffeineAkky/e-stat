import createExportFileName from "@/lib/estat/createExportFileName";
import type { AnnualTradeData, TradeResult } from "@/types/estat";

function annual(year: number): AnnualTradeData {
    return { year, monthlyData: [] };
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

describe("createExportFileName", () => {
    it("names the file after the item, country and year", () => {
        expect(createExportFileName(tradeResult())).toBe(
            "trade_生きた動物_中華人民共和国_2025.xlsx",
        );
    });

    it("uses the names as they are when they have no code prefix", () => {
        const fileName = createExportFileName(
            tradeResult({
                item: { code: "00100000", name: "生きた動物" },
                country: { code: "50105", name: "中華人民共和国" },
            }),
        );

        expect(fileName).toBe("trade_生きた動物_中華人民共和国_2025.xlsx");
    });

    // 長い品目名でも切り詰めない（どのデータか一目で分かることを優先する）
    it("keeps long item names in full", () => {
        const longName = "牛の肉（生鮮のもの及び冷蔵したものに限る。）のうち骨付きのもの";
        const fileName = createExportFileName(
            tradeResult({ item: { code: "02011000", name: `0201_${longName}` } }),
        );

        expect(fileName).toBe(`trade_${longName}_中華人民共和国_2025.xlsx`);
    });
});
