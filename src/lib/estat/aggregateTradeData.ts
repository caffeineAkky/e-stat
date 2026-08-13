import { AnnualTradeData, TradeResult, TradeUnits, MonthlyTradeData, SingleData } from "@/types/estat";
import createMonthlyData from "./createMonthlyData";

export default function aggregateTradeData(fetchedTradeData: SingleData[]): TradeResult {

    const testData = fetchedTradeData;
    console.log(testData);

    const year = Number(fetchedTradeData[0]["@time"].slice(0,4));
    const totalQuantity = Number(fetchedTradeData.find(
        (item) => item["@cat02"] === "110"
    )?.["$"]);

    const totalAmount = Number(fetchedTradeData.find(
        (item) => item["@cat02"] === "120"
    )?.["$"]);

    const quantityUnit = "";
    const amountUnit = fetchedTradeData.find(
        (item) => item["@cat02"] === "120"
    )?.["@unit"];


    const monthlyData: MonthlyTradeData[] = createMonthlyData(fetchedTradeData)

    const singleYearData: AnnualTradeData = {
        year,
        totalQuantity,
        totalAmount,
        monthlyData,
    }

    const annualData = [];

    annualData.push(singleYearData);

    const units: TradeUnits = {
        quantityUnit,
        amountUnit,
    }

    const result: TradeResult = {
        units,
        annualData,
    };

    return result;
}