import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to) {
    return NextResponse.json(
      { success: false, message: "Missing 'from' or 'to' parameter" },
      { status: 400 }
    );
  }

  const apiKey ="AIzaSyAAeedl85N5e2ExBe2xgl5VCGWdvyqL2iY";
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${from}&destinations=${to}&key=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.status === "OK") {

     const distanceText = data.rows[0].elements[0].distance.text; // e.g. "350 km"
    const distanceValue = data.rows[0].elements[0].distance.value; // in meters
    const duration = data.rows[0].elements[0].duration.value;
    const durationText = data.rows[0].elements[0].duration.text;
     const dataReturn = { distanceText, distanceInKm: Math.ceil(distanceValue/1000),duration:duration,durationText:durationText};
    return NextResponse.json(dataReturn);

  }
   else {
    return NextResponse.json({ error:'API Error' }, { status: 500 });
  }

}
