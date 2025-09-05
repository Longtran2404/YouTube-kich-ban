import React, { useEffect, useRef } from 'react';
import './StarBackground.css';

const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const stars = [];
    const numStars = 80; // Giảm từ 150 xuống 80 để tối ưu performance
    
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.4,
        twinkleSpeed: Math.random() * 0.01 + 0.003, // Giảm tốc độ animation
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.2, // Thêm chuyển động nhẹ
        vy: (Math.random() - 0.5) * 0.2
      });
    }
    
    let frameCount = 0;
    const animate = () => {
      frameCount++;
      
      // Chỉ clear và redraw mỗi 2 frame để giảm lag
      if (frameCount % 2 === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
          // Cập nhật vị trí với chuyển động nhẹ
          star.x += star.vx;
          star.y += star.vy;
          
          // Wrap around edges
          if (star.x < 0) star.x = canvas.width;
          if (star.x > canvas.width) star.x = 0;
          if (star.y < 0) star.y = canvas.height;
          if (star.y > canvas.height) star.y = 0;
          
          star.twinklePhase += star.twinkleSpeed;
          const twinkle = Math.sin(star.twinklePhase) * 0.2 + 0.8;
          
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
          ctx.fill();
        });
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="star-background"
    />
  );
};

export default StarBackground;