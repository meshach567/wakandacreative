import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AppState, SceneState } from '../types';

interface AppContextType {
  state: AppState;
  setCurrentSection: (section: string) => void;
  setSceneState: (state: SceneState) => void;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    currentSection: 'hero',
    scrollProgress: 0,
    isLoading: true,
    sceneState: 'wireframe',
    currentAudio: null
  });

  const setCurrentSection = (section: string) => {
    setState(prev => ({ ...prev, currentSection: section }));
  };

  const setSceneState = (sceneState: SceneState) => {
    setState(prev => ({ ...prev, sceneState }));
  };

  const setIsLoading = (isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  };

  return (
    <AppContext.Provider value={{ state, setCurrentSection, setSceneState, setIsLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };