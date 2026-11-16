import type { SearchOptionResult } from "@/types/search";
import fetchSearchOptions from "@/lib/estat/fetchSearchOptions";
import { defaultStatsDataId } from "@/lib/estat//constants";


export default async function getSearchOptions(statsTableId: string = defaultStatsDataId): Promise<SearchOptionResult> {
    try {
        const data = await fetchSearchOptions(statsTableId);
        return { status: "ok", data };
    } catch (e) {
        console.error(e);
        return { status: "error", reason: "e-Stat からデータを取得できませんでした" };
    }
}
