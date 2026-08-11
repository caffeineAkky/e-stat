import type { TradeData, DisplayTradeData, SearchParams } from "../types/estat";
import ExcelDownloadButton from "./components/ExcelDownloadButton";
import React from "react";
import Form from "next/form";
import { yearOptions, displayTradeData, yearToStatsDataId } from "../lib/estat/definitions/trade";

export default async function Home({ searchParams }: SearchParams) {
  const { area: rawArea, item: rawItem, year: rawYear } = await searchParams;

  const area = 
    typeof rawArea === "string" && /^\d{5}$/.test(rawArea)
      ? rawArea
      : "50103";

  const item = 
    typeof rawItem === "string" && /^\d{8}$/.test(rawItem)
      ? rawItem
      : "00000000";

  const searchYear = 
    typeof rawYear === "string" && /^\d{10}$/.test(rawYear)
      ? rawYear
      : "202000000";

  const year = Number(searchYear.slice(0, 4));
  const statsTableId = yearToStatsDataId[year];

  const APP_ID = process.env.ESTAT_APP_ID!;
  
  const params = new URLSearchParams({
    appId: APP_ID,
    statsDataId: statsTableId,   // 統計表ID
    cdCat01: item,               // 品目コード
    cdArea: area,                // 例: 50103: 大韓民国
    cdTime: searchYear,          // 例: 2020000000
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

  for (
    const [propertyName, cat02code] of Object.entries(converter) as [
    keyof DisplayTradeData,
    string,
  ][]
  
  ) {
    displayTradeData[propertyName] = fetchedData
    .filter((value:string) => 
        // value["@cat01"] === itemCode &&
        value["@cat02"] === cat02code
        // value["@cat03"] === customCode &&
        // value["@area"] === countryCode &&
        // value["@time"] === yearCode
    )
    .reduce(
      (total: number, value) => total + Number(value["$"] ?? 0),
      0
    );
  }

  // Excelダウンロード用データを作成
  const excelData = months.map((month) => ({
    月: month.label,
    数量: displayTradeData[month.quantity],
    金額: displayTradeData[month.amount],
  }));

  console.log("excelData", excelData);

  const testparams = new URLSearchParams({
    appId: APP_ID,
    statsDataId: "0003334002",   // 統計表ID
    // cdArea: "13000",             // 例: 東京都
    // limit: "100",
  });

  const testres = await fetch(
    `https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData?${testparams}`
  );
  const testjson = await testres.json();

  // 実データは VALUE 配列に入っている
  const testvalues = testjson.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE;

  // 検索用国コードを取得
  const countryCodes = testjson.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[3].CLASS;
  console.log(testvalues);
  console.log(countryCodes);

    // 検索用品目コードを取得
  const itemCodes = testjson.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[0].CLASS;
  console.log(itemCodes);

  // 検索用年を取得
  const surveyYears = testjson.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[4].CLASS;
  console.log(surveyYears);


  // const getTableIdParams = new URLSearchParams({
  //   appId: APP_ID,
  //   searchKind: "1",   // 統計表ID
  //   // searchWord: "%輸出%",
  //   statsCode: "00350300",
  //   searchWord: "概況品別国別表 輸出",
  //   // surveyYears: "202010",
  //   // limit: "1000",
  // });
  // const tableIdRes = await fetch(
  //   `https://api.e-stat.go.jp/rest/3.0/app/json/getStatsList?${getTableIdParams}`
  // );
  // const tableIdJson = await tableIdRes.json();
  // // const tableIdValues = tableIdJson.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE;
  // const tableIdInfos = tableIdJson.GET_STATS_LIST.DATALIST_INF.TABLE_INF;

  // console.log(tableIdInfos);

  return (
    <div>
    {/* 画面上部に条件検索ができるようにすればいいかも。 */}
    <main>
      {/* <Form action="">
        <label>
          国・地域
          <select name="area" defaultValue={area}>
            <option value = "50103">大韓民国</option>
            <option value = "10500">中華人民共和国</option>
          </select> */}
      {/* <label>
        統計表名
      </label>

      <select name="area" defaultValue={area}>
        {countryCodes.map((countryCode) => (
          <option  key={countryCode["@code"]} value={countryCode["@code"]}>
            {countryCode["@name"]}
          </option>
        ))}
      </select> */}
      

      <Form action="">
        <label>
          国・地域
        </label>

        <select name="area" defaultValue={area}>
          {countryCodes.map((countryCode) => (
            <option  key={countryCode["@code"]} value={countryCode["@code"]}>
              {countryCode["@name"]}
            </option>
          ))}
        </select>

        <label>
          品目
        </label>

        <select name="item" defaultValue={item}>
          {itemCodes.map((itemCode) => (
            <option  key={itemCode["@code"]} value={itemCode["@code"]}>
              {itemCode["@name"]}
            </option>
          ))}
        </select>

        <label>
          取得年次
        </label>

        <select name="year" defaultValue={year}>
          {yearOptions.map((yearOption) => (
            <option  key={yearOption["year"]} value={yearOption["yearSearchValue"]}>
              {yearOption["year"]}
            </option>
          ))}
        </select>

        {/* <select name="year" defaultValue={year}>
          {surveyYears.map((surveyYear) => (
            <option  key={surveyYear["@name"]} value={surveyYear["@code"]}>
              {surveyYear["@name"]}
            </option>
          ))}
        </select> */}

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
              {displayTradeData[month.amount]}
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