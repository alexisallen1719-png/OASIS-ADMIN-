'use client';
import React from 'react';
import { BookingStepper } from '../../components/booking/BookingStepper';
import { Navbar } from '../../components/layout/Navbar';

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-40 min-h-screen flex flex-col items-center">
        <h1 className="text-white text-5xl font-light mb-12 tracking-wider text-center px-4">Reserve Your Oasis</h1>
        <div className="w-full max-w-[1200px] px-4">
          <BookingStepper />
        </div>
      </div>
    </>
  );
}
