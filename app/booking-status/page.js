import React, { Suspense } from "react";
import BookingStatus from "@/components/BookingStatus";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingStatus />
    </Suspense>
  );
}
