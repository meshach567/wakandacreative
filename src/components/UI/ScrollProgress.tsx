import { useEffect } from 'react';
import { useAnimationManager } from '../../hooks/useAnimationManager';

export const ScrollProgress: React.FC = () => {
  const { initScrollProgress } = useAnimationManager();

  useEffect(() => {
    initScrollProgress();
  }, [initScrollProgress]);

  return (
    <div className="scroll-progress">
      <div className="scroll-progress-bar" />
    </div>
  );
};
