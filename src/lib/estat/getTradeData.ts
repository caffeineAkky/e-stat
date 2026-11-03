import type { SearchConditions } from "@/types/search";
import type { TradeDataResult } from "@/types/estat"
import fetchTradeData from "@/lib/estat/fetchTradeData";

export default async function getTradeData(conditions: SearchConditions): Promise<TradeDataResult> {
    try {
        const data = await fetchTradeData(conditions);
        return data === null ? { status: "empty" } : { status: "ok", data };
    } catch (e) {
        console.error(e);
        return { status: "error", reason: "e-Stat からデータを取得できませんでした" };
    }
}
