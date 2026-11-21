import toUnitSuffix from "@/lib/estat/toUnitSuffix";

describe("toUnitSuffix", () => {
    it("wraps the unit in parentheses when the unit exists", () => {
        expect(toUnitSuffix("キログラム")).toBe("(キログラム)");
    });

    // 数量の行が無い品目では単位も無い
    it("returns an empty string when there is no unit", () => {
        expect(toUnitSuffix(undefined)).toBe("");
    });

    it("returns an empty string when the unit is an empty string", () => {
        expect(toUnitSuffix("")).toBe("");
    });
});
