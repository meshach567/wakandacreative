import React from 'react';

export const HallSection: React.FC = () => {
  return (
    <section className="section" id="hall">
      <div className="section-content">
        <div className="section-subtitle">Welcome to</div>
        <div className="hero-title">The Hall of Zero Limits</div>
        <div className="section-subtitle" style={{ marginTop: 'var(--spacing-lg)' }}>
          An ever-changing space for creativity and growth
        </div>
      </div>
    </section>
  );
};