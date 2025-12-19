import { useRef, useEffect, useCallback, useState } from 'react';
import { useAudioManager } from '../../hooks/useAudioManager';

interface AudioCardProps {
  id: string;
  name: string;
  role: string;
  audioSrc: string;
}

export const AudioCard: React.FC<AudioCardProps> = ({
  id,
  name,
  role,
  audioSrc,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);

  const {
    registerAudio,
    toggleAudio,
    seekAudio,
    audioInstances,
    currentAudioId,
  } = useAudioManager();

  const audioInstance = audioInstances.get(id);
  const isPlaying = currentAudioId === id && audioInstance?.isPlaying;

  // Register audio once
  useEffect(() => {
    if (!audioRef.current) return;
    return registerAudio(id, audioRef.current);
  }, [id, registerAudio]);

  // Sync progress safely
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
    };
  }, []);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressBarRef.current) return;

      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;

      seekAudio(id, (clickX / width) * 100);
    },
    [id, seekAudio]
  );

  return (
    <div className="audio-card">
      <div className="card-header">
        <div className="card-name">{name}</div>
        <div className="card-role">{role}</div>
      </div>

      <div className="audio-player">
        <div className="player-controls">
          <button 
          aria-describedby='video'
            className="play-btn"
            onClick={() => toggleAudio(id)}
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
            aria-pressed={isPlaying}
          >
            <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`} />
          </button>

          <div className="player-info">
            <div
              className="progress-container"
              ref={progressBarRef}
              onClick={handleProgressClick}
              role="slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              tabIndex={0}
            >
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="time-display">
              <span>{audioInstance?.currentTime ?? '00:00'}</span>
              <span>{audioInstance?.duration ?? '00:00'}</span>
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} preload="metadata">
        <source src={audioSrc} type="audio/mpeg" />
      </audio>
    </div>
  );
};
