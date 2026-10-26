import normalizeTradeData from "@/lib/estat/normalizeTradeData";
import { SearchConditions } from "@/types/search";
import type { FetchedTradeData, SingleData, EstatClassObject } from "@/types/estat";
import { getEstatAppId } from "./getEstatAppId";
import { cacheLife } from "next/cache";

export default async function getTradeData(searchConditions: SearchConditions): Promise<FetchedTradeData | null> {
    "use cache";
    cacheLife("days");

    const APP_ID = getEstatAppId();

    const params = new URLSearchParams({
        appId: APP_ID,
        // limit: "",
    });

    if (searchConditions.tableDataId) {
        params.set("statsDataId", searchConditions.tableDataId);
    }

    if (searchConditions.item) {
        params.set("cdCat01", searchConditions.item);
    }

    if (searchConditions.area) {
        params.set("cdArea", searchConditions.area);
    }

    if (searchConditions.year) {
        params.set("cdTime", searchConditions.year);
    }

    const res = await fetch(
        `https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData?${params}`
    );

    if (!res.ok) throw new Error(`e-Stat HTTP ${res.status}`);

    const json = await res.json();
    const status = Number(json.GET_STATS_DATA?.RESULT?.STATUS);
    if (!(status < 100)) throw new Error(`e-Stat error: ${status}`);

    const values = json.GET_STATS_DATA?.STATISTICAL_DATA;

    if (!values || Number(values.RESULT_INF?.TOTAL_NUMBER ?? 0) === 0) {
        return null;
    }

    const statisticalData: EstatClassObject[] = values.CLASS_INF.CLASS_OBJ;

    const fetchedDataValues: SingleData[] = values.DATA_INF?.VALUE ?? [];

    const fetchedTradeData: FetchedTradeData  = normalizeTradeData(fetchedDataValues, statisticalData);

    return fetchedTradeData;
}
