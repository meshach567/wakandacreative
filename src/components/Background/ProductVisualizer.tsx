import React, { useRef, useEffect } from 'react';

export const ProductVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const angleRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const animate = () => {
      angleRef.current += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 80;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
      ctx.lineWidth = 4;
      ctx.stroke();

      for (let i = 0; i < 8; i++) {
        const elementAngle = angleRef.current + (i * Math.PI) / 4;
        const x = centerX + Math.cos(elementAngle) * radius;
        const y = centerY + Math.sin(elementAngle) * radius;

        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 136, ${0.5 + 0.3 * Math.sin(angleRef.current + i)})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 255, 136, 0.8)';
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="product-image" id="product-canvas-container">
      <canvas ref={canvasRef} id="product-canvas" width={300} height={300} />
    </div>
  );
};