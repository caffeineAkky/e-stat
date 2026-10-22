import { SearchConditions, SearchFormOptions } from "@/types/search";
import isSelectableConditions from "./isSelectableConditions";

describe("isSelecttableConditions", () => {
    it("every selected condition exitsts in the fetched e-stat metadata", () => {
        const searchConditions: SearchConditions = {
            area: "10000",
            item: "11100000",
            year: "1988000000",
            tableDataId: "0001000000",
        };

        const searchOptions: SearchFormOptions = {
            areas: [
                {
                    value: "9999",
                    label: "DummyCountry1"
                },
                {
                    value: "10000",
                    label: "DummyCountry2"
                },
                {
                    value: "10001",
                    label: "DummyCountry3"   
                },
            ],
            items: [
                {
                    value: "11099999",
                    label: "DummyItem1"
                },
                {
                    value: "11100000",
                    label: "DummyItem2"
                },
                {
                    value: "11100001",
                    label: "DummyItem3"
                },
            ],
            years: [
                {
                    year: 1987000000,
                    tableId: "0001000000",
                    yearSearchValue: "1987000000",
                },
                {
                    year: 1988000000,
                    tableId: "0001000000",
                    yearSearchValue: "1988000000",
                },
                {
                    year: 1989000000,
                    tableId: "0001000000",
                    yearSearchValue: "1989000000",
                },
            ]
        };

        const result = isSelectableConditions(searchConditions, searchOptions);

        expect(result).toEqual(true);
    });

    it("area condition does not exist in the fetched e-stat metadata", () => {
        const searchConditions: SearchConditions = {
            area: "10002",
            item: "11100000",
            year: "1988000000",
            tableDataId: "0001000000",
        };

        const searchOptions: SearchFormOptions = {
            areas: [
                {
                    value: "9999",
                    label: "DummyCountry1"
                },
                {
                    value: "10000",
                    label: "DummyCountry2"
                },
                {
                    value: "10001",
                    label: "DummyCountry3"   
                },
            ],
            items: [
                {
                    value: "11099999",
                    label: "DummyItem1"
                },
                {
                    value: "11100000",
                    label: "DummyItem2"
                },
                {
                    value: "11100001",
                    label: "DummyItem3"
                },
            ],
            years: [
                {
                    year: 1987000000,
                    tableId: "0001000000",
                    yearSearchValue: "1987000000",
                },
                {
                    year: 1988000000,
                    tableId: "0001000000",
                    yearSearchValue: "1988000000",
                },
                {
                    year: 1989000000,
                    tableId: "0001000000",
                    yearSearchValue: "1989000000",
                },
            ]
        };

        const result = isSelectableConditions(searchConditions, searchOptions);

        expect(result).toEqual(false);
    });

    it("item condition does not exist in the fetched e-stat metadata", () => {
        const searchConditions: SearchConditions = {
            area: "10000",
            item: "11100002",
            year: "1988000000",
            tableDataId: "0001000000",
        };

        const searchOptions: SearchFormOptions = {
            areas: [
                {
                    value: "9999",
                    label: "DummyCountry1"
                },
                {
                    value: "10000",
                    label: "DummyCountry2"
                },
                {
                    value: "10001",
                    label: "DummyCountry3"   
                },
            ],
            items: [
                {
                    value: "11099999",
                    label: "DummyItem1"
                },
                {
                    value: "11100000",
                    label: "DummyItem2"
                },
                {
                    value: "11100001",
                    label: "DummyItem3"
                },
            ],
            years: [
                {
                    year: 1987000000,
                    tableId: "0001000000",
                    yearSearchValue: "1987000000",
                },
                {
                    year: 1988000000,
                    tableId: "0001000000",
                    yearSearchValue: "1988000000",
                },
                {
                    year: 1989000000,
                    tableId: "0001000000",
                    yearSearchValue: "1989000000",
                },
            ]
        };

        const result = isSelectableConditions(searchConditions, searchOptions);

        expect(result).toEqual(false);
    });

    it("year condition does not exist in the fetched e-stat metadata", () => {
        const searchConditions: SearchConditions = {
            area: "10000",
            item: "11100002",
            year: "1990000000",
            tableDataId: "0001000000",
        };

        const searchOptions: SearchFormOptions = {
            areas: [
                {
                    value: "9999",
                    label: "DummyCountry1"
                },
                {
                    value: "10000",
                    label: "DummyCountry2"
                },
                {
                    value: "10001",
                    label: "DummyCountry3"   
                },
            ],
            items: [
                {
                    value: "11099999",
                    label: "DummyItem1"
                },
                {
                    value: "11100000",
                    label: "DummyItem2"
                },
                {
                    value: "11100001",
                    label: "DummyItem3"
                },
            ],
            years: [
                {
                    year: 1987000000,
                    tableId: "0001000000",
                    yearSearchValue: "1987000000",
                },
                {
                    year: 1988000000,
                    tableId: "0001000000",
                    yearSearchValue: "1988000000",
                },
                {
                    year: 1989000000,
                    tableId: "0001000000",
                    yearSearchValue: "1989000000",
                },
            ]
        };

        const result = isSelectableConditions(searchConditions, searchOptions);

        expect(result).toEqual(false);
    });
});
