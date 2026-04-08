import React from 'react';
import '../../../../shared-ui/styles/tokens.css';

export const StepperProgress = ({ currentStep, totalSteps }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div style={{ width: '100%', marginBottom: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        position: 'relative',
        marginBottom: '1rem'
      }}>
        {/* Background track */}
        <div style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '100%',
          height: '4px',
          backgroundColor: 'var(--border-color)',
          borderRadius: 'var(--radius-pill)',
          zIndex: 0
        }} />

        {/* Animated Vine (Active Track) */}
        <div style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: `${progressPercentage}%`,
          height: '4px',
          backgroundColor: 'var(--color-sage)',
          borderRadius: 'var(--radius-pill)',
          zIndex: 0,
          transition: 'width 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)'
        }} />

        {/* Bubble Markers */}
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep >= stepNumber;
          const isCurrent = currentStep === stepNumber;

          return (
            <div 
              key={stepNumber}
              className={isCurrent ? 'animate-float' : ''}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: isActive ? 'var(--color-sage)' : 'var(--color-sand)',
                border: `3px solid ${isActive ? 'var(--color-sage-light)' : 'var(--border-color)'}`,
                zIndex: 1,
                transition: 'all 0.4s ease',
                boxShadow: isCurrent ? '0 0 10px rgba(138, 154, 134, 0.5)' : 'none'
              }}
            />
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
        <span>Service</span>
        <span>Provider</span>
        <span>Time</span>
        <span>Confirm</span>
      </div>
    </div>
  );
};
