import normalizeTradeData from "./normalizeTradeData";
import { SearchConditions } from "@/types/search";
import type { FetchedTradeData, SingleData, EstatClassObject } from "@/types/estat";

export default async function getTradeData(searchConditions: SearchConditions) {
    const APP_ID = process.env.ESTAT_APP_ID!;

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

    const json = await res.json();

    const statisticalData: EstatClassObject[] = json.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ;

    const values = json.GET_STATS_DATA.STATISTICAL_DATA;

    const fetchedDataValues: SingleData[] = values.DATA_INF?.VALUE ?? [];

    const fetchedTradeData: FetchedTradeData  = normalizeTradeData(fetchedDataValues, statisticalData);

    return fetchedTradeData;
}
