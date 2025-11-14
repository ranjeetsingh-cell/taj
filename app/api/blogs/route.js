import { NextResponse } from "next/server";
import { apiRequest } from "/lib/laravel";

export async function GET(request) {

    const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");

  try {
    const url = `blogs?page=${page}`;
    const data = await apiRequest(url);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}