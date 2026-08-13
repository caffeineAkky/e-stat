export type SearchConditions = {
    area?: string;
    item?: string;
    year?: string;
    tableDataId?: string;
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