import type { SearchFormOptions } from "@/types/search";
import pickSelectableConditions from "./pickSelectableConditions";

const searchOptions: SearchFormOptions = {
    areas: [
        { value: "10000", label: "DummyCountry1" },
        { value: "10001", label: "DummyCountry2" },
    ],
    items: [
        { value: "11100000", label: "DummyItem1" },
        { value: "11100001", label: "DummyItem2" },
    ],
    years: [
        { year: 2025, tableId: "0001000000", yearSearchValue: "2025000000" },
        { year: 2026, tableId: "0002000000", yearSearchValue: "2026000000" },
    ],
};

describe("pickSelectableConditions", () => {
    it("keeps every condition that exists in the options", () => {
        const result = pickSelectableConditions(
            { area: "10001", item: "11100001", year: "2026000000" },
            searchOptions
        );

        expect(result).toEqual({ area: "10001", item: "11100001", year: "2026000000" });
    });

    it("drops area and item that do not exist in the new stats table", () => {
        const result = pickSelectableConditions(
            { area: "99999", item: "99999999", year: "2026000000" },
            searchOptions
        );

        expect(result).toEqual({ area: undefined, item: undefined, year: "2026000000" });
    });

    it("keeps undefined conditions as undefined", () => {
        const result = pickSelectableConditions({ year: "2025000000" }, searchOptions);

        expect(result).toEqual({ area: undefined, item: undefined, year: "2025000000" });
    });
});
