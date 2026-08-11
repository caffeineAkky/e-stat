import { getEstatAppId } from "@/lib/estat/getEstatAppId";
import { yearOptions } from "@/lib/estat/constants";
import type { SearchFormOptions, SelectedOption } from "@/types/search";

export async function getSearchOptions() {
    const APP_ID = getEstatAppId();

    const params = new URLSearchParams({
        appId: APP_ID,
        statsDataId: "0003334002",   // 統計表ID
        // いずれはstatsDataIdを動的に切り替えて、正しい品目と国名が出るようにしないと
    });

    const res = await fetch(
        `https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData?${params}`
    );
    const json = await res.json();

    const values = json.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ;

    // 国コードを取得
    const countryCodes = values[3].CLASS;

    const areas: SelectedOption[] = [];
    
    for (const countryCode of countryCodes) {
        const area: SelectedOption = {
            value: countryCode["@code"],
            label: countryCode["@name"],
        }

        areas.push(area);
    }

    // 品目コードを取得
    const itemCodes = values[0].CLASS;

    const items: SelectedOption[] = [];
    
    for (const itemCode of itemCodes) {
        const item: SelectedOption = {
            value: itemCodes["@code"],
            label: itemCodes["@name"],
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