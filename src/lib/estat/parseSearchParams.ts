import type { SearchConditions } from "@/types/search";
import type { SearchParams } from "@/types/estat";

export async function parseSearchParams(searchParams: SearchParams):SearchConditions {
    const { area, item, year} = await searchParams;

    const area = 
    typeof rawArea === "string" && /^\d{5}$/.test(rawArea)
        ? rawArea
        : "50103";

    const item = 
    typeof rawItem === "string" && /^\d{8}$/.test(rawItem)
        ? rawItem
        : "00000000";

    const searchYear = 
    typeof rawYear === "string" && /^\d{10}$/.test(rawYear)
        ? rawYear
        : "202000000";

    const year = Number(searchYear.slice(0, 4));
    const statsTableId = yearToStatsDataId[year];
}