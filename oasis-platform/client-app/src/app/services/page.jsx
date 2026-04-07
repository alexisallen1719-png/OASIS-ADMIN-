'use client';
import React from 'react';
import { StepService } from '../../components/booking/StepService';
import { Navbar } from '../../components/layout/Navbar';

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <div className="pt-32 min-h-screen flex flex-col items-center">
        <h1 className="text-white text-5xl font-light mb-12 tracking-wider">Our Treatments</h1>
        <div className="w-full max-w-[1200px] px-4">
          <StepService selectedServiceId={null} onSelectService={() => {}} />
        </div>
      </div>
    </>
  );
}
