import React from 'react';

export const ServiceCard = ({ id, name, duration, price, selected, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(id)}
      className={`relative p-6 rounded-3xl cursor-pointer transition-all duration-300 border-2 overflow-hidden
        ${selected 
          ? 'glass border-spa-hibiscus bg-white/80 scale-[1.02] shadow-[0_10px_30px_rgba(255,162,204,0.3)]' 
          : 'glass border-transparent bg-white/40 hover:bg-white/60 hover:-translate-y-1'
        }`}
    >
      {selected && <div className="absolute top-0 right-0 w-20 h-20 bg-spa-hibiscus filter blur-3xl opacity-30 rounded-bl-full" />}
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="text-xl font-bold text-spa-deepGreen leading-tight pr-4">{name}</h3>
      </div>
      
      <div className="flex justify-between items-end relative z-10">
        <span className="text-spa-ocean font-medium">{Math.floor(duration / 60)}h {duration % 60}m</span>
        <span className="text-2xl font-serif text-spa-deepGreen">${price}</span>
      </div>
      
      {selected && (
        <div className="mt-4 pt-4 border-t border-spa-ocean/20 text-center text-spa-hibiscus font-bold text-sm tracking-widest uppercase">
          Selected
        </div>
      )}
    </div>
  );
};
