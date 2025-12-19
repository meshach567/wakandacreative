import React from 'react';

export const FindSection: React.FC = () => {
  const words = [
    "You've", "made", "great", "strides", "toward", "finding", "your", "gift."
  ];

  return (
    <section className="section" id="find">
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
          Your legacy is a continuous journey and it does not end here. Keep
          exploring or share the experience with your friends.
        </div>
        <div className="section-subtitle" style={{ marginTop: 'var(--spacing-lg)' }}>
          Remember, all are welcome to find their place in the Hall of Zero Limits.
        </div>
      </div>
    </section>
  );
};