import createMonthlyData from "@/lib/estat/createMonthlyData";

describe("createMonthlyData", () => {
    it("maps cat02 codes 130 and 140 to January's quantity and amount", () => {
        const data = [
        {
            "@cat01": "00000000",
            "@cat02": "130",
            "@area": "50103",
            "@time": "2022000000",
            "$": "100",
        },
        {
            "@cat01": "00000000",
            "@cat02": "140",
            "@area": "50103",
            "@time": "2022000000",
            "@unit": "千円",
            "$": "200",
        },
        ];

        const result = createMonthlyData(data);

        expect(result[0]).toEqual({
            month: 1,
            quantity: 100,
            amount: 200,
        });
    });

    it("returns null for months with no matching data", () => {
        const result = createMonthlyData([]);

        expect(result[0]).toEqual({
            month: 1,
            quantity: null,
            amount: null,
        });
    });

    it("maps each month's codes to the corresponding month", () => {
        const data = [
        {
            "@cat01": "00000000",
            "@cat02": "130",
            "@area": "50103",
            "@time": "2022000000",
            "$": "100",
        },
        {
            "@cat01": "00000000",
            "@cat02": "140",
            "@area": "50103",
            "@time": "2022000000",
            "@unit": "千円",
            "$": "200",
        },
        {
            "@cat01": "00000000",
            "@cat02": "150",
            "@area": "50103",
            "@time": "2022000000",
            "$": "300",
        },
        {
            "@cat01": "00000000",
            "@cat02": "160",
            "@area": "50103",
            "@time": "2022000000",
            "@unit": "千円",
            "$": "400",
        },
        ];

        const result = createMonthlyData(data);

        expect(result[0]).toEqual({
            month: 1,
            quantity: 100,
            amount: 200,
        });
        expect(result[1]).toEqual({
            month: 2,
            quantity: 300,
            amount: 400,
        });
    })

    it("always returns 12 months", () => {
        expect(createMonthlyData([])).toHaveLength(12);
    })

    describe("with the last published month", () => {
        // 9月(290/300)・10月(310/320) の数量と金額。e-Stat は未公表月も "0" で返す
        const septemberAndOctober = [
            { "@cat01": "00000000", "@cat02": "290", "@area": "50105", "@time": "2026000000", "$": "0" },
            { "@cat01": "00000000", "@cat02": "300", "@area": "50105", "@time": "2026000000", "@unit": "千円", "$": "0" },
            { "@cat01": "00000000", "@cat02": "310", "@area": "50105", "@time": "2026000000", "$": "0" },
            { "@cat01": "00000000", "@cat02": "320", "@area": "50105", "@time": "2026000000", "@unit": "千円", "$": "0" },
        ];

        it('returns null for months after the last published month even if e-Stat returns "0"', () => {
            const result = createMonthlyData(septemberAndOctober, 9);

            expect(result[9]).toEqual({ month: 10, quantity: null, amount: null });
            expect(result[11]).toEqual({ month: 12, quantity: null, amount: null });
        });

        it("keeps a real 0 as 0 for the last published month", () => {
            const result = createMonthlyData(septemberAndOctober, 9);

            expect(result[8]).toEqual({ month: 9, quantity: 0, amount: 0 });
        });

        it("uses e-Stat values for all months when the last published month is unknown", () => {
            const result = createMonthlyData(septemberAndOctober, null);

            expect(result[9]).toEqual({ month: 10, quantity: 0, amount: 0 });
        });
    });
});
