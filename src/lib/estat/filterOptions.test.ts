import type { SelectedOption } from "@/types/search";
import filterOptions from "./filterOptions";

const options: SelectedOption[] = [
    { value: "0101", label: "牛肉" },
    { value: "0102", label: "豚肉" },
    { value: "0301", label: "カニ（生きているもの）" },
    { value: "0901", label: "ＤＶＤプレーヤー" },
];

const labelsOf = (result: SelectedOption[]): string[] => result.map((o) => o.label);

describe("filterOptions", () => {
    it("returns every option when the query is empty", () => {
        expect(filterOptions(options, "")).toEqual(options);
    });

    it("returns every option when the query is only whitespace", () => {
        expect(filterOptions(options, "  　")).toEqual(options);
    });

    it("returns only the options whose label contains the query, keeping their order", () => {
        expect(labelsOf(filterOptions(options, "肉"))).toEqual(["牛肉", "豚肉"]);
    });

    it("matches a query in the middle of the label", () => {
        expect(labelsOf(filterOptions(options, "生きて"))).toEqual(["カニ（生きているもの）"]);
    });

    it("ignores spaces around the query", () => {
        expect(labelsOf(filterOptions(options, " 牛 "))).toEqual(["牛肉"]);
    });

    it("matches full-width katakana labels with a half-width katakana query", () => {
        expect(labelsOf(filterOptions(options, "ｶﾆ"))).toEqual(["カニ（生きているもの）"]);
    });

    it("matches full-width alphabet labels with a half-width lowercase query", () => {
        expect(labelsOf(filterOptions(options, "dvd"))).toEqual(["ＤＶＤプレーヤー"]);
    });

    it("returns an empty list when nothing matches", () => {
        expect(filterOptions(options, "自動車")).toEqual([]);
    });
});
