import type { SearchFormConditions, SearchFormOptions } from "@/types/search";

// 選択肢に存在する条件だけを残す。存在しないものは undefined にして、フォームでは先頭の選択肢に戻す
export default function pickSelectableConditions(
    conditions: SearchFormConditions,
    options: SearchFormOptions
): SearchFormConditions {
    const area = options.areas.some((a) => a.value === conditions.area) ? conditions.area : undefined;
    const item = options.items.some((i) => i.value === conditions.item) ? conditions.item : undefined;
    const year = options.years.some((y) => y.yearSearchValue === conditions.year) ? conditions.year : undefined;

    return { area, item, year };
}
