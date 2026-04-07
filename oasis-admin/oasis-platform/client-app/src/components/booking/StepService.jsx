import React, { useState } from 'react';
import { ServiceCard } from './ServiceCard';
import { allServices, serviceCategories } from '../../data/servicesData';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

export const StepService = () => {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0]);
  const { cart, addToCart, removeFromCart } = useApp();

  const filteredServices = allServices.filter(s => s.category === activeCategory);

  const toggleService = (service) => {
    const isSelected = cart.some(s => s.id === service.id);
    if (isSelected) {
      removeFromCart(service.id);
    } else {
      addToCart(service);
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in w-full">
      <h2 className="mb-6 text-center text-3xl font-serif text-spa-deepGreen">Choose Your Therapy</h2>
      
      {/* Scrollable Category Tabs */}
      <div className="flex overflow-x-auto gap-3 pb-6 mb-8 border-b-2 border-spa-green/30 scrollbar-hide py-2">
        {serviceCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-6 py-3 rounded-full font-medium transition-all shadow-sm ${
              activeCategory === cat 
                ? 'bg-spa-hibiscus text-white scale-105 shadow-[0_5px_15px_rgba(255,162,204,0.4)]' 
                : 'bg-white/40 text-spa-deepGreen hover:bg-white/70'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      {/* Service Grid for Active Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto pr-4 pb-12">
        {filteredServices.map((service) => (
          <motion.div 
            key={service.id} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
          >
            <ServiceCard
              id={service.id}
              name={service.name}
              duration={service.duration}
              price={service.price}
              selected={cart.some(s => s.id === service.id)}
              onSelect={() => toggleService(service)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
