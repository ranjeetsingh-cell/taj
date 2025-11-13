import { NextResponse } from "next/server";
import { apiRequest } from "@/lib/laravel";

export async function POST(req) {
   try {
    const body = await req.json();
    const data = await apiRequest('lead','POST',body);
    return NextResponse.json(data); 
    } catch (error) {
    return NextResponse.json({ error: 'error in API' }, { status: 500 });
    }
  
}
