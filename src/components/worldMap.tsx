'use client';

import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

import { useGeolocation } from '@/lib/geolocationContext';

const canvasSize = 520;
const initialProjection = d3.geoOrthographic();

const dotsStep = 3;
const lngArr = Array.from(Array(360 / dotsStep).keys()).map(
  (t) => t * dotsStep - 180,
);
const latArr = Array.from(Array(180 / dotsStep).keys()).map(
  (t) => t * dotsStep - 90,
);

export const WorldMap = () => {
  const mapRef = useRef<HTMLCanvasElement>(null);
  const geolocation = useGeolocation();
  const [projection, setProjection] = useState<d3.GeoProjection>(
    () => initialProjection,
  );
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const newProjection = d3
      .geoOrthographic()
      .rotate([0, geolocation.coords?.lat ?? 0, 0]);
    setProjection(() => newProjection);
  }, [geolocation.coords]);

  useEffect(() => {
    const canvas = d3.select(mapRef.current);
    const context = canvas.node()?.getContext('2d');

    if (!context) return;

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvasSize, canvasSize);
    context.fillStyle = 'black';

    for (const lat of latArr) {
      for (const lng of lngArr) {
        const projectedDot = projection([lat, lng]);
        if (!projectedDot) continue;

        context.beginPath();
        context.arc(
          projectedDot[0] - 220,
          projectedDot[1] + 10,
          1,
          0,
          2 * Math.PI,
          true,
        );
        context.fill();
        context.closePath();
      }
    }

    const redDot = projection([x, y]);
    if (redDot) {
      context.fillStyle = 'red';
      context.beginPath();
      context.arc(redDot[0] - 220, redDot[1] + 10, 4, 0, 2 * Math.PI, true);
      context.fill();
      context.closePath();
    }
  }, [x, y, projection]);

  return (
    <div className='border-2'>
      <input
        type='range'
        onChange={(e) => setX(parseInt(e.target.value))}
        min='-180'
        max='180'
      />
      {x}
      <input
        type='range'
        onChange={(e) => setY(parseInt(e.target.value))}
        min='-180'
        max='180'
      />
      {y}
      <canvas
        className='border-2 border-primary-200 w-full'
        ref={mapRef}
        width={canvasSize}
        height={canvasSize}
      />
    </div>
  );
};
