import type { ParseResult } from "@/types/search";
import type { SearchParamsValues, SearchParamValue } from "@/types/estat";
import convertSelectedYearToStatsDataId from "@/lib/estat/convertSelectedYearToStatsDataId";

const toSearchArea = (v: SearchParamValue): string | undefined =>
    typeof v === "string" && /^\d{5}$/.test(v) ? v : undefined;

const toSearchItem = (v: SearchParamValue): string | undefined =>
    typeof v === "string" && /^\d{8}$/.test(v) ? v : undefined;

const toSearchYear = (v: SearchParamValue): string | undefined =>
    typeof v === "string" && /^\d{10}$/.test(v) ? v : undefined;

export default async function parseSearchParams(searchParams: Promise<SearchParamsValues>): Promise<ParseResult> {
    const { area, item, year } = await searchParams;

    const isMissing = (v: SearchParamValue) => v === undefined || v === "";

    if (isMissing(area) && isMissing(item) && isMissing(year)) {
        return { status: "empty"};
    }

    const searchArea = toSearchArea(area);

    if (searchArea === undefined) {
        return { status: "invalid", message: "国：地域の指定が正しくありません" };
    }

    const searchItem = toSearchItem(item);

    if (searchItem === undefined) {
        return { status: "invalid", message: "品目の指定が正しくありません" };
    }

    const searchYear = toSearchYear(year);

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
