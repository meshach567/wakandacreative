import { useState, useRef, useCallback } from 'react';

interface AudioInstance {
  element: HTMLAudioElement;
  isPlaying: boolean;
  duration: string;
  currentTime: string;
}

export const useAudioManager = () => {
  const [currentAudioId, setCurrentAudioId] = useState<string | null>(null);
  const [audioInstances, setAudioInstances] = useState<Map<string, AudioInstance>>(new Map());
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const registerAudio = useCallback((audioId: string, audioElement: HTMLAudioElement) => {
    audioRefs.current.set(audioId, audioElement);

    const updateInstance = () => {
      setAudioInstances(prev => {
        const newMap = new Map(prev);
        const existing = newMap.get(audioId);
        
        newMap.set(audioId, {
          element: audioElement,
          isPlaying: existing?.isPlaying || false,
          duration: formatTime(audioElement.duration || 0),
          currentTime: formatTime(audioElement.currentTime || 0)
        });
        
        return newMap;
      });
    };

    audioElement.addEventListener('loadedmetadata', updateInstance);
    audioElement.addEventListener('timeupdate', updateInstance);
    audioElement.addEventListener('ended', () => {
      setAudioInstances(prev => {
        const newMap = new Map(prev);
        const instance = newMap.get(audioId);
        if (instance) {
          newMap.set(audioId, { ...instance, isPlaying: false });
        }
        return newMap;
      });
      setCurrentAudioId(null);
    });

    updateInstance();

    return () => {
      audioElement.removeEventListener('loadedmetadata', updateInstance);
      audioElement.removeEventListener('timeupdate', updateInstance);
      audioElement.removeEventListener('ended', () => {});
    };
  }, [formatTime]);

  const toggleAudio = useCallback((audioId: string) => {
    const audioElement = audioRefs.current.get(audioId);
    if (!audioElement) return;

    if (currentAudioId && currentAudioId !== audioId) {
      const currentAudio = audioRefs.current.get(currentAudioId);
      if (currentAudio) {
        currentAudio.pause();
        setAudioInstances(prev => {
          const newMap = new Map(prev);
          const instance = newMap.get(currentAudioId);
          if (instance) {
            newMap.set(currentAudioId, { ...instance, isPlaying: false });
          }
          return newMap;
        });
      }
    }

    if (audioElement.paused) {
      audioElement.play().then(() => {
        setCurrentAudioId(audioId);
        setAudioInstances(prev => {
          const newMap = new Map(prev);
          const instance = newMap.get(audioId);
          if (instance) {
            newMap.set(audioId, { ...instance, isPlaying: true });
          }
          return newMap;
        });
      }).catch(console.error);
    } else {
      audioElement.pause();
      setAudioInstances(prev => {
        const newMap = new Map(prev);
        const instance = newMap.get(audioId);
        if (instance) {
          newMap.set(audioId, { ...instance, isPlaying: false });
        }
        return newMap;
      });
      setCurrentAudioId(null);
    }
  }, [currentAudioId]);

  const seekAudio = useCallback((audioId: string, progress: number) => {
    const audioElement = audioRefs.current.get(audioId);
    if (audioElement && audioElement.duration) {
      audioElement.currentTime = (progress / 100) * audioElement.duration;
    }
  }, []);

  return {
    currentAudioId,
    audioInstances,
    registerAudio,
    toggleAudio,
    seekAudio,
    formatTime
  };
};