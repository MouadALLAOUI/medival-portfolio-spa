import { useRef, useEffect, useState } from 'react';
import styles from './ConstellationChart.module.scss';

const ConstellationChart = ({ skills = [], size = 400 }) => {
  const canvasRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const connections = [
    ['react', 'javascript'],
    ['javascript', 'typescript'],
    ['react', 'nextjs'],
    ['nodejs', 'express'],
    ['nodejs', 'mongodb'],
    ['python', 'django'],
    ['css', 'sass'],
    ['git', 'github'],
    ['docker', 'kubernetes'],
    ['postgresql', 'mongodb'],
  ];

  const getPosition = (index, total) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const radius = size * 0.35;
    return {
      x: size / 2 + Math.cos(angle) * radius,
      y: size / 2 + Math.sin(angle) * radius,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Draw connections
      connections.forEach(([from, to]) => {
        const fromIndex = skills.findIndex(s => s.id === from);
        const toIndex = skills.findIndex(s => s.id === to);
        if (fromIndex === -1 || toIndex === -1) return;

        const fromPos = getPosition(fromIndex, skills.length);
        const toPos = getPosition(toIndex, skills.length);

        ctx.beginPath();
        ctx.moveTo(fromPos.x, fromPos.y);
        ctx.lineTo(toPos.x, toPos.y);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw skill nodes
      skills.forEach((skill, i) => {
        const pos = getPosition(i, skills.length);
        const isHovered = hoveredSkill === skill.id;

        // Glow effect
        const gradient = ctx.createRadialGradient(
          pos.x, pos.y, 0,
          pos.x, pos.y, isHovered ? 30 : 20
        );
        gradient.addColorStop(0, isHovered ? 'rgba(212, 175, 55, 0.8)' : 'rgba(212, 175, 55, 0.4)');
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, isHovered ? 30 : 20, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core star
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, isHovered ? 8 : 5, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#d4af37' : '#f5f5dc';
        ctx.fill();
      });
    };

    draw();
  }, [skills, size, hoveredSkill]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let found = null;
    skills.forEach((skill, i) => {
      const pos = getPosition(i, skills.length);
      const dist = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
      if (dist < 20) found = skill.id;
    });

    setHoveredSkill(found);
  };

  return (
    <div className={styles.chartContainer} style={{ width: size, height: size }}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredSkill(null)}
        style={{ width: size, height: size }}
      />
      {hoveredSkill && (
        <div className={styles.tooltip}>
          {skills.find(s => s.id === hoveredSkill)?.name}
        </div>
      )}
    </div>
  );
};

export default ConstellationChart;
