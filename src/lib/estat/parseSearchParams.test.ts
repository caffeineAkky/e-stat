import parseSearchParams from "./parseSearchParams";
import { changeYearIntent } from "./constants";

describe("parseSearchParams", () => {
    it("returns empty when no condition is given", async () => {
        const result = await parseSearchParams(Promise.resolve({}));

        expect(result).toEqual({ status: "empty" });
    });

    it("returns ok when every condition is valid", async () => {
        const result = await parseSearchParams(Promise.resolve({
            area: "10000",
            item: "11100000",
            year: "2026000000",
        }));

        expect(result).toEqual({
            status: "ok",
            conditions: {
                area: "10000",
                item: "11100000",
                year: "2026000000",
                tableDataId: "0004049327",
            },
        });
    });

    describe("intent=changeYear", () => {
        it("returns changeYear with the stats table of the selected year", async () => {
            const result = await parseSearchParams(Promise.resolve({
                area: "10000",
                item: "11100000",
                year: "2021000000",
                intent: changeYearIntent,
            }));

            expect(result).toEqual({
                status: "changeYear",
                conditions: {
                    area: "10000",
                    item: "11100000",
                    year: "2021000000",
                    tableDataId: "0003425295",
                },
            });
        });

        it("drops area and item that have an invalid format", async () => {
            const result = await parseSearchParams(Promise.resolve({
                area: "abc",
                item: "",
                year: "2021000000",
                intent: changeYearIntent,
            }));

            expect(result).toEqual({
                status: "changeYear",
                conditions: {
                    area: undefined,
                    item: undefined,
                    year: "2021000000",
                    tableDataId: "0003425295",
                },
            });
        });

        it("returns invalid when the year has an invalid format", async () => {
            const result = await parseSearchParams(Promise.resolve({
                area: "10000",
                item: "11100000",
                year: "2021",
                intent: changeYearIntent,
            }));

            expect(result).toEqual({ status: "invalid", message: "年の指定が正しくありません" });
        });

        it("returns invalid when there is no stats table for the year", async () => {
            const result = await parseSearchParams(Promise.resolve({
                year: "1900000000",
                intent: changeYearIntent,
            }));

            expect(result).toEqual({ status: "invalid", message: "指定された年のデータはありません" });
        });
    });
});
