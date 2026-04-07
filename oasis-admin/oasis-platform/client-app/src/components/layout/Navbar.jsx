'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';

export const Navbar = () => {
  const pathname = usePathname();
  const { user } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Memberships', path: '/membership' },
    { name: 'Skin Scan AI', path: '/skin-scan' },
  ];

  const dispatchLoginEvent = () => {
    window.dispatchEvent(new Event('open-auth-modal'));
  };

  return (
    <nav className="fixed top-0 left-0 w-full px-6 py-4 md:px-12 md:py-6 flex justify-between items-center z-[100] bg-spa-deepGreen/40 backdrop-blur-md border-b text-white border-white/20">
      <Link href="/" className="text-2xl font-light tracking-[0.2em] uppercase shrink-0">
        Oasis <span className="text-spa-hibiscus font-medium">Med Spa</span>
      </Link>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center">
        {links.map(link => (
          <Link 
            key={link.path} 
            href={link.path} 
            className={`font-medium tracking-wide transition-colors ${pathname === link.path ? 'text-spa-hibiscus' : 'text-spa-seafoam hover:text-white'}`}
          >
            {link.name}
          </Link>
        ))}
        
        <div className="w-[1px] h-6 bg-white/30 mx-2" />
        
        {user ? (
          <div className="flex items-center gap-3">
            {user.photo ? (
              <img src={user.photo} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-spa-hibiscus" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-spa-hibiscus flex items-center justify-center text-white font-bold border-2 border-white">
                {user.name.charAt(0)}
              </div>
            )}
            <span className="font-medium text-sm">Welcome, {user.name}</span>
          </div>
        ) : (
          <button onClick={dispatchLoginEvent} className="font-medium text-spa-seafoam hover:text-white transition-colors">
            Log In
          </button>
        )}

        {/* Desktop Book Button */}
        <Link href="/booking">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 border-2 border-spa-hibiscus text-spa-hibiscus rounded-full font-medium tracking-wide"
          >
            Book Escape
          </motion.button>
        </Link>
      </div>

      {/* Mobile Hamburger Icon */}
      <button 
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative z-[110]"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 my-1 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`}></span>
      </button>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 bg-[#354f32] z-[105] flex flex-col items-center justify-center space-y-8 pt-20"
          >
            {user ? (
              <div className="flex flex-col items-center mb-8">
                {user.photo ? (
                  <img src={user.photo} alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-spa-hibiscus mb-4 shadow-[0_0_20px_#ffa2cc]" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-spa-hibiscus flex items-center justify-center text-3xl text-white font-bold border-4 border-white mb-4">
                     {user.name.charAt(0)}
                  </div>
                )}
                <span className="text-xl font-medium text-white">Aloha, {user.name}</span>
                <p className="text-spa-seafoam text-sm max-w-[250px] text-center mt-2">{user.bio}</p>
              </div>
            ) : (
              <button 
                onClick={() => { setMobileMenuOpen(false); dispatchLoginEvent(); }}
                className="text-2xl text-spa-hibiscus font-medium mb-8"
              >
                Log In / Create Account
              </button>
            )}

            {links.map(link => (
              <Link 
                key={link.path} 
                href={link.path} 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-3xl font-light tracking-widest ${pathname === link.path ? 'text-spa-hibiscus border-b-2 border-spa-hibiscus pb-1' : 'text-spa-seafoam active:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
