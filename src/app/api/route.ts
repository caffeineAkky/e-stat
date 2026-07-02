export async function GET() {
  const data = { message: "APIからの返答です" };

  return Response.json(data);
}