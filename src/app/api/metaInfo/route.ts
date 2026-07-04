export async function GET() {
  const APP_ID = process.env.ESTAT_APP_ID!;

  const params = new URLSearchParams({
    appId: APP_ID,
    limit: "100",
  });

  const res = await fetch(
    `https://api.e-stat.go.jp/rest/3.0/app/json/getMetaInfo?${params}`
  );
  const json = await res.json();
  const values = json.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE;

  console.log(Response.json(values));

  return Response.json(values);

}