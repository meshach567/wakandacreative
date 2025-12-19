export const SECTIONS = [
  'hero', 'tutorial', 'hall', 'origin', 'library', 
  'sprite', 'garden', 'quiz', 'find'
] as const;

export const AUDIO_DATA = [
  { id: '1', name: 'Hannah Beachler', role: 'Production designer', src: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3' },
  { id: '2', name: 'Jasmine Alexia', role: 'Storyboard artist', src: 'https://assets.mixkit.co/music/preview/mixkit-driving-ambition-32.mp3' },
  { id: '3', name: 'Alícia Díaz', role: 'Sculptor', src: 'https://assets.mixkit.co/music/preview/mixkit-deep-urban-623.mp3' },
  { id: '4', name: 'Naya', role: 'Software engineer', src: 'https://assets.mixkit.co/music/preview/mixkit-sci-fi-mission-167.mp3' },
  { id: '5', name: 'Marcus Chen', role: 'Sound designer', src: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3' },
  { id: '6', name: 'Sophia Rivera', role: 'Concept artist', src: 'https://assets.mixkit.co/music/preview/mixkit-driving-ambition-32.mp3' }
];

export const SCENE_CONFIGS = {
  wireframe: { color: '#00ff88', count: 100, speed: 0.5 },
  garden: { color: '#ffff00', count: 150, speed: 0.8 },
  final: { color: '#8800ff', count: 200, speed: 1.2 }
} as const;