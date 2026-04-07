'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';

export const AuthModal = () => {
  const { user, loginUser } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1 = Login, 2 = Profile Setup
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'verify'
  
  const handleAuthAction = (e, provider) => {
    if (e) e.preventDefault();
    if (provider === 'register') {
      setAuthMode('verify');
      return;
    }
    // Google or standard Login -> move to Profile Setup
    setStep(2);
  };

  const finalizeProfile = (e) => {
    e.preventDefault();
    loginUser({
      name: authForm.name || 'Valued Guest',
      email: authForm.email,
      photo: profileForm.photo,
      bio: profileForm.bio || 'Living the Oasis lifestyle.'
    });
    setIsOpen(false);
    setStep(1); // reset
    setAuthMode('login');
  };

  // Fake Photo Uploader
  const triggerPhotoUpload = () => {
    const fakeUrls = [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=200&h=200',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200'
    ];
    setProfileForm({ ...profileForm, photo: fakeUrls[Math.floor(Math.random() * fakeUrls.length)] });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-spa-deepGreen w-full max-w-md rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,162,204,0.3)] border border-spa-seafoam/30"
        >
          {/* Header */}
          <div className="bg-spa-green/20 p-6 flex justify-between items-center border-b border-spa-seafoam/20">
            <h3 className="text-2xl font-serif text-spa-seafoam tracking-wide">
              {step === 1 ? 'Enter the Oasis' : 'Customize Your Profile'}
            </h3>
            <button onClick={() => { setIsOpen(false); setAuthMode('login'); }} className="text-white hover:text-spa-hibiscus text-2xl font-bold">
              &times;
            </button>
          </div>

          <div className="p-8">
            {step === 1 && (
              <AnimatePresence mode="wait">
                <motion.div key={authMode} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                  
                  {authMode === 'verify' ? (
                    <div className="text-center space-y-4 py-4">
                      <div className="w-16 h-16 bg-spa-seafoam/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📧</div>
                      <h4 className="text-white text-xl font-medium">Verify your email</h4>
                      <p className="text-spa-seafoam text-sm">We&apos;ve sent a verification link to your email address. Please click the link to log in.</p>
                      <button onClick={() => setAuthMode('login')} className="mt-4 w-full bg-transparent border border-spa-seafoam text-spa-seafoam hover:bg-white/5 font-bold py-3 rounded-xl transition-colors">
                        Back to Login
                      </button>
                    </div>
                  ) : (
                    <>
                      <button 
                        type="button"
                        onClick={() => handleAuthAction(null, 'google')}
                        className="w-full relative flex items-center justify-center gap-3 bg-white text-gray-800 font-bold py-3 px-6 rounded-xl shadow-md hover:bg-gray-100 transition-colors"
                      >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
                        Continue with Google
                      </button>
                      
                      <div className="flex items-center gap-4 text-spa-seafoam/50 text-sm font-medium">
                        <div className="flex-1 h-px bg-spa-seafoam/20" /> OR EMAIL <div className="flex-1 h-px bg-spa-seafoam/20" />
                      </div>

                      {authMode === 'login' ? (
                         <form onSubmit={(e) => handleAuthAction(e, 'login')} className="space-y-4">
                           <input 
                             type="email" required placeholder="Email Address" 
                             value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})}
                             className="w-full bg-black/20 text-white placeholder-spa-seafoam/50 border border-spa-seafoam/30 rounded-xl px-4 py-3 focus:outline-none focus:border-spa-hibiscus"
                           />
                           <input 
                             type="password" required placeholder="Password" 
                             value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})}
                             className="w-full bg-black/20 text-white placeholder-spa-seafoam/50 border border-spa-seafoam/30 rounded-xl px-4 py-3 focus:outline-none focus:border-spa-hibiscus"
                           />
                           <button type="submit" className="w-full bg-spa-hibiscus hover:bg-pink-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg mt-2">
                             Log In
                           </button>
                           <div className="text-center mt-6 pt-4 border-t border-white/10">
                              <button type="button" onClick={() => setAuthMode('register')} className="text-spa-seafoam text-sm hover:text-white transition-colors">
                                Don&apos;t have an account? Create an account
                              </button>
                           </div>
                         </form>
                      ) : (
                         <form onSubmit={(e) => handleAuthAction(e, 'register')} className="space-y-4">
                           <input 
                             type="text" required placeholder="Full Name" 
                             value={authForm.name} onChange={e => setAuthForm({...authForm, name: e.target.value})}
                             className="w-full bg-black/20 text-white placeholder-spa-seafoam/50 border border-spa-seafoam/30 rounded-xl px-4 py-3 focus:outline-none focus:border-spa-hibiscus"
                           />
                           <input 
                             type="email" required placeholder="Email Address" 
                             value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})}
                             className="w-full bg-black/20 text-white placeholder-spa-seafoam/50 border border-spa-seafoam/30 rounded-xl px-4 py-3 focus:outline-none focus:border-spa-hibiscus"
                           />
                           <input 
                             type="password" required placeholder="Password" 
                             value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})}
                             className="w-full bg-black/20 text-white placeholder-spa-seafoam/50 border border-spa-seafoam/30 rounded-xl px-4 py-3 focus:outline-none focus:border-spa-hibiscus"
                           />
                           <button type="submit" className="w-full bg-spa-ocean hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg mt-2">
                             Create Account
                           </button>
                           <div className="text-center mt-6 pt-4 border-t border-white/10">
                              <button type="button" onClick={() => setAuthMode('login')} className="text-spa-seafoam text-sm hover:text-white transition-colors">
                                Already have an account? Log In
                              </button>
                           </div>
                         </form>
                      )}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {step === 2 && (
              <form onSubmit={finalizeProfile} className="space-y-6 flex flex-col items-center">
                <p className="text-spa-seafoam text-center text-sm">Upload a photo so your esthetician recognizes you!</p>
                
                <div onClick={triggerPhotoUpload} className="w-32 h-32 rounded-full border-4 border-dashed border-spa-hibiscus flex items-center justify-center cursor-pointer overflow-hidden group hover:bg-white/5 transition-colors relative">
                  {profileForm.photo ? (
                    <img src={profileForm.photo} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-spa-hibiscus font-medium group-hover:scale-110 transition-transform">Tap to Upload</span>
                  )}
                </div>

                <div className="w-full space-y-2">
                  <label className="text-spa-seafoam text-sm font-medium ml-1">About Me (Optional)</label>
                  <textarea 
                    rows="3"
                    placeholder="E.g., I have dry skin and love relaxing massages..."
                    value={profileForm.bio} onChange={e => setProfileForm({...profileForm, bio: e.target.value})}
                    className="w-full bg-black/20 text-white placeholder-spa-seafoam/50 border border-spa-seafoam/30 rounded-xl px-4 py-3 focus:outline-none focus:border-spa-hibiscus resize-none"
                  />
                </div>

                <div className="w-full flex gap-4 mt-2">
                  <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-3 border border-spa-seafoam/30 text-spa-seafoam font-bold rounded-xl hover:bg-white/5 transition-colors">
                    Skip
                  </button>
                  <button type="submit" className="flex-1 bg-spa-ocean hover:bg-spa-sky text-white font-bold py-3 rounded-xl transition-colors shadow-lg">
                    Complete Setup
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
