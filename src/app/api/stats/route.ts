export async function GET() {
  const APP_ID = process.env.ESTAT_APP_ID!;

  const params = new URLSearchParams({
    appId: APP_ID,
    statsDataId: "0003378613",   // 統計表ID
    // cdArea: "13000",             // 例: 東京都
    // limit: "100",
  });

  const res = await fetch(
    `https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData?${params}`
  );
  const json = await res.json();

  // 実データは VALUE 配列に入っている
  const values = json.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE;
  // 各要素: { "@area": "13000", "@time": "2020...", "$": "14047594" } のような形
  console.log(values);
  return Response.json(values);

}