import React from 'react';
import { AudioCard } from '../UI/AudioCard';
import type { AudioData } from '../../types';

interface OriginSectionProps {
  audioData: AudioData[];
}

export const OriginSection: React.FC<OriginSectionProps> = ({ audioData }) => {
  return (
    <section className="section" id="origin">
      <div className="section-content">
        <div className="section-subtitle">Origin Stories</div>
        <div className="section-title">Find your inspiration</div>
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