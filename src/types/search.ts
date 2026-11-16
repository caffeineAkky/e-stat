export type SearchConditions = {
    area: string;
    item: string;
    year: string;
    tableDataId: string;
}

export type SelectedOption = {
    value: string;
    label: string;
}

export type SelectedYearsOption = {
    year: number;
    tableId: string;
    yearSearchValue: string;
}

export type SearchFormOptions = {
    areas: SelectedOption[];
    items: SelectedOption[];
    years: SelectedYearsOption[];
}

export type SearchOptionResult =
    | { status: "ok"; data: SearchFormOptions }
    | { status: "error"; reason: string };

export type ParseResult = 
    | { status: "empty" }
    | { status: "invalid"; message: string }
    | { status: "ok"; conditions: SearchConditions };

