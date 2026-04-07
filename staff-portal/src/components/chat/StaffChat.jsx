import React, { useState, useRef, useEffect } from 'react';
import { GlassCard } from '../../../shared-ui/components/GlassCard';
import { usePortal } from '../../context/PortalContext';
import { motion, AnimatePresence } from 'framer-motion';

const CHECK_IN_PROMPTS = [
  "🌞 Feeling great",
  "☕ Need coffee",
  "💆 Ready to relax clients",
  "😅 Busy but excited"
];

export const StaffChat = () => {
  const { currentUser, activeAdminProfile, chatMessages, sendChatMessage, addReaction } = usePortal();
  const [inputText, setInputText] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);
  const [activeReactMessage, setActiveReactMessage] = useState(null);
  const messagesEndRef = useRef(null);

  const senderName = currentUser?.role === 'admin' ? (activeAdminProfile || 'Master Admin') : currentUser?.name;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(senderName, inputText);
    setInputText('');
  };

  const handlePromptSend = (prompt) => {
    sendChatMessage(senderName, prompt);
    setShowPrompts(false);
  };

  const handleImageUpload = () => {
    // Simulated upload
    sendChatMessage(senderName, "[📷 Sent an image]");
    setShowPrompts(false);
  };

  return (
    <div className="animate-fade-in flex flex-col h-[85vh]">
      <GlassCard style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', padding: 0 }}>
        
        {/* Chat Header */}
        <div className="bg-black/20 p-4 border-b border-white/10 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-serif text-white tracking-widest">Oasis HQ</h2>
            <p className="text-xs text-spa-seafoam">Team Group Comms</p>
          </div>
          <div className="flex -space-x-2">
            {/* Fake avatar pile */}
            <div className="w-8 h-8 rounded-full bg-spa-hibiscus border-2 border-[#2d2d2d] flex items-center justify-center text-xs font-bold text-white">A</div>
            <div className="w-8 h-8 rounded-full bg-spa-ocean border-2 border-[#2d2d2d] flex items-center justify-center text-xs font-bold text-white">G</div>
            <div className="w-8 h-8 rounded-full bg-spa-seafoam border-2 border-[#2d2d2d] flex items-center justify-center text-xs font-bold text-[#2d2d2d]">H</div>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide relative z-0">
          {chatMessages.map((msg, index) => {
            const isMe = msg.sender === senderName;
            
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} relative group`}>
                <span className="text-[10px] text-white/40 mb-1 ml-2 mr-2">{msg.sender}</span>
                
                <div className="relative">
                  {/* Reaction Popover */}
                  <AnimatePresence>
                    {activeReactMessage === msg.id && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }}
                        className={`absolute -top-10 ${isMe ? 'right-0' : 'left-0'} bg-[#2d2d2d] border border-white/20 p-2 rounded-full flex gap-2 shadow-2xl z-20`}
                      >
                        <button onClick={() => { addReaction(msg.id, '👍'); setActiveReactMessage(null); }} className="hover:scale-125 transition-transform">👍</button>
                        <button onClick={() => { addReaction(msg.id, '❤️'); setActiveReactMessage(null); }} className="hover:scale-125 transition-transform">❤️</button>
                        <button onClick={() => { addReaction(msg.id, '🎉'); setActiveReactMessage(null); }} className="hover:scale-125 transition-transform">🎉</button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div 
                    onContextMenu={(e) => { e.preventDefault(); setActiveReactMessage(activeReactMessage === msg.id ? null : msg.id); }}
                    onTouchStart={(e) => {
                      // Simple simulated long-press for ios reaction UI
                      window.pressTimer = setTimeout(() => setActiveReactMessage(msg.id), 500);
                    }}
                    onTouchEnd={() => clearTimeout(window.pressTimer)}
                    className={`px-4 py-2.5 rounded-2xl max-w-[280px] break-words cursor-pointer transition-transform active:scale-95 ${
                      isMe 
                        ? 'bg-spa-ocean text-white rounded-br-none border border-spa-sky/30' 
                        : 'bg-white/10 text-white rounded-bl-none border border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                  
                  {/* Render Reactions */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className={`absolute -bottom-3 ${isMe ? 'left-2' : 'right-2'} bg-[#1a1a1a] border border-white/20 rounded-full px-1.5 py-0.5 text-[10px] flex gap-1 shadow-md z-10`}>
                      {msg.reactions.map((r, i) => <span key={i}>{r}</span>)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-black/30 p-4 border-t border-white/10 relative z-20">
          
          <AnimatePresence>
            {showPrompts && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-full mb-2 left-4 bg-[#2a3a30] border border-spa-seafoam/30 rounded-2xl p-4 shadow-2xl w-64 space-y-2"
              >
                <div className="text-xs text-spa-seafoam/60 font-bold uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Quick Check-in</div>
                {CHECK_IN_PROMPTS.map((prompt, i) => (
                  <button 
                    key={i} 
                    onClick={() => handlePromptSend(prompt)}
                    className="block w-full text-left text-sm text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
                <div className="w-full h-px bg-white/10 my-2" />
                <button onClick={handleImageUpload} className="block w-full text-left text-sm text-spa-sky hover:bg-white/10 p-2 rounded-lg transition-colors">
                  📷 Upload from Camera Roll
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSend} className="flex items-end gap-2">
            <button 
              type="button"
              onClick={() => setShowPrompts(!showPrompts)}
              className="w-10 h-10 rounded-full bg-spa-hibiscus flex items-center justify-center text-white text-2xl font-light hover:bg-pink-500 transition-colors shadow-lg shrink-0"
            >
              +
            </button>
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl flex items-center px-4">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Message team..."
                className="w-full bg-transparent py-3 text-white placeholder-white/30 focus:outline-none"
              />
            </div>
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${inputText.trim() ? 'bg-spa-seafoam text-black' : 'bg-white/5 text-white/20'}`}
            >
              ↑
            </button>
          </form>
        </div>

      </GlassCard>
    </div>
  );
};
