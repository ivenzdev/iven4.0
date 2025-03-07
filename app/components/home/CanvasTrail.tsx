'use client';

import { useEffect, useRef } from 'react';

// Define a proper type for particles to fix type errors
interface Particle {
  x: number;
  y: number;
  z: number;
  velX: number;
  velY: number;
  velZ: number;
  age: number;
  dead: boolean;
  next?: Particle;
  projX?: number;
  projY?: number;
  alpha?: number;
  attack?: number;
  hold?: number;
  decay?: number;
  initValue?: number;
  holdValue?: number;
  lastValue?: number;
  stuckTime?: number;
  accelX?: number;
  accelY?: number;
  accelZ?: number;
}

interface ParticleList {
  first?: Particle;
}

const ParticleEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvasApp(canvas);
    }
  }, []);

  function canvasApp(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    if (!context) return;

    let displayWidth: number;
    let displayHeight: number;
    let timer: NodeJS.Timeout;
    const wait = 0;
    let count = wait - 1;
    const numToAddEachFrame = 4;
    const particleList: ParticleList = {};
    const particleAlpha = 1;
    const fLen = 280;
    let projCenterX: number;
    let projCenterY: number;
    const turnSpeed = (2 * Math.PI) / 1800;
    const sphereRad = 300;
    const sphereCenterZ = -3 - sphereRad;
    const particleRad = 1.5;
    const randAccelX = 0.15,
      randAccelY = 0.15,
      randAccelZ = 0.15;
    const gravity = 0;
    let turnAngle = 0;

    function init() {
      displayWidth = canvas.width;
      displayHeight = canvas.height;
      projCenterX = displayWidth / 2;
      projCenterY = displayHeight / 2;

      for (let i = 0; i < numToAddEachFrame * 10; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(Math.random() * 2 - 1);
        const x0 = sphereRad * Math.sin(phi) * Math.cos(theta);
        const y0 = sphereRad * Math.sin(phi) * Math.sin(theta);
        const z0 = sphereRad * Math.cos(phi);

        const p = addParticle(x0, y0, sphereCenterZ + z0, 0.005 * x0, 0.005 * y0, 0.005 * z0);

        p.attack = 50;
        p.hold = 50;
        p.decay = 160;
        p.initValue = 0;
        p.holdValue = particleAlpha;
        p.lastValue = 0;
        p.stuckTime = 20 + Math.random() * 10;
        p.accelX = 0;
        p.accelY = gravity;
        p.accelZ = 0;

        p.age = Math.floor(Math.random() * 30);
      }

      timer = setInterval(onTimer, 1000 / 24);
    }

    function onTimer() {
      count++;
      if (count >= wait) {
        count = 0;
        for (let i = 0; i < numToAddEachFrame; i++) {
          const theta = Math.random() * 2 * Math.PI;
          const phi = Math.acos(Math.random() * 2 - 1);
          const x0 = sphereRad * Math.sin(phi) * Math.cos(theta);
          const y0 = sphereRad * Math.sin(phi) * Math.sin(theta);
          const z0 = sphereRad * Math.cos(phi);
          const p = addParticle(x0, y0, sphereCenterZ + z0, 0.003 * x0, 0.003 * y0, 0.003 * z0);
          p.attack = 50;
          p.hold = 50;
          p.decay = 160;
          p.initValue = 0;
          p.holdValue = particleAlpha;
          p.lastValue = 0;
          p.stuckTime = 100 + Math.random() * 30;
          p.accelX = 0;
          p.accelY = gravity;
          p.accelZ = 0;
        }
      }
      updateParticles();
    }

    function updateParticles() {
      const sinAngle = Math.sin(turnAngle);
      const cosAngle = Math.cos(turnAngle);
      turnAngle = (turnAngle + turnSpeed) % (2 * Math.PI);

      // Clear the canvas completely
      if (context) {
        context.clearRect(0, 0, displayWidth, displayHeight);

        // Then fill with background color
        context.fillStyle = canvas.dataset.bg || 'black';
        context.fillRect(0, 0, displayWidth, displayHeight);
      }

      let p = particleList.first;
      while (p) {
        const nextParticle = p.next;
        p.age++;
        if (p.age > p.stuckTime!) {
          p.velX += p.accelX! + randAccelX * (Math.random() * 2 - 1);
          p.velY += p.accelY! + randAccelY * (Math.random() * 2 - 1);
          p.velZ += p.accelZ! + randAccelZ * (Math.random() * 2 - 1);
          p.x += p.velX;
          p.y += p.velY;
          p.z += p.velZ;
        }
        const rotX = cosAngle * p.x + sinAngle * (p.z - sphereCenterZ);
        const rotZ = -sinAngle * p.x + cosAngle * (p.z - sphereCenterZ) + sphereCenterZ;

        // Check if fLen - rotZ is not zero or negative to avoid division by zero or negative values
        if (fLen - rotZ > 0) {
          const m = fLen / (fLen - rotZ);
          p.projX = rotX * m + projCenterX;
          p.projY = p.y * m + projCenterY;
          if (p.age < p.attack! + p.hold! + p.decay!) {
            if (p.age < p.attack!) {
              p.alpha = ((p.holdValue! - p.initValue!) / p.attack!) * p.age + p.initValue!;
            } else if (p.age < p.attack! + p.hold!) {
              p.alpha = p.holdValue;
            } else {
              p.alpha = ((p.lastValue! - p.holdValue!) / p.decay!) * (p.age - p.attack! - p.hold!) + p.holdValue!;
            }
          } else {
            p.dead = true;
          }
          if (!p.dead && context) {
            const centerX = displayWidth / 2;
            const margin = 50;

            if (p.projX! < centerX - margin - 30) {
              context.fillStyle = 'white';
            } else if (p.projX! > centerX + margin - 30) {
              context.fillStyle = '#73bbd1';
            }

            // Calculate radius and ensure it's positive
            const radius = m * particleRad;

            // Only draw if radius is positive
            if (radius > 0) {
              context.beginPath();
              context.arc(p.projX!, p.projY!, radius, 0, Math.PI * 2);
              context.closePath();
              context.fill();
            }
          } else {
            recycle(p);
          }
        } else {
          p.dead = true;
        }
        p = nextParticle;
      }
    }

    function addParticle(x0: number, y0: number, z0: number, vx0: number, vy0: number, vz0: number): Particle {
      const newParticle = {} as Particle;
      if (!particleList.first) {
        particleList.first = newParticle;
      } else {
        newParticle.next = particleList.first;
        particleList.first = newParticle;
      }
      return Object.assign(newParticle, { x: x0, y: y0, z: z0, velX: vx0, velY: vy0, velZ: vz0, age: 0, dead: false });
    }

    function recycle(p: Particle) {
      if (particleList.first === p) {
        particleList.first = p.next;
      }
    }

    init();

    return () => {
      if (timer) clearInterval(timer);
    };
  }

  return <canvas className='canvas-particle' ref={canvasRef} width={600} height={600} data-rgb='255,205,205' data-bg='rgba(0, 0, 0, 0)'></canvas>;
};

export default ParticleEffect;
