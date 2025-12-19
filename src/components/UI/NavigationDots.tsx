import React from 'react';
import { useAnimationManager } from '../../hooks/useAnimationManager';
import { SECTIONS } from '../../utils/constants';

interface NavigationDotsProps {
  currentSection: string;
}

export const NavigationDots: React.FC<NavigationDotsProps> = ({ currentSection }) => {
  const { scrollToSection } = useAnimationManager();

  return (
    <div className="nav-dots">
      {SECTIONS.map((sectionId) => (
        <div
          key={sectionId}
          className={`nav-dot ${currentSection === sectionId ? 'active' : ''}`}
          data-section={sectionId}
          onClick={() => scrollToSection(sectionId)}
          title={`Go to ${sectionId}`}
          aria-label={`Navigate to ${sectionId}`}
        />
      ))}
    </div>
  );
};