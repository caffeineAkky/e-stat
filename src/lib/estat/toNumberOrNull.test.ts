import toNumberOrNull from "@/lib/estat/toNumberOrNull";

describe("toNumberOrNull", () => {
    it("converts a numeric string to a number", () => {
        const numericString = "100";

        const result = toNumberOrNull(numericString);

        expect(result).toBe(100);
    });

    it('returns 0, not null, for "0" (a value below one unit, rounded to zero)', () => {
        const stringZero = "0";

        const result = toNumberOrNull(stringZero);

        expect(result).toBe(0);
    });

    it('returns null for "-" (no corresponding data)', () => {
        const hyphen = "-";

        const result = toNumberOrNull(hyphen);

        expect(result).toBeNull();
    });

    it("returns null for an empty string", () => {
        const emptyString = "";

        const result = toNumberOrNull(emptyString);

        expect(result).toBeNull();
    });

    it("returns null for undefined (month not yet published)", () => {
        const valueUndefined = undefined;

        const result = toNumberOrNull(valueUndefined);

        expect(result).toBeNull();
    });

    it("returns null for whitespace-only string", () => {
        const whitespaceOnly = " ";

        const result = toNumberOrNull(whitespaceOnly);

        expect(result).toBeNull();
    });

    it("returns null when the given value is not a numeric string", () => {
        const notNumericString = "abc";

        const result = toNumberOrNull(notNumericString);

        expect(result).toBeNull();
    });
});
