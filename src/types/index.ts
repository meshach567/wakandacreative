export type SceneState = 'wireframe' | 'garden' | 'final';

export interface AppState {
  currentSection: string;
  scrollProgress: number;
  isLoading: boolean;
  sceneState: SceneState;
  currentAudio: string | null;
}

export interface AudioData {
  id: string;
  name: string;
  role: string;
  src: string;
}

export interface Section {
  id: string;
  title?: string;
  subtitle?: string;
  content?: React.ReactNode;
}

export interface QuizOption {
  id: string;
  title: string;
  value: string;
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

export interface SceneConfig {
  color: string;
  count: number;
  speed: number;
}