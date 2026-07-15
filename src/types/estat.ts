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

type TradeResult = {
    month: number;
    quantity: number;
    amount: number;
};

export type DisplayTradeData = {
  totalQuantity: number;
  totalAmount: number;
  januaryQuantity: number;
  januaryAmount: number;
  februaryQuantity: number;
  februaryAmount: number;
  marchQuantity: number;
  marchAmount: number;
  aprilQuantity: number;
  aprilAmount: number;
  mayQuantity: number;
  mayAmount: number;
  juneQuantity: number;
  juneAmount: number;
  julyQuantity: number;
  julyAmount: number;
  augustQuantity: number;
  augustAmount: number;
  septemberQuantity: number;
  septemberAmount: number;
  octoberQuantity: number;
  octoberAmount: number;
  novemberQuantity: number;
  novemberAmount: number;
  decemberQuantity: number;
  decemberAmount: number;
};

type ExcelRow = {
    月: string;
    数量: number;
    金額: number;
};

export type ExcelDownloadButtonProps = {
    rows: ExcelRow[];
};