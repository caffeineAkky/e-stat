import { yearToStatsDataId } from "@/lib/estat/constants";

export default function convertSelectedYearsToStatsDataId(searchYear: string): string | undefined {
    return yearToStatsDataId[Number(searchYear.slice(0,4))];
}