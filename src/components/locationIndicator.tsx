import { AllHTMLAttributes } from 'react';

import { useGeolocation } from '@/lib/geolocationContext';

export const LocationIndicator = (props: AllHTMLAttributes<HTMLDivElement>) => {
  const geolocation = useGeolocation();
  const coords = `${geolocation.coords?.lat.toFixed(3)} / ${geolocation.coords?.lng.toFixed(3)}`;

  return (
    <div {...props}>
      {geolocation.error && (
        <div className='p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
          {geolocation.error}
        </div>
      )}

      {geolocation.coords && (
        <small className='text-gray-500'>
          Current client location: {coords}
        </small>
      )}
    </div>
  );
};
