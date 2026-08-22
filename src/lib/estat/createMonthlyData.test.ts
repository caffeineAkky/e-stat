import createMonthlyData from "@/lib/estat/createMonthlyData";

describe("createMonthlyData", () => {
    it("cat02が130と140のデータを1月の数量と金額に変換する", () => {
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

    it("該当するデータがない月は0にする", () => {
        const result = createMonthlyData([]);

        expect(result[0]).toEqual({
            month: 1,
            quantity: 0,
            amount: 0,
        });
    });

    it("複数月の場合、複数件返却される", () => {
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
});