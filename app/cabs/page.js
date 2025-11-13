import { Suspense } from 'react';
import "../css/booking.css";
import CabResult from './CabResult';

export async function generateMetadata({searchParams }) {
 
 const resolvedSearchParams = await searchParams;
const from = resolvedSearchParams?.from;
const to = resolvedSearchParams?.to;
    return {
      title: `Book Cabs on Tajways from ${from} to ${to}`,
      description: `Book Cabs on Tajways from ${from} to ${to}`,
    };
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CabResult />
      
    </Suspense>
  );
}
