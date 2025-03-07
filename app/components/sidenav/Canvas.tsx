'use client';

import React, { useRef, useEffect, useState } from 'react';

interface CircleProps {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  canvasw: number;
  canvash: number;
  color: string;
}

class Circle implements CircleProps {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  canvasw: number;
  canvash: number;
  color: string;

  constructor(x: number, y: number, dx: number, dy: number, r: number, w: number, h: number, color: string) {
    this.canvasw = w;
    this.canvash = h;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = r;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(ctx: CanvasRenderingContext2D) {
    if (this.x + this.radius >= this.canvasw || this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius >= this.canvash || this.y - this.radius <= 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw(ctx);
  }
}

function Canvas() {
  const color = '#dde6e7';
  const lineColor = 'white';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function listener() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [dimensions]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      function init(canvas: HTMLCanvasElement, count: number) {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const array: Circle[] = [];
        for (let i = 0; i < count; i++) {
          const radius = 1;
          const x = Math.random() * (canvas.width - radius * 2) + 2;
          const y = Math.random() * (canvas.height - radius * 2) + 2;

          let dx = (Math.random() - 0.5) * 2;
          let dy = (Math.random() - 0.5) * 2;

          if (dimensions.width < 640) {
            dx = (Math.random() - 0.5) * 0.8;
            dy = (Math.random() - 0.5) * 0.8;
          }

          array.push(new Circle(x, y, dx, dy, radius, canvas.width, canvas.height, color));
        }
        return array;
      }

      let animationFrameId: number;
      let array: Circle[] = [];
      const count = Math.floor((dimensions.width * dimensions.height) / 120000) + 5;
      array = init(canvas, count);

      const handleResize = () => {
        array = init(canvas, count);
      };

      window.addEventListener('resize', handleResize);

      const draw = () => {
        animationFrameId = window.requestAnimationFrame(draw);
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < count; i++) {
          array[i].update(context);
        }
      };

      draw();

      return () => {
        window.removeEventListener('resize', handleResize);
        window.cancelAnimationFrame(animationFrameId);
      };
    }, 200);

    return () => clearTimeout(timer);
  }, [dimensions, color, lineColor]);

  return <canvas ref={canvasRef} className='canvas' />;
}

export default Canvas;
