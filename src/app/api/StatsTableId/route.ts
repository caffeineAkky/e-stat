export async function GET() {
  const APP_ID = process.env.ESTAT_APP_ID!;

  const params = new URLSearchParams({
    appId: APP_ID,
    searchKind: "1",   // 統計表ID
    searchWord: "%輸出%",
    // surveyYears: "202010",
    // limit: "1000",
  });

  const res = await fetch(
    `https://api.e-stat.go.jp/rest/3.0/app/json/getStatsList?${params}`
  );
  const json = await res.json();

  // 実データは VALUE 配列に入っている
  const values = json.GET_STATS_LIST.DATALIST_INF.TABLE_INF;
  // 各要素: { "@area": "13000", "@time": "2020...", "$": "14047594" } のような形
  console.log(values);
  return Response.json(values);

}