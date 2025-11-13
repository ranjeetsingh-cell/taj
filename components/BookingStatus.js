'use client';
import { useSearchParams } from 'next/navigation';

export default function BookingStatus() {
  const params = useSearchParams();
  const bookingId = params.get('booking_id');
  const amount = params.get('amount');

  return (
    <div className="container mt-5 text-center">
    
        <div className="alert alert-success">
          <h3>🎉 Booking Successful!</h3>
          <p>Booking ID: {bookingId}</p>
          <p>Amount to be Paid to Driver: ₹{amount}/-</p>
        </div>
     
    </div>
  );
}