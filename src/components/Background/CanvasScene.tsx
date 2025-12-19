import React, { useRef, useEffect } from 'react';
import type { SceneState } from '../../types';

interface CanvasSceneProps {
  sceneType: SceneState;
}

// Scene configurations from original app.js
const SCENE_CONFIGS = {
  wireframe: { color: '#00ff88', count: 100, speed: 0.5 },
  garden: { color: '#ffff00', count: 150, speed: 0.8 },
  final: { color: '#8800ff', count: 200, speed: 1.2 }
} as const;

// Particle type
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

export const CanvasScene: React.FC<CanvasSceneProps> = ({ sceneType }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const frameRef = useRef<number>(0);

  // Convert hex to RGB string (from original app.js)
  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '0, 255, 136';
  };

  // Resize canvas (from original SceneManager.resize())
  const resizeCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      createParticles();
    }
  };

  // Create particles (from original SceneManager.createParticles())
  const createParticles = () => {
    if (!canvasRef.current) return;

    const config = SCENE_CONFIGS[sceneType];
    const particleCount = Math.min(
      config.count,
      (window.innerWidth * canvasRef.current.height) / 10000
    );

    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvasRef.current!.width,
      y: Math.random() * canvasRef.current!.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * config.speed,
      speedY: (Math.random() - 0.5) * config.speed,
      color: config.color,
      opacity: Math.random() * 0.5 + 0.3
    }));
  };

  // Animation loop (from original SceneManager.animate())
  const animate = () => {
    frameRef.current++;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current.forEach((particle, index) => {
      // Update position (with sine/cosine wave effects from original)
      particle.x +=
        particle.speedX + Math.sin(frameRef.current * 0.01 + particle.y * 0.01) * 0.1;
      particle.y +=
        particle.speedY + Math.cos(frameRef.current * 0.01 + particle.x * 0.01) * 0.1;

      // Wrap around screen edges
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.y > canvas.height) particle.y = 0;
      if (particle.y < 0) particle.y = canvas.height;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.opacity})`;
      ctx.fill();

      // Draw connections between particles (from original)
      particlesRef.current.forEach((other, otherIndex) => {
        if (otherIndex <= index) return;
        
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150 && Math.random() > 0.7) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(${hexToRgb(particle.color)}, ${
            0.1 * (1 - distance / 150)
          })`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  // Initialize
  useEffect(() => {
    resizeCanvas();
    createParticles();

    window.addEventListener('resize', resizeCanvas);

    // Start animation
    if (canvasRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Update particles when scene type changes
  useEffect(() => {
    createParticles();
  }, [sceneType]);

  return (
    <div id="scene-container">
      <canvas 
        ref={canvasRef} 
        id="scene-canvas" 
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
};