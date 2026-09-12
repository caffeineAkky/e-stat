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
    quantity: number;
    amount: number;
}

export type AnnualTradeData = {
    year: number;
    totalQuantity?: number;
    totalAmount?: number;
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

export type SearchParamsValues = {
        area?: string | string[];
        item?: string | string[];
        year?: string | string[];
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
 