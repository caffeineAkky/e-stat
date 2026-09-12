import type { AnnualTradeData, TradeResult, MonthlyTradeData, FetchedTradeData } from "@/types/estat";
import createMonthlyData from "./createMonthlyData";

export default function aggregateTradeData(fetchedTradeData: FetchedTradeData): TradeResult {

    const testData = fetchedTradeData;
    console.log(testData);

    const totalQuantity = Number(fetchedTradeData.values.find(
        (item) => item["@cat02"] === "110"
    )?.["$"]);

    const totalAmount = Number(fetchedTradeData.values.find(
        (item) => item["@cat02"] === "120"
    )?.["$"]);

    const monthlyData: MonthlyTradeData[] = createMonthlyData(fetchedTradeData.values)

    const singleYearData: AnnualTradeData = {
        year: fetchedTradeData.year,
        totalQuantity,
        totalAmount,
        monthlyData,
    }

    const annualData = [];

    annualData.push(singleYearData);

    const result: TradeResult = {
        item: fetchedTradeData.item,
        country: fetchedTradeData.country,
        units: fetchedTradeData.units,
        annualData,
    };

    return result;
}
