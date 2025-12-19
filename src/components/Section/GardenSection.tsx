import React from 'react';

export const GardenSection: React.FC = () => {
  const words = [
    "I", "see", "you've", "made", "it", "to", "the", "Inspiration", "Garden."
  ];

  return (
    <section className="section" id="garden">
      <div className="section-content">
        {words.map((word, index) => (
          <div className="cinematic-line" key={index}>
            <span className="cinematic-word">{word}</span>
          </div>
        ))}
        <div 
          className="section-subtitle" 
          style={{ marginTop: 'var(--spacing-xl)', maxWidth: '800px' }}
        >
          This place carries more purpose than simply being pleasing to the
          eye. Here we've collected monuments that represent some of the many
          gifts that may find you in this hall.
        </div>
      </div>
    </section>
  );
};