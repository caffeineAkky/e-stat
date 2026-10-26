import { getEstatAppId } from "@/lib/estat/getEstatAppId";
import { yearOptions, defaultStatsDataId } from "@/lib/estat/constants";
import type { SearchFormOptions, SelectedOption } from "@/types/search";
import type { EstatClassObject } from "@/types/estat";
import { cacheLife } from "next/cache";

export default async function getSearchOptions(statsTableId: string = defaultStatsDataId) {
    "use cache";
    cacheLife("days");
    
    const APP_ID = getEstatAppId();
    
    const params = new URLSearchParams({
        appId: APP_ID,
        statsDataId: statsTableId,   // 統計表ID
    });

    const res = await fetch(
        `https://api.e-stat.go.jp/rest/3.0/app/json/getMetaInfo?${params}`
    );

    const json = await res.json();

    const values: EstatClassObject[] = json.GET_META_INFO.METADATA_INF.CLASS_INF.CLASS_OBJ;

    // 国コードを取得
    const countryCategory = values.find(
        (item) => item["@id"] === "area"
    );

    if (!countryCategory) {
        throw new Error("国の分類情報がありません");
    }

    const countryCodes = Array.isArray(countryCategory.CLASS)
    ? countryCategory.CLASS
    : [countryCategory.CLASS];

    const areas: SelectedOption[] = [];
    
    for (const countryCode of countryCodes) {
        const area: SelectedOption = {
            value: countryCode["@code"],
            label: countryCode["@name"],
        }
        areas.push(area);
    }

    // 品目コードを取得
    const itemCategory = values.find(
        (item) => item["@id"] === "cat01"
    );

    if (!itemCategory) {
        throw new Error("品目の分類情報がありません");
    }

    const itemCodes = Array.isArray(itemCategory.CLASS)
    ? itemCategory.CLASS
    : [itemCategory.CLASS];

    const items: SelectedOption[] = [];
    
    for (const itemCode of itemCodes) {
        const item: SelectedOption = {
            value: itemCode["@code"],
            label: itemCode["@name"],
        }

        items.push(item);
    }

    // 検索用年を取得
    const years = yearOptions;

    const result: SearchFormOptions = {
        areas: areas,
        items: items,
        years: years,
    }

    return result;
}
