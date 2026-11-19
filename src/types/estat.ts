export type TradeData = {
    country: {
        code : number;
        name : string;
    },
    year: number;
    item: {
        code : number;
        name : string;
    }
    results : TradeResult[];
};

export type MonthlyTradeData = {
    month: number;
    quantity: number | null;
    amount: number | null;
}

export type AnnualTradeData = {
    year: number;
    totalQuantity?: number | null;
    totalAmount?: number | null;
    monthlyData: MonthlyTradeData[];
}

export type TradeResult = {
    item: ItemCode,
    country: CountryCode,
    units: Units,
    annualData: AnnualTradeData[];
}

export type ExcelDownloadButtonProps = {
    rows: AnnualTradeData[];
};

// searchParams の1項目の値（同じキーが複数あれば配列、無ければ undefined）
export type SearchParamValue = string | string[] | undefined;

export type SearchParamsValues = {
        area?: SearchParamValue;
        item?: SearchParamValue;
        year?: SearchParamValue;
        intent?: SearchParamValue;
}

export type SearchParams = {
    searchParams: Promise<SearchParamsValues>;
};

export type SingleData = {
  "@cat01": string;
  "@cat02": string;
  "@area": string;
  "@time": string;
  "@unit"?: string;
  "$": string;
};

export type FetchedTradeData = {
    item: ItemCode,
    country: CountryCode,
    year: number,
    units: Units,
    values: SingleData[]
};

export type EstatClass = {
  "@code": string;
  "@name": string;
};

export type EstatClassObject = {
  "@id": string;
  CLASS: EstatClass | EstatClass[];
};

export type ItemCode = {
    code: string,
    name: string
}

export type CountryCode = {
    code: string,
    name: string
}

export type Units = {
    quantity: {
        code?: string,
        label?: string
    },
    amount?: string,
}

export type TradeDataResult =
    | { status: "ok"; data: FetchedTradeData }
    | { status: "empty" }
    | { status: "error"; reason: string };

