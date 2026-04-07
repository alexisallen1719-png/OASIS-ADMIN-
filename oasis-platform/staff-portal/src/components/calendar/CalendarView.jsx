import React, { useState } from 'react';
import { GlassCard } from '../../shared-ui/components/GlassCard';
import { usePortal } from '../../context/PortalContext';
import { motion, AnimatePresence } from 'framer-motion';

// Mock color codes mapping
const SERVICE_COLORS = {
  'Massage': '#89CFF0', // Light Blue
  'Skincare': '#90EE90', // Light Green
  'Sauna': '#ff6b6b' // Red
};

const PROVIDER_COLORS = {
  'Massage Therapist': '#89CFF0',
  'Esthetician': '#90EE90',
  'Admin': '#ff6b6b',
  'Nail Tech': '#ffc0cb'
};

const HOURS = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM

export const CalendarView = () => {
  const { currentUser, appointments, setAppointments } = usePortal();
  const isAdmin = currentUser?.role === 'admin';
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Drag and Drop State
  const [draggedApptId, setDraggedApptId] = useState(null);

  const handleDragStart = (e, apptId) => {
    if (!isAdmin) {
      e.preventDefault();
      return;
    }
    setDraggedApptId(apptId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e, hour) => {
    e.preventDefault();
    if (!isAdmin || !draggedApptId) return;
    
    // Process new time mapping
    const appt = appointments.find(a => a.id === draggedApptId);
    if (appt) {
      const newDate = new Date(appt.start);
      newDate.setHours(hour, 0, 0, 0);
      setAppointments(prev => prev.map(a => a.id === draggedApptId ? { ...a, start: newDate } : a));
    }
    setDraggedApptId(null);
  };

  const simulateCheckout = () => {
    setSelectedAppt(null);
    alert('Simulating POS Checkout & Credit Card Capture...');
  };

  const simulateRebook = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    setSelectedAppt(null);
  };

  // Build grid of appointments
  const getApptsForHour = (hour) => {
    return appointments.filter(a => {
      // If Staff view, filter out other providers
      if (!isAdmin && a.provider !== currentUser?.name) return false;
      return new Date(a.start).getHours() === hour;
    });
  };

  return (
    <div className="animate-fade-in relative">
      
      {/* 3D Success Confetti Overlay */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1, rotate: [0, 10, -10, 0] }} className="text-8xl text-spa-seafoam">
             ✓
          </motion.div>
          <div className="absolute inset-0 bg-[url('https://i.gifer.com/origin/12/12b234ea57a26880026219cb84f86d8a_w200.gif')] opacity-30 bg-cover pointer-events-none mix-blend-screen" />
        </div>
      )}

      {/* Header controls */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-serif text-white">{isAdmin ? 'Master Studio Calendar' : 'My Schedule'}</h2>
          <p className="text-spa-seafoam text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric'})}</p>
        </div>
        
        {isAdmin && (
           <button className="flex items-center gap-2 bg-spa-hibiscus hover:bg-pink-500 text-white px-6 py-3 rounded-xl font-bold shadow-xl transition-all active:scale-95">
             <span className="text-xl leading-none">+</span> Add Booking
           </button>
        )}
      </div>

      <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
        <div className="flex flex-col">
          {HOURS.map(hour => {
            const hAppts = getApptsForHour(hour);
            const timeLabel = hour > 12 ? `${hour-12} PM` : hour === 12 ? '12 PM' : `${hour} AM`;
            
            return (
              <div 
                key={hour} 
                className="flex border-b border-white/5 min-h-[100px] hover:bg-white/5 transition-colors"
                onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
                onDrop={(e) => handleDrop(e, hour)}
              >
                {/* Time Stamp Margin */}
                <div className="w-24 border-r border-white/5 p-4 flex flex-col items-end text-white/50 text-sm font-medium">
                   {timeLabel}
                </div>
                
                {/* Drag/Drop Grid Cells */}
                <div className="flex-1 p-2 relative flex gap-2 overflow-x-auto">
                  <AnimatePresence>
                    {hAppts.map(appt => (
                      <motion.div
                        key={appt.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        draggable={isAdmin}
                        onDragStart={(e) => handleDragStart(e, appt.id)}
                        onClick={() => isAdmin && setSelectedAppt(appt)}
                        className={`p-3 rounded-xl flex flex-col justify-between shadow-lg cursor-pointer min-w-[200px] border border-white/10 ${isAdmin ? 'hover:brightness-110 active:cursor-grabbing' : ''}`}
                        style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                      >
                         <div className="flex items-start gap-2 mb-2">
                           <span className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ backgroundColor: appt.color, boxShadow: `0 0 8px ${appt.color}` }} />
                           <div className="leading-tight">
                             <div className="font-bold text-white text-sm">{appt.client}</div>
                             <div className="text-xs text-white/60 truncate">{appt.service}</div>
                           </div>
                         </div>
                         
                         <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-white/40 pt-2 border-t border-white/10">
                           <span>{appt.duration} Min</span>
                           {isAdmin && (
                             <span className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PROVIDER_COLORS['Massage Therapist'] }} />
                                {appt.provider}
                             </span>
                           )}
                         </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Admin Action Popover (Check out, Profile, Rebook) */}
      <AnimatePresence>
        {selectedAppt && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedAppt(null)} className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" />
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#2d2d2d] border border-spa-seafoam/30 p-6 rounded-3xl shadow-2xl z-50">
               <h3 className="text-xl font-serif text-white mb-1">{selectedAppt.client}</h3>
               <p className="text-spa-seafoam text-sm mb-6">{selectedAppt.service} ({selectedAppt.duration}m)</p>
               
               <div className="flex flex-col gap-3">
                 <button onClick={simulateCheckout} className="bg-spa-deepGreen text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-125 transition-all">
                   💳 Standard Check Out
                 </button>
                 <button className="border border-white/20 text-white py-3 rounded-xl font-bold hover:bg-white/5 transition-all">
                   👤 View Client Profile
                 </button>
                 <button onClick={simulateRebook} className="bg-spa-hibiscus text-white py-3 rounded-xl font-bold hover:bg-pink-500 transition-all shadow-lg">
                   🔄 Quick Rebook (4 Weeks)
                 </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};
