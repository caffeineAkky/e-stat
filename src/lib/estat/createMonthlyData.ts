import type { SingleData, MonthlyTradeData } from "@/types/estat";
import toNumberOrNull from "@/lib/estat/toNumberOrNull";

export default function createMonthlyData(data: SingleData[]): MonthlyTradeData[] {
    return Array.from({ length: 12}, (_, index) => {
        const month = index + 1;

        const quantityCode = String(130 + index * 20);
        const amountCode = String(140 + index * 20);

        const quantityData = toNumberOrNull(
            data.find(
               (item) => item["@cat02"] === quantityCode
            )?.["$"]
        );

        const amountData = toNumberOrNull(
            data.find(
                (item) => item["@cat02"] === amountCode
            )?.["$"]
        );

        return {
            month,
            quantity: quantityData,
            amount: amountData,
        }
    })
}
