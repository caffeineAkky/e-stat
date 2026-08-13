import type { SearchConditions } from "@/types/search";
import type { SearchParamsValues } from "@/types/estat";
import convertSelectedYearToStatsDataId from "@/lib/estat/convertSelectedYearToStatsDataId";

export default async function parseSearchParams(searchParams: Promise<SearchParamsValues>): Promise<SearchConditions> {
    const { area, item, year} = await searchParams;

    const searchArea = 
    typeof area === "string" && /^\d{5}$/.test(area)
        ? area
        : "50103";

    const searchItem = 
    typeof item === "string" && /^\d{8}$/.test(item)
        ? item
        : "00000000";

    const searchYear = 
    typeof year === "string" && /^\d{10}$/.test(year)
        ? year
        : "2022000000";

    // const displeyYear = Number(searchYear.slice(0, 4));
    const statsTableId: string | undefined = convertSelectedYearToStatsDataId(searchYear);

    return {area: searchArea, item: searchItem, year: searchYear, tableDataId: statsTableId };
}