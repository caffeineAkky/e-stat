import type { AnnualTradeData, TradeResult, MonthlyTradeData, FetchedTradeData } from "@/types/estat";
import createMonthlyData from "@/lib/estat/createMonthlyData";
import toNumberOrZero from "@/lib/estat/toNumberOrZero";

export default function aggregateTradeData(fetchedTradeData: FetchedTradeData): TradeResult {
    
    const totalQuantity = toNumberOrZero(
        fetchedTradeData.values.find(
            (item) => item["@cat02"] === "110"
        )?.["$"]
    );

    const totalAmount = toNumberOrZero(
        fetchedTradeData.values.find(
            (item) => item["@cat02"] === "120"
        )?.["$"]
    );

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
