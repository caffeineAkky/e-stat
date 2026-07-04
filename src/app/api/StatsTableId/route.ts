export async function GET() {
  const APP_ID = process.env.ESTAT_APP_ID!;

  const getTableIdParams = new URLSearchParams({
    appId: APP_ID,
    // searchKind: "1",   // 統計表ID
    // searchWord: "%輸出%",
    statsCode: "00350300",
    searchWord: "概況品別国別表 輸出",
    // surveyYears: "202010",
    // limit: "1000",
  });

  const tableInfoResponse = await fetch(
    `https://api.e-stat.go.jp/rest/3.0/app/json/getStatsList?${getTableIdParams}`
  );
  const tableInfoResponseJson = await tableInfoResponse.json();

  // 実データは VALUE 配列に入っている
  const tableInfoResponseValues = tableInfoResponseJson.GET_STATS_LIST.DATALIST_INF.TABLE_INF;
  // 各要素: { "@area": "13000", "@time": "2020...", "$": "14047594" } のような形
  console.log(tableInfoResponseValues);
  const tableInfoValues =  Response.json(tableInfoResponseValues);

  console.log(tableInfoValues);

  const getMetaDataParams = new URLSearchParams({
    appId: APP_ID,
    limit: "100",
    statsDataId: "0003334002",
  });

  const metaInfoResponse = await fetch(
    `https://api.e-stat.go.jp/rest/3.0/app/json/getMetaInfo?${getMetaDataParams}`
  );

  const metaInfoResponseJson = await metaInfoResponse.json();
  const metaInfoResponseValues = metaInfoResponseJson.GET_META_INFO.METADATA_INF.CLASS_INF.CLASS_OBJ;

  console.log(metaInfoResponseValues);

  // return Response.json(metaInfoResponseValues);

  const params = new URLSearchParams({
    appId: APP_ID,
    statsDataId: "0003334002",   // 統計表ID
    cdCat01: "00000000",         // 品目コード
    cdArea: "50103",             // 例: 50103: 大韓民国
    // cdTime: "201900000",          // 例: 202000000
    // limit: "",
  });

  const res = await fetch(
    `https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData?${params}`
  );
  const json = await res.json();

  // 実データは VALUE 配列に入っている
  const values = json.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ;
  // 各要素: { "@area": "13000", "@time": "2020...", "$": "14047594" } のような形
  console.log(values);
  return Response.json(values);

}