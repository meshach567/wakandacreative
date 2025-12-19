import React, { useEffect, useState } from 'react';
import { useApp } from '../../hooks/useApp';

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const { setIsLoading } = useApp();

  useEffect(() => {
    const totalAssets = 5;
    let loadedAssets = 0;

    const updateProgress = () => {
      loadedAssets++;
      const newProgress = (loadedAssets / totalAssets) * 100;
      setProgress(newProgress);

      if (newProgress >= 100) {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    for (let i = 0; i < totalAssets; i++) {
      setTimeout(updateProgress, 300 * (i + 1));
    }
  }, [setIsLoading]);

  return (
    <div id="loading-screen">
      <div className="hero-title">ZERO LIMITS</div>
      <div className="loading-progress">
        <div 
          className="loading-progress-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};