import { useEffect, useRef } from 'react';
import type { SceneState, Particle } from '../types';
import { SCENE_CONFIGS } from '../utils/constants';

export const useSceneManager = (canvasRef: React.RefObject<HTMLCanvasElement>, sceneType: SceneState) => {
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const frameRef = useRef<number>(0);

  const resizeCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      createParticles();
    }
  };

  const createParticles = () => {
    if (!canvasRef.current) return;

    const config = SCENE_CONFIGS[sceneType];
    const particleCount = Math.min(
      config.count,
      (window.innerWidth * window.innerHeight) / 10000
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

  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '0, 255, 136';
  };

  const animate = () => {
    frameRef.current++;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((particle, index) => {
      particle.x += particle.speedX + Math.sin(frameRef.current * 0.01 + particle.y * 0.01) * 0.1;
      particle.y += particle.speedY + Math.cos(frameRef.current * 0.01 + particle.x * 0.01) * 0.1;

      if (particle.x > canvas.width) particle.x = 0;
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.y > canvas.height) particle.y = 0;
      if (particle.y < 0) particle.y = canvas.height;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.opacity})`;
      ctx.fill();

      particlesRef.current.forEach((other, otherIndex) => {
        if (otherIndex <= index) return;
        
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150 && Math.random() > 0.7) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(${hexToRgb(particle.color)}, ${0.1 * (1 - distance / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    createParticles();
  }, [sceneType]);

  useEffect(() => {
    if (canvasRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return { resizeCanvas, createParticles };
};