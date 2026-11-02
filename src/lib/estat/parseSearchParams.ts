import type { ParseResult } from "@/types/search";
import type { SearchParamsValues } from "@/types/estat";
import convertSelectedYearToStatsDataId from "@/lib/estat/convertSelectedYearToStatsDataId";

export default async function parseSearchParams(searchParams: Promise<SearchParamsValues>): Promise<ParseResult> {
    const { area, item, year } = await searchParams;

    const isMissing = (v: string | string[] | undefined) => v === undefined || v === "";

    if (isMissing(area) && isMissing(item) && isMissing(year)) {
        return { status: "empty"};
    }

    const searchArea = 
    typeof area === "string" && /^\d{5}$/.test(area)
        ? area
        : undefined;

    if (searchArea === undefined) {
        return { status: "invalid", message: "国：地域の指定が正しくありません" };
    }

    const searchItem = 
    typeof item === "string" && /^\d{8}$/.test(item)
        ? item
        : undefined;

    if (searchItem === undefined) {
        return { status: "invalid", message: "品目の指定が正しくありません" };
    }

    const searchYear = 
    typeof year === "string" && /^\d{10}$/.test(year)
        ? year
        : undefined;

    if (searchYear === undefined) {
        return { status: "invalid", message: "年の指定が正しくありません" };
    }

    const statsTableId: string | undefined = convertSelectedYearToStatsDataId(searchYear);

    if (statsTableId === undefined) {
        return { status: "invalid", message: "指定された年のデータはありません" };
    }

    return {
        status: "ok",
        conditions: {
            area: searchArea,
            item: searchItem,
            year: searchYear,
            tableDataId: statsTableId,
        }
    };
}
