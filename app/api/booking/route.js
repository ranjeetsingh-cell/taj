import { NextResponse } from "next/server";
import { apiRequest } from "@/lib/laravel";

export async function POST(req) {
   try {
    const body = await req.json();
    //const data = await apiRequest('booking','POST',body);

    const data = await apiRequest('payments/initiate','POST',body);
    return NextResponse.json(data); 
    } catch (error) {
    return NextResponse.json({ error: 'error' }, { status: 500 });
    }
  
}
