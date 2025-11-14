import { NextResponse } from "next/server";
import { apiRequest } from "/lib/laravel";

export async function GET(req) {
  try {
  
    const { searchParams } = new URL(req.url);

    // Convert query params into a plain JS object
    const query = Object.fromEntries(searchParams.entries());

    // Build query string to append to your API endpoint
    const queryString = new URLSearchParams(query).toString();

    // Final API endpoint
    const endpoint = queryString
      ? `cabs-pricing?${queryString}`
      : `cabs-pricing`;

    const data = await apiRequest(endpoint);  
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}