'use client';
import React from 'react';
import { Navbar } from '../../components/layout/Navbar';

export default function MembershipPage() {
  return (
    <>
      <Navbar />
      <div className="pt-32 min-h-screen flex flex-col items-center">
        <h1 className="text-white text-5xl font-light mb-12 tracking-wider">Elite Memberships</h1>
        <p className="text-spa-seafoam text-xl text-center">Glow from within. Content temporarily down for upgrade.</p>
      </div>
    </>
  );
}
