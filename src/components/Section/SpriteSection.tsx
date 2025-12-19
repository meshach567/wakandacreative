import React from 'react';
import { ProductVisualizer } from '../Background/ProductVisualizer';

export const SpriteSection: React.FC = () => {
  return (
    <section className="section product-reveal" id="sprite">
      <div className="section-content">
        <div className="section-subtitle">SpriteZero Sugar®</div>
        <div className="section-title">Open your infinite potential</div>
        <div className="section-subtitle">
          A new path forged. A most refreshing discovery.
        </div>
        <ProductVisualizer />
      </div>
    </section>
  );
};