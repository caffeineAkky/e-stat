// import type { DisplayTradeData } from "@/types/estat"

// cat01など分かりにくい名前の対応表を作成
export const tradeCategories = {
    cat02: {
        
    }
}

export const yearToStatsDataId: Partial<Record<number, string>> = {
    1988: "0003258349",
    1989: "0003258349",
    1990: "0003258349",
    1991: "0003258350",
    1992: "0003258350",
    1993: "0003258350",
    1994: "0003258350",
    1995: "0003258350",
    1996: "0003258351",
    1997: "0003258351",
    1998: "0003258351",
    1999: "0003258351",
    2000: "0003258351",
    2001: "0003228190",
    2002: "0003228190",
    2003: "0003228190",
    2004: "0003228190",
    2005: "0003228190",
    2006: "0003228191",
    2007: "0003228191",
    2008: "0003228191",
    2009: "0003228191",
    2010: "0003228191",
    2011: "0003228192",
    2012: "0003228192",
    2013: "0003228192",
    2014: "0003228192",
    2015: "0003228192",
    2016: "0003313967",
    2017: "0003313967",
    2018: "0003313967",
    2019: "0003313967",
    2020: "0003313967",
    2021: "0003425295",
    2022: "0003425295",
    2023: "0003425295",
    2024: "0003425295",
    2025: "0003425295",
    2026: "0004049327",
};

export const yearOptions = Object.entries(yearToStatsDataId).map(
    ([year, tableId]) => ({
        year: Number(year),
        tableId,
        yearSearchValue: `${year}000000`,
    })
)

  // 年合計や各月の合計を格納し、表示するためのデータ定義
export const displayTradeData = {
    totalQuantity: 0,
    totalAmount: 0,
    januaryQuantity: 0,
    januaryAmount: 0,
    februaryQuantity: 0,
    februaryAmount: 0,
    marchQuantity: 0,
    marchAmount: 0,
    aprilQuantity: 0,
    aprilAmount: 0,
    mayQuantity: 0,
    mayAmount: 0,
    juneQuantity: 0,
    juneAmount: 0,
    julyQuantity: 0,
    julyAmount: 0,
    augustQuantity: 0,
    augustAmount: 0,
    septemberQuantity: 0,
    septemberAmount: 0,
    octoberQuantity: 0,
    octoberAmount: 0,
    novemberQuantity: 0,
    novemberAmount: 0,
    decemberQuantity: 0,
    decemberAmount: 0,
  };

 // forループで回したいな。必要なデータは januaryAmout:110の対応表だな。
export const converter = {
    totalQuantity: "110",
    totalAmount: "120",
    januaryQuantity: "130",
    januaryAmount: "140",
    februaryQuantity: "150",
    februaryAmount: "160",
    marchQuantity: "170",
    marchAmount: "180",
    aprilQuantity: "190",
    aprilAmount: "200",
    mayQuantity: "210",
    mayAmount: "220",
    juneQuantity: "230",
    juneAmount: "240",
    julyQuantity: "250",
    julyAmount: "260",
    augustQuantity: "270",
    augustAmount: "280",
    septemberQuantity: "290",
    septemberAmount: "300",
    octoberQuantity: "310",
    octoberAmount: "320",
    novemberQuantity: "330",
    novemberAmount: "340",
    decemberQuantity: "350",
    decemberAmount: "360",
  };
  
export const months = [
  { label: "合計", quantity: "totalQuantity", amount: "totalAmount" },
  { label: "1月", quantity: "januaryQuantity", amount: "januaryAmount" },
  { label: "2月", quantity: "februaryQuantity", amount: "februaryAmount" },
  { label: "3月", quantity: "marchQuantity", amount: "marchAmount" },
  { label: "4月", quantity: "aprilQuantity", amount: "aprilAmount" },
  { label: "5月", quantity: "mayQuantity", amount: "mayAmount" },
  { label: "6月", quantity: "juneQuantity", amount: "juneAmount" },
  { label: "7月", quantity: "julyQuantity", amount: "julyAmount" },
  { label: "8月", quantity: "augustQuantity", amount: "augustAmount" },
  { label: "9月", quantity: "septemberQuantity", amount: "septemberAmount" },
  { label: "10月", quantity: "octoberQuantity", amount: "octoberAmount" },
  { label: "11月", quantity: "novemberQuantity", amount: "novemberAmount" },
  { label: "12月", quantity: "decemberQuantity", amount: "decemberAmount" },
] as const;