import type { SingleData, MonthlyTradeData } from "@/types/estat";
import toNumberOrNull from "@/lib/estat/toNumberOrNull";

// lastPublishedMonth より後の月は、e-Stat が "0" を返していても未公表として null にする
export default function createMonthlyData(
    data: SingleData[],
    lastPublishedMonth: number | null = null,
): MonthlyTradeData[] {
    return Array.from({ length: 12}, (_, index) => {
        const month = index + 1;

        if (lastPublishedMonth !== null && month > lastPublishedMonth) {
            return { month, quantity: null, amount: null };
        }

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
