import React from "react";
import { AppProvider } from "./contexts/AppContext";
import { useApp } from "./hooks/useApp";
import { useAnimationManager } from "./hooks/useAnimationManager";
import { useScrollManager } from "./hooks/useScrollManager";
import { LoadingScreen } from "./components/UI/LoadingScreen";
import { CanvasScene } from "./components/Background/CanvasScene";
import { BackgroundLayers } from "./components/Background/BackgroundLayers";
import { ScrollProgress } from "./components/UI/ScrollProgress";
import { NavigationDots } from "./components/UI/NavigationDots";
import { HeroSection } from "./components/Section/HeroSection";
import { TutorialSection } from "./components/Section/TutorialSection";
import { HallSection } from "./components/Section/HallSection";
import { OriginSection } from "./components/Section/OriginSection";
import { LibrarySection } from "./components/Section/LibrarySection";
import { SpriteSection } from "./components/Section/SpriteSection";
import { GardenSection } from "./components/Section/GardenSection";
import { QuizSection } from "./components/Section/QuizSection";
import { FindSection } from "./components/Section/FindSection";
import { AUDIO_DATA } from "./utils/constants";
import "./styles/global.css";

import type { SceneState } from "./types";

type SectionConfig = {
  id: string;
  scene: SceneState;
};

const MainApp: React.FC = () => {
  const { state, setCurrentSection, setSceneState } = useApp();
  useAnimationManager();

  useScrollManager((sectionId: string) => {
    setCurrentSection(sectionId);

    const sectionsConfig: SectionConfig[] = [
      { id: "hero", scene: "wireframe" },
      { id: "tutorial", scene: "wireframe" },
      { id: "hall", scene: "wireframe" },
      { id: "origin", scene: "garden" },
      { id: "library", scene: "garden" },
      { id: "sprite", scene: "final" },
      { id: "garden", scene: "final" },
      { id: "quiz", scene: "final" },
      { id: "find", scene: "final" },
    ];

    const currentScene =
      sectionsConfig.find((s) => s.id === sectionId)?.scene ?? "wireframe";

    setSceneState(currentScene);
  });

  if (state.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <CanvasScene sceneType={state.sceneState} />
      <BackgroundLayers currentSection={state.currentSection} />
      <ScrollProgress />
      <NavigationDots currentSection={state.currentSection} />

      <main className="main-content">
        <HeroSection />
        <TutorialSection />
        <HallSection />
        <OriginSection audioData={AUDIO_DATA.slice(0, 3)} />
        <LibrarySection audioData={AUDIO_DATA.slice(3, 6)} />
        <SpriteSection />
        <GardenSection />
        <QuizSection />
        <FindSection />
      </main>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
};

export default App;
