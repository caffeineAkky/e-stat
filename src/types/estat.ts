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

export type TradeUnits = {
    quantityUnit?: string;
    amountUnit?: string;
}

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
    units: TradeUnits;
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