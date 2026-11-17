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
});
