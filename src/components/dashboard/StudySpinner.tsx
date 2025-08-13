
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DashboardCard } from './DashboardCard';
import { Button } from '../ui/button';
import { Target, RotateCw } from 'lucide-react';

interface Topic {
  value: string;
  color: string;
}

interface StudySpinnerProps {
  topics: Topic[];
}

export function StudySpinner({ topics }: StudySpinnerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const spinAngleStart = useRef(Math.random() * 10 + 10);
  const spinTime = useRef(0);
  const spinTimeTotal = useRef(0);
  const startAngle = useRef(0);

  const drawWheel = (rotateAngle = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const arc = Math.PI / (topics.length / 2);
    const radius = canvas.width / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.font = '14px Arial';

    topics.forEach((topic, i) => {
      const angle = startAngle.current + i * arc + rotateAngle;
      ctx.fillStyle = topic.color;
      ctx.beginPath();
      ctx.arc(radius, radius, radius - 5, angle, angle + arc, false);
      ctx.arc(radius, radius, 0, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.translate(
        radius + Math.cos(angle + arc / 2) * (radius - 40),
        radius + Math.sin(angle + arc / 2) * (radius - 40)
      );
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      const text = topic.value;
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    });

    // Arrow
    ctx.fillStyle = 'hsl(var(--foreground))';
    ctx.beginPath();
    ctx.moveTo(radius - 10, 0);
    ctx.lineTo(radius + 10, 0);
    ctx.lineTo(radius, 20);
    ctx.fill();
  };

  const rotate = () => {
    const spinAngle = spinAngleStart.current - easeOut(spinTime.current, 0, spinAngleStart.current, spinTimeTotal.current);
    startAngle.current += (spinAngle * Math.PI) / 180;
    drawWheel();
    spinTime.current += 10;
    if (spinTime.current < spinTimeTotal.current) {
      requestAnimationFrame(rotate);
    } else {
      stopRotateWheel();
    }
  };

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);
    spinAngleStart.current = Math.random() * 10 + 10;
    spinTime.current = 0;
    spinTimeTotal.current = Math.random() * 3000 + 4000; // Random spin duration
    rotate();
  };
  
  const stopRotateWheel = () => {
    const degrees = (startAngle.current * 180) / Math.PI + 90;
    const arcd = (Math.PI / (topics.length / 2) * 180) / Math.PI;
    const index = Math.floor((360 - (degrees % 360)) / arcd);
    const selectedTopic = topics[index];
    setResult(selectedTopic.value);
    setIsSpinning(false);
  };
  
  const easeOut = (t: number, b: number, c: number, d: number) => {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  };

  useEffect(() => {
    drawWheel();
  }, [topics]);

  return (
    <DashboardCard title="Study Spinner" icon={<Target />}>
       <div className="flex flex-col items-center gap-4">
        <canvas ref={canvasRef} width="250" height="250"></canvas>
        <div className="flex gap-2 w-full">
            <Button onClick={spin} disabled={isSpinning} className="flex-grow">
                {isSpinning ? 'Spinning...' : 'Spin'}
            </Button>
            <Button onClick={() => drawWheel()} variant="outline" size="icon" disabled={isSpinning}>
                <RotateCw className="w-4 h-4" />
            </Button>
        </div>
        {result && !isSpinning && (
          <p className="font-semibold text-center text-primary mt-2">
            Let&apos;s study: {result}!
          </p>
        )}
       </div>
    </DashboardCard>
  );
}
