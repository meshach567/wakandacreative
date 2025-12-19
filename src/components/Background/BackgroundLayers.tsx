import React from 'react';

interface BackgroundLayersProps {
  currentSection: string;
}

const sectionsConfig = [
  { id: 'hero', scene: 'wireframe' },
  { id: 'tutorial', scene: 'wireframe' },
  { id: 'hall', scene: 'wireframe' },
  { id: 'origin', scene: 'garden' },
  { id: 'library', scene: 'garden' },
  { id: 'sprite', scene: 'final' },
  { id: 'garden', scene: 'final' },
  { id: 'quiz', scene: 'final' },
  { id: 'find', scene: 'final' }
] as const;

export const BackgroundLayers: React.FC<BackgroundLayersProps> = ({ currentSection }) => {
  const currentScene = sectionsConfig.find(section => section.id === currentSection)?.scene || 'wireframe';

  return (
    <>
      <div className={`bg-layer wireframe ${currentScene === 'wireframe' ? 'active' : ''}`} />
      <div className={`bg-layer garden ${currentScene === 'garden' ? 'active' : ''}`} />
      <div className={`bg-layer final ${currentScene === 'final' ? 'active' : ''}`} />
    </>
  );
};