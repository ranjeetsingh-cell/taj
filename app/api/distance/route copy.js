import { NextResponse } from "next/server";

export default async function GET(request) {
const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const apiKey ="AIzaSyAAeedl85N5e2ExBe2xgl5VCGWdvyqL2iY";
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${from}&destinations=${to}&key=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status === "OK") {
    const distanceText = data.rows[0].elements[0].distance.text; // e.g. "350 km"
    const distanceValue = data.rows[0].elements[0].distance.value; // in meters

     const data = { distanceText, distanceInKm: distanceValue/1000 };
    return NextResponse.json(data);

  } else {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/*
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
     const distanceText = "350 km"; // e.g. "350 km"
    const distanceValue = 280; // in meters
    const data = { distanceText, distanceInKm: distanceValue };
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

*/