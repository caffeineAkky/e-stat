import parseLastPublishedMonth from "@/lib/estat/parseLastPublishedMonth";

describe("parseLastPublishedMonth", () => {
    it('returns 9 for a current-year title published through September ("1-9月")', () => {
        const title = "確報 概況品別国別表 輸出(1-9月：確報) 2026年";

        const result = parseLastPublishedMonth(title);

        expect(result).toBe(9);
    });

    it('returns 12 for a finalized multi-year title ("1-12月")', () => {
        const title = "確報 概況品別国別表 (輸出 1-12月：確定)　2021年～2025年";

        const result = parseLastPublishedMonth(title);

        expect(result).toBe(12);
    });

    it("returns null when the title has no published month range", () => {
        const title = "概況品別国別表 輸出 2026年";

        const result = parseLastPublishedMonth(title);

        expect(result).toBeNull();
    });

    it("returns null when the month is outside 1-12", () => {
        const title = "確報 概況品別国別表 輸出(1-13月：確報) 2026年";

        const result = parseLastPublishedMonth(title);

        expect(result).toBeNull();
    });

    it("returns null for undefined (title not available)", () => {
        const title = undefined;

        const result = parseLastPublishedMonth(title);

        expect(result).toBeNull();
    });
});
