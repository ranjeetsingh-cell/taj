import { NextResponse } from "next/server";

export async function GET(request) {
  try {
  const { searchParams } = new URL(request.url);
    const input = searchParams.get("input");
    const apiKey = "AIzaSyAAeedl85N5e2ExBe2xgl5VCGWdvyqL2iY";

    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
    input
    )}&key=${apiKey}&inputtype=textquery&fields=formatted_address%2Cname%2Cplace_id`;

     const response = await fetch(url);

     const data = await response.json();
/*
   const data = {
            predictions: [
                {
                description: "New Delhi, Delhi",
                place_id: "ChIJLbZ-NFv9DDkRzk0gTkm3wlI"
                },
                {
                description: "Delhi Cantt, New Delhi",
                place_id: "ChIJZ7H4JDP9DDkRHYILy8qmgSU"
                }
            ]
            };
*/
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}