import { NextResponse } from "next/server";
import { apiRequest } from "/lib/laravel";

export async function GET(request, { params }) {
  try {
    const slug = params?.slug;
    const body = { slug:slug}
    const data = await apiRequest('seo-pages','POST',body);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


