'use client';

import { useState } from 'react';

import { GeolocationProvider } from '@/lib/geolocationContext';

import { CountryDescription } from '@/components/countryDescription/countryDescription';
import { CountrySearchInput } from '@/components/countrySearchInput';
import { LocationIndicator } from '@/components/locationIndicator';
import { WorldMap } from '@/components/worldMap';

import { CountryItem } from '@/types';

export default function Page() {
  const [selectedCountry, setSelectedCountry] = useState<CountryItem>();

  return (
    <GeolocationProvider>
      <main className='w-full min-h-dvh max-w-5xl mx-auto pt-4 sm:pt-8 px-4'>
        <LocationIndicator className='mb-4' />

        <div className='grid md:grid-cols-2 gap-2 md:gap-8'>
          <div>
            <h1 className='mb-4'>Find your closest countries</h1>

            <CountrySearchInput
              className='mb-8'
              autoFocus
              placeholder='Enter country name'
              onSelected={setSelectedCountry}
            />

            {selectedCountry && (
              <CountryDescription
                key={selectedCountry.name}
                country={selectedCountry}
              />
            )}
          </div>

          <div>
            <WorldMap />
          </div>
        </div>
      </main>
    </GeolocationProvider>
  );
}
