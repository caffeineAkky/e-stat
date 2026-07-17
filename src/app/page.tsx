import type { TradeData, DisplayTradeData, SearchParams } from "../types/estat";
import ExcelDownloadButton from "./components/ExcelDownloadButton";
import React from "react";
import Form from "next/form";

export default async function Home({ searchParams }: SearchParams) {
  const { area: rawArea } = await searchParams;

  const area = 
    typeof rawArea === "string" && /^\d{5}$/.test(rawArea)
      ? rawArea
      : "50103";

  const APP_ID = process.env.ESTAT_APP_ID!;

  const params = new URLSearchParams({
    appId: APP_ID,
    statsDataId: "0003334002",   // 統計表ID
    cdCat01: "00000000",         // 品目コード
    cdArea: area,                // 例: 50103: 大韓民国
    cdTime: "2020000000",          // 例: 2020000000
    // limit: "",
  });

  const res = await fetch(
    `https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData?${params}`
  );

  const json = await res.json();

  const values = json.GET_STATS_DATA.STATISTICAL_DATA;
   console.log(values);

  const tableInfo = values;

  const fetchedData = values.DATA_INF?.VALUE ?? [];

  if (fetchedData.length === 0) {
    console.log("指定した条件に一致するデータがありません");
  }

  // forループで回したいな。必要なデータは januaryAmout:110の対応表だな。
  const converter = {
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
  } satisfies Record<keyof DisplayTradeData, string>;

  const months = [
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

  // 年合計や各月の合計を格納し、表示するためのデータ定義
  const displayTradeData: DisplayTradeData = {
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

  for (
    const [propertyName, cat02code] of Object.entries(converter) as [
    keyof DisplayTradeData,
    string,
  ][]
  ) {
    displayTradeData[propertyName] = fetchedData
    .filter((value) => 
        // value["@cat01"] === itemCode &&
        value["@cat02"] === cat02code
        // value["@cat03"] === customCode &&
        // value["@area"] === countryCode &&
        // value["@time"] === yearCode
    )
    .reduce(
      (total, value) => total + Number(value["$"] ?? 0),
      0
    );
  }

  // mothesとconverter、paramsとdisplayTradeDataをtradeData一つにまとめる

  // const tradeData: TradeData = {
  //   country: {
  //       code : 50103,
  //       name : "大韓民国",
  //   },
  //   year: 2020,
  //   item: {
  //       code : 0o000000,
  //       name : "食料品",
  //   }
  //   results : TradeResult[];
  // };

  // Excelダウンロード用データを作成
  const excelData = months.map((month) => ({
    月: month.label,
    数量: displayTradeData[month.quantity],
    金額: displayTradeData[month.amount],
  }));

  console.log("excelData", excelData);
  
  return (
    <div>
    {/* 画面上部に条件検索ができるようにすればいいかも。 */}
    <main>
      <Form action="">
        <label>
          国・地域
          <select name="area" defaultValue={area}>
            <option value = "50103">大韓民国</option>
            <option value = "10500">中華人民共和国</option>
          </select>
        </label>

        <button type = "submit">検索</button>
      </Form>
      <p>
        品目：{tableInfo?.CLASS_INF?.CLASS_OBJ[0]?.CLASS?.["@name"] ?? "未取得"}
      </p>
      <p>
        国名：{tableInfo?.CLASS_INF?.CLASS_OBJ[3]?.CLASS?.["@name"] ?? "未取得"}
      </p>
      <p>
        年：{tableInfo?.CLASS_INF?.CLASS_OBJ[4]?.CLASS?.["@name"] ?? "未取得"} 
      </p>

      <table>
        <thead>
          <tr>
            <th>月</th>
            <th>数量</th>
            <th>金額(千円)</th>
          </tr>
        </thead>

        <tbody>
          {/* <tr>
            <td>合計</td>
            <td>{displayTradeData.totalQuantity}</td>
            <td>{displayTradeData.totalAmount}(千円)</td>
          </tr> */}

        {months.map((month) => (
          <tr key={month.label}>
            <td>{month.label}</td>
            <td>
              {displayTradeData[month.quantity]}
            </td>
            <td>
              {displayTradeData[month.amount]}(千円)
            </td>
          </tr> 
        ))}
        </tbody>
      </table>

      {/* エクセルダウンロードボタン */}
      <ExcelDownloadButton rows={excelData} />
    </main>
    </div>
  );
}