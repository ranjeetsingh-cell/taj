'use client';
import { useSearchParams } from 'next/navigation';

export default function PaymentStatus() {
  const params = useSearchParams();
  const status = params.get('status');
  const bookingId = params.get('booking_id');
  const amount = params.get('amount');
 const message = params.get('message');
  return (
    <div className="container mt-5 text-center">
      {status === 'success' ? (
        <div className="alert alert-success">
          <h3>🎉 Payment Successful!</h3>
          <p>Booking ID: {bookingId}</p>
          <p>Amount: ₹{amount}</p>
        </div>
      ) : (
        <div className="alert alert-danger">
          <h3>❌ Payment Failed</h3>
           <p>Booking ID: {bookingId}</p>
            <p>Message: {message}</p>
          <p>Please try again or contact support.</p>
        </div>
      )}
    </div>
  );
}
