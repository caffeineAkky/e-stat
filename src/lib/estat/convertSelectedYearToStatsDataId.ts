import { yearToStatsDataId } from "@/lib/estat/constants";

export default function convertSelectedYearsToStatsDataId(searchYear: string | undefined ): string | undefined {
    if (!searchYear) {
        return undefined;
    }
    return yearToStatsDataId[Number(searchYear.slice(0,4))];
}
