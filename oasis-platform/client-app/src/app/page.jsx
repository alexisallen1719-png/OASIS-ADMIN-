'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Float } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/layout/Navbar';

function HibiscusPetal({ angle, scaleMultiplier = 1, zIndexOffset = 0, colorStr = "#ffa2cc" }) {
  return (
    <group rotation={[0, 0, angle]}>
      {/* Move petal outwards and tilt slightly to simulate bloom */}
      <mesh position={[0.6 * scaleMultiplier, 0, zIndexOffset]} rotation={[0, 0.2, 0]} scale={[1 * scaleMultiplier, 0.6 * scaleMultiplier, 0.05]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshPhysicalMaterial 
          color={colorStr}
          roughness={0.1} 
          metalness={0.1} 
          transmission={0.6} 
          thickness={1.5}
          clearcoat={1}
          clearcoatRoughness={0.05}
          ior={1.4}
        />
      </mesh>
    </group>
  );
}

function FloatingHibiscus() {
  return (
    <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
      <group scale={[0.7, 0.7, 0.7]}>
        {/* Outer large petals */}
        {[0, 1, 2, 3, 4].map((i) => (
          <HibiscusPetal key={`outer-${i}`} angle={(i / 5) * Math.PI * 2} scaleMultiplier={1} zIndexOffset={0} colorStr="#ffa2cc" />
        ))}
        {/* Inner smaller layered petals */}
        {[0, 1, 2, 3, 4].map((i) => (
          <HibiscusPetal key={`inner-${i}`} angle={((i / 5) * Math.PI * 2) + Math.PI / 5} scaleMultiplier={0.7} zIndexOffset={0.1} colorStr="#ff7eae" />
        ))}
        
        {/* Long Stamen (Pistil) protruding out */}
        <mesh position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.05, 2, 16]} />
          <meshPhysicalMaterial color="#ffeba8" metalness={0.1} roughness={0.3} />
        </mesh>
        
        {/* Stamen Stigmas (little tips) */}
        <mesh position={[0, 0, 2]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshPhysicalMaterial color="#ff2d6b" clearcoat={1} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const { toggleReferral } = useApp();

  const handleSmsShare = () => {
    // 1. Simulate setting the referral state logic for the current user
    toggleReferral();
    // 2. Open native SMS application
    const message = "Pop in to redeem your free gift with oasis med spa https://oasis-finale.vercel.app/";
    window.location.href = `sms:?body=${encodeURIComponent(message)}`;
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-spa-seafoam to-spa-green">
      <Navbar />

      {/* Immersive 3D Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background 3D Canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 15] }}>
            <ambientLight intensity={0.9} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffa2cc" />
            
            {/* Array of 3D Hibiscus Plants */}
            <group position={[-5, 2, -5]}>
              <FloatingHibiscus />
            </group>
            <group position={[5, 1, -8]}>
              <FloatingHibiscus />
            </group>
            <group position={[-6, -4, -12]}>
              <FloatingHibiscus />
            </group>
             <group position={[6, -3, -6]}>
              <FloatingHibiscus />
            </group>
          </Canvas>
          {/* Water Ripple Overlay CSS */}
          <div className="absolute inset-0 bg-white/10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)', backgroundSize: '100px 100px' }} />
        </div>

        {/* Foreground Hero Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="z-10 flex flex-col items-center text-center space-y-6 pt-16"
        >
          <h1 className="text-7xl font-light tracking-[0.2em] text-white drop-shadow-xl font-serif">
            OASIS
          </h1>
          <p className="text-2xl text-spa-deepGreen font-medium tracking-wide">
            Luxury skincare & wellness sanctuary
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <Link href="/booking">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 162, 204, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-spa-hibiscus text-white px-8 py-4 rounded-full font-semibold tracking-widest shadow-xl transition-all"
              >
                Book Appointment
              </motion.button>
            </Link>
            
            <Link href="/skin-scan">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(120, 157, 219, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="glass text-spa-ocean border-spa-ocean px-8 py-4 rounded-full font-semibold tracking-widest transition-all"
              >
                AI Skin Analysis
              </motion.button>
            </Link>

            <Link href="/services">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(91, 128, 88, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="glass text-spa-deepGreen border-spa-deepGreen px-8 py-4 rounded-full font-semibold tracking-widest transition-all"
              >
                Explore Treatments
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Referral / Free Gift Component */}
      <section className="py-20 flex justify-center z-10 relative bg-white/20 backdrop-blur-sm">
        <div className="glass p-8 rounded-3xl max-w-lg w-full text-center space-y-4 shadow-[0_10px_40px_rgba(255,162,204,0.2)]">
          <h2 className="text-3xl text-spa-deepGreen font-serif">Share a free gift</h2>
          <p className="text-spa-ocean font-medium text-sm">Send a Free gift, receive a free gift. Its THAT easy!</p>
          <button 
            onClick={handleSmsShare}
            className="w-full bg-spa-hibiscus text-white py-4 rounded-2xl font-bold mt-4 hover:bg-pink-500 transition-colors shadow-lg tracking-widest text-lg"
          >
            FREE GIFT
          </button>
        </div>
      </section>
      
    </div>
  );
}
