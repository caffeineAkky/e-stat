import type { SearchConditions, SearchFormOptions } from "@/types/search";

export default function isSelectableConditions(
    conditions: SearchConditions,
    options: SearchFormOptions
): boolean {
    const isKnownArea = options.areas.some((area) => area.value === conditions.area);
    const isKnownItem = options.items.some((item) => item.value === conditions.item);
    const isKnownYear = options.years.some((year) => year.yearSearchValue === conditions.year);

    return isKnownArea && isKnownItem && isKnownYear;
}
