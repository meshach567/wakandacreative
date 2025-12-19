import React from 'react';
import { AudioCard } from '../UI/AudioCard';
import type { AudioData } from '../../types';

interface LibrarySectionProps {
  audioData: AudioData[];
}

export const LibrarySection: React.FC<LibrarySectionProps> = ({ audioData }) => {
  return (
    <section className="section" id="library">
      <div className="section-content">
        <div className="section-subtitle">The Library</div>
        <div className="section-title">More help finding your gift</div>
        <div className="cards-grid">
          {audioData.map((audio) => (
            <AudioCard
              key={audio.id}
              id={audio.id}
              name={audio.name}
              role={audio.role}
              audioSrc={audio.src}
            />
          ))}
        </div>
      </div>
    </section>
  );
};