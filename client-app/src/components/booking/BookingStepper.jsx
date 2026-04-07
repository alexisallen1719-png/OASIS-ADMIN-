import React, { useState } from 'react';
import { StepperProgress } from './StepperProgress';
import { StepService } from './StepService';
import { StepProvider } from './StepProvider';
import { StepTime } from './StepTime';
import { StepConfirm } from './StepConfirm';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';

export const BookingStepper = () => {
  const [step, setStep] = useState(1);
  const { cart, removeFromCart, referralActive } = useApp();
  const [isBrowsingMore, setIsBrowsingMore] = useState(cart.length === 0);
  
  const [bookingData, setBookingData] = useState({
    provider: null,
    time: null
  });

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isNextDisabled = () => {
    if (step === 1 && cart.length === 0) return true;
    if (step === 2 && !bookingData.provider) return true;
    if (step === 3 && !bookingData.time) return true;
    return false;
  };

  // Intelligent Add-On Logic
  const getSuggestedAddon = () => {
    if (cart.length === 0) return null;
    const hasFacial = cart.some(s => s.category.includes('Facial'));
    if (hasFacial) return { id: 'a01', name: 'LED Light Therapy Edit', price: 45, duration: 15 };
    return { id: 'a02', name: 'Aromatherapy Upgrade', price: 25, duration: 0 };
  };

  return (
    <div className="glass w-full max-w-4xl mx-auto p-4 md:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-2 border-white/40">
      <StepperProgress currentStep={step} totalSteps={4} />

      <div className="min-h-[400px] py-8">
        {step === 1 && (
          <div className="animate-fade-in">
            {/* The Cart View */}
            {!isBrowsingMore && cart.length > 0 && (
              <div className="space-y-6">
                <div className="flex justify-between items-end mb-6">
                  <h3 className="text-3xl font-serif text-spa-deepGreen">Your Spa Itinerary</h3>
                  <button onClick={() => setIsBrowsingMore(true)} className="text-spa-hibiscus font-medium hover:underline">
                    + Add More Services
                  </button>
                </div>
                
                <div className="space-y-4">
                  <AnimatePresence>
                    {cart.map((service, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                        key={`${service.id}-${idx}`} 
                        className="flex justify-between items-center p-4 bg-white/60 rounded-2xl border border-white/40 shadow-sm"
                      >
                        <div>
                          <h4 className="font-bold text-spa-deepGreen text-lg">{service.name}</h4>
                          <p className="text-spa-ocean text-sm">{Math.floor(service.duration / 60)}h {service.duration % 60}m</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className="font-serif text-xl text-spa-deepGreen">${service.price}</span>
                          <button onClick={() => removeFromCart(service.id)} className="text-gray-400 hover:text-red-400 text-2xl">&times;</button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Intelligent Perks & Add-ons */}
                <div className="mt-12 bg-gradient-to-r from-spa-seafoam/30 to-spa-hibiscus/10 p-6 rounded-2xl border border-white/50">
                  <h4 className="font-serif text-xl text-spa-deepGreen mb-2">Enhance Your Experience</h4>
                  {referralActive && (
                    <div className="mb-4 inline-block bg-spa-hibiscus text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      Referral Perk Unlocked
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl">
                    <div>
                      <p className="font-bold text-spa-deepGreen">{getSuggestedAddon()?.name}</p>
                      <p className="text-sm text-spa-ocean">+ {getSuggestedAddon()?.duration} min</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {referralActive ? (
                        <span className="font-serif text-spa-hibiscus font-bold line-through text-lg opacity-60">${getSuggestedAddon()?.price}</span>
                      ) : null}
                      <span className="font-serif text-spa-deepGreen text-xl">{referralActive ? 'FREE' : `$${getSuggestedAddon()?.price}`}</span>
                      <button className="bg-spa-ocean text-white px-4 py-2 rounded-lg font-medium hover:bg-spa-sky transition-colors">Add</button>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* The Browsing View */}
            {(isBrowsingMore || cart.length === 0) && (
              <div>
                {cart.length > 0 && (
                  <button onClick={() => setIsBrowsingMore(false)} className="mb-4 text-spa-ocean hover:text-spa-deepGreen font-medium flex items-center">
                    &larr; Back to Itinerary
                  </button>
                )}
                <StepService />
              </div>
            )}
          </div>
        )}
        
        {step === 2 && (
          <StepProvider 
            selectedProviderId={bookingData.provider} 
            onSelectProvider={(id) => setBookingData({ ...bookingData, provider: id })} 
          />
        )}
        {step === 3 && (
          <StepTime 
            selectedTime={bookingData.time} 
            onSelectTime={(time) => setBookingData({ ...bookingData, time })} 
          />
        )}
        {step === 4 && (
          <StepConfirm bookingData={{ ...bookingData, cart }} />
        )}
      </div>

      <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/30">
        {step > 1 ? (
          <button onClick={prevStep} className="px-6 py-3 border-2 border-spa-ocean/30 text-spa-ocean rounded-xl font-medium hover:bg-white/20 transition-colors">
            Back
          </button>
        ) : <div />}

        {step < 4 ? (
          <button 
            onClick={nextStep} 
            disabled={isNextDisabled()} 
            className={`px-8 py-3 rounded-xl font-bold tracking-wide transition-all shadow-lg ${isNextDisabled() ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-spa-hibiscus text-white hover:bg-pink-500'}`}
          >
            Continue
          </button>
        ) : (
          <button className="px-8 py-3 bg-spa-deepGreen text-white rounded-xl font-bold tracking-wide hover:opacity-90 shadow-lg">
            Confirm & Pay Required Deposit
          </button>
        )}
      </div>
    </div>
  );
};
