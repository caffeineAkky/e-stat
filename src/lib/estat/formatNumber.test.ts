import formatNumber from "@/lib/estat/formatNumber";

describe("formatNumber", () => {
    it("formats a number with comma separators every three digits", () => {
        const largeNumber = 1234567;

        const result = formatNumber(largeNumber);

        expect(result).toBe("1,234,567");
    });

    it("returns a number under 1,000 without separators", () => {
        const smallNumber = 999;

        const result = formatNumber(smallNumber);

        expect(result).toBe("999");
    });

    // 0 は「1単位未満を四捨五入した値」で、値が無いわけではないので "-" にしない
    it('returns "0" for 0, not "-"', () => {
        const zero = 0;

        const result = formatNumber(zero);

        expect(result).toBe("0");
    });

    it('returns "-" for null (no data for the month)', () => {
        const valueNull = null;

        const result = formatNumber(valueNull);

        expect(result).toBe("-");
    });

    it('returns "-" for undefined (annual total not calculated)', () => {
        const valueUndefined = undefined;

        const result = formatNumber(valueUndefined);

        expect(result).toBe("-");
    });
});
