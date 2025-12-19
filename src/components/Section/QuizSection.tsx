import React, { useState } from 'react';
import { useAnimationManager } from '../../hooks/useAnimationManager';

export const QuizSection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { scrollToSection } = useAnimationManager();

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    
    setTimeout(() => {
      scrollToSection('find', 100);
    }, 800);
  };

  return (
    <section className="section quiz-section" id="quiz">
      <div className="section-content">
        <div className="section-subtitle">Question 1</div>
        <div className="section-title">Select a Movie Genre</div>
        <div className="quiz-options">
          <div 
            className={`quiz-option ${selectedOption === 'documentary' ? 'active' : ''}`}
            onClick={() => handleOptionSelect('documentary')}
            data-option="documentary"
          >
            <div className="option-title">Documentary</div>
            <div className="section-subtitle">Click to select</div>
          </div>
          <div 
            className={`quiz-option ${selectedOption === 'comedy' ? 'active' : ''}`}
            onClick={() => handleOptionSelect('comedy')}
            data-option="comedy"
          >
            <div className="option-title">Comedy</div>
            <div className="section-subtitle">Click to select</div>
          </div>
        </div>
        <div className="section-subtitle" style={{ marginTop: 'var(--spacing-xl)' }}>
          Select a card to continue
        </div>
      </div>
    </section>
  );
};