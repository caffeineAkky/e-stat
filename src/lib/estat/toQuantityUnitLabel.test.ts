import toQuantityUnitLabel from "@/lib/estat/toQuantityUnitLabel";

describe("toQuantityUnitLabel", () => {
    it("shows a short label for the countable unit code NO", () => {
        expect(toQuantityUnitLabel("NO")).toBe("個数");
    });

    // e-Stat は単位コードを全角で返す
    it("converts the full-width code that e-Stat returns", () => {
        expect(toQuantityUnitLabel("ＮＯ")).toBe("個数");
        expect(toQuantityUnitLabel("ＫＧ")).toBe("キログラム");
    });

    it("keeps the labels of units other than NO", () => {
        expect(toQuantityUnitLabel("KG")).toBe("キログラム");
        expect(toQuantityUnitLabel("MT")).toBe("トン");
    });

    it("returns the code as it is when the code has no label", () => {
        expect(toQuantityUnitLabel("ＸＸ")).toBe("XX");
    });

    // 数量の行が無い品目では単位も無い
    it("returns undefined when there is no unit code", () => {
        expect(toQuantityUnitLabel(undefined)).toBeUndefined();
    });
});
