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
  total_quantity: number;
  total_amount: number;
  january_quantity: number;
  january_amount: number;
  february_quantity: number;
  february_amount: number;
  march_quantity: number;
  march_amount: number;
  april_quantity: number;
  april_amount: number;
  may_quantity: number;
  may_amount: number;
  june_quantity: number;
  june_amount: number;
  july_quantity: number;
  july_amount: number;
  august_quantity: number;
  august_amount: number;
  september_quantity: number;
  september_amount: number;
  october_quantity: number;
  october_amount: number;
  november_quantity: number;
  november_amount: number;
  december_quantity: number;
  december_amount: number;
};