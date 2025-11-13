import { Suspense } from 'react';
import Booking from './Booking';
import "../css/booking.css";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Booking />
    </Suspense>
  );
}
