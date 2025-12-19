import React from 'react';

export const TutorialSection: React.FC = () => {
  return (
    <section className="section" id="tutorial">
      <div className="section-content">
        <div className="section-subtitle">Tutorial</div>
        <div className="hero-title">Swipe to explore</div>
        <div className="section-subtitle" style={{ marginTop: 'var(--spacing-lg)' }}>
          Swipe up and down to navigate through the Hall
        </div>
      </div>
    </section>
  );
};