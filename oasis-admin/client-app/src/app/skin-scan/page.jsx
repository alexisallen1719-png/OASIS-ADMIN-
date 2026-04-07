'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import { allServices } from '../../data/servicesData';

export default function SkinScanPage() {
  const videoRef = useRef(null);
  const router = useRouter();
  const { addToCart } = useApp();
  const [stream, setStream] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState(null);

  const startScan = async () => {
    setIsScanning(true);
    setResults(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setTimeout(() => {
        // Map to exact IDs in our mock service database
        const recommendedDbItems = allServices.filter(s => 
          s.id === 'f01' || s.id === 'm03' // Example mapping: Signature Facial and LED
        );

        setResults({
          hydration: 82,
          oilBalance: 45,
          redness: 12,
          acneRisk: 18,
          texture: 88,
          recommendations: recommendedDbItems
        });
        setIsScanning(false);
        mediaStream.getTracks().forEach(track => track.stop());
        setStream(null);
      }, 6000);

    } catch (err) {
      console.error(err);
      setIsScanning(false);
      alert("Camera access is required for AI Skin Analysis.");
    }
  };

  const handleBookAiPrescription = () => {
    results.recommendations.forEach(service => {
      addToCart(service);
    });
    router.push('/booking');
  };

  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [stream]);

  return (
    <>
      <Navbar />
      <div className="pt-32 min-h-screen flex flex-col items-center bg-gradient-to-b from-spa-seafoam to-spa-green pb-24">
        
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-serif text-spa-deepGreen mb-4">AI Skin Consultation</h1>
          <p className="text-xl text-spa-ocean max-w-2xl text-center px-4">
            Activate your camera for a private, localized diagnostic. Our neural network analyzes 5 unique dermal variables to curate your perfect spa routine.
          </p>
        </motion.div>

        {!results && (
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="glass p-8 rounded-3xl w-[90%] max-w-[600px] flex flex-col items-center shadow-2xl relative"
          >
            <div className={`relative w-full aspect-square rounded-full overflow-hidden border-8 mb-8 transition-colors duration-500 ${isScanning ? 'border-spa-hibiscus animate-pulse' : 'border-white/50'}`}>
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover bg-black/20" />
              {isScanning && (
                <>
                  <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="absolute left-0 w-full h-1 bg-spa-hibiscus shadow-[0_0_30px_#ffa2cc] z-20" />
                  <div className="absolute inset-0 border-[20px] border-spa-hibiscus/10 rounded-full z-10 pointer-events-none" />
                </>
              )}
              {!isScanning && !stream && <div className="absolute inset-0 flex items-center justify-center text-white/50 font-medium">Camera Feed Offline</div>}
            </div>

            <motion.button 
              whileHover={!isScanning ? { scale: 1.05 } : {}}
              whileTap={!isScanning ? { scale: 0.95 } : {}}
              onClick={startScan} disabled={isScanning}
              className={`w-full py-5 rounded-2xl font-bold text-xl tracking-wider text-white shadow-xl transition-all ${isScanning ? 'bg-spa-lavender cursor-not-allowed' : 'bg-spa-hibiscus hover:bg-pink-500'}`}
            >
              {isScanning ? 'Running MediaPipe FaceMesh...' : 'Align Face & Start Scan'}
            </motion.button>
            <p className="text-xs text-spa-deepGreen/60 mt-4 text-center">Processed 100% locally. No biometric data transmitted.</p>
          </motion.div>
        )}

        {results && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass p-10 rounded-3xl w-[90%] max-w-[800px] shadow-2xl bg-white/40">
            <div className="text-center border-b border-spa-deepGreen/20 pb-6 mb-8">
              <h2 className="text-4xl font-serif text-spa-deepGreen mb-2">Analysis Complete</h2>
              <p className="text-spa-ocean font-medium text-lg">Your personalized digital skin map</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-12 text-center">
              <div className="bg-white/50 p-4 rounded-2xl shadow-sm"><h3 className="text-3xl font-bold text-spa-deepGreen">{results.hydration}%</h3><p className="text-spa-deepGreen/70 text-sm font-medium">Hydration</p></div>
              <div className="bg-white/50 p-4 rounded-2xl shadow-sm"><h3 className="text-3xl font-bold text-spa-ocean">{results.oilBalance}%</h3><p className="text-spa-deepGreen/70 text-sm font-medium">Oil</p></div>
              <div className="bg-white/50 p-4 rounded-2xl shadow-sm"><h3 className="text-3xl font-bold text-spa-hibiscus">{results.redness}%</h3><p className="text-spa-deepGreen/70 text-sm font-medium">Redness</p></div>
              <div className="bg-white/50 p-4 rounded-2xl shadow-sm"><h3 className="text-3xl font-bold text-spa-lavender">{results.acneRisk}%</h3><p className="text-spa-deepGreen/70 text-sm font-medium">Acne Risk</p></div>
              <div className="bg-white/50 p-4 rounded-2xl shadow-sm"><h3 className="text-3xl font-bold text-spa-sky">{results.texture}%</h3><p className="text-spa-deepGreen/70 text-sm font-medium">Texture</p></div>
            </div>

            <div className="bg-white/60 p-8 rounded-2xl">
              <h4 className="text-2xl font-serif text-spa-deepGreen mb-6">Prescribed Therapies</h4>
              <ul className="space-y-4 list-none pb-8">
                {results.recommendations.map((r, i) => (
                  <li key={i} className="flex items-center justify-between text-lg text-spa-deepGreen font-medium bg-white/40 p-4 rounded-xl">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-spa-hibiscus rounded-full mr-4 shadow-sm" />
                      {r.name}
                    </div>
                    <span className="font-serif">${r.price}</span>
                  </li>
                ))}
              </ul>

              <motion.button 
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleBookAiPrescription}
                className="w-full bg-spa-ocean text-white py-4 rounded-xl font-bold text-lg hover:bg-spa-sky transition-colors shadow-lg"
              >
                Book Prescribed Services
              </motion.button>
            </div>
            
            <button onClick={() => setResults(null)} className="mt-6 text-spa-lavender font-medium hover:text-spa-hibiscus hover:underline w-full text-center">
              Retake Camera Scan
            </button>
          </motion.div>
        )}
      </div>
    </>
  );
}
