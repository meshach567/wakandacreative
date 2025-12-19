import React from 'react';

export const HeroSection: React.FC = () => {
  const words = [
    "You", "have", "entered", "the", "Hall", "of", "Zero", "Limits."
  ];

  return (
    <section className="section" id="hero">
      <div className="section-content">
        {words.map((word, index) => (
          <div className="cinematic-line" key={index}>
            <span className="cinematic-word">{word}</span>
          </div>
        ))}
        <div className="section-subtitle" style={{ marginTop: 'var(--spacing-xl)' }}>
          Great things lie ahead for all who open themselves to finding their gift.
        </div>
      </div>
    </section>
  );
};