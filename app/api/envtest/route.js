export function GET() {
  return Response.json({
    API_URL: process.env.API_URL ?? "NOT_FOUND",
    API_TOKEN: process.env.API_TOKEN ? "FOUND" : "NOT_FOUND",
    NODE_ENV: process.env.NODE_ENV
  });
}
