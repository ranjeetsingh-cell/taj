import { NextResponse } from "next/server";
import { apiRequest } from "@/lib/laravel";

export async function GET(req) {
  try {
    //const body = await req.json();
    const data = await apiRequest('cabs');
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}