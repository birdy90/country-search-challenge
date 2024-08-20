'use client';

import { useState } from 'react';

import { GeolocationProvider } from '@/lib/geolocationContext';

import { CountryDescription } from '@/components/countryDescription/countryDescription';
import { CountrySearchInput } from '@/components/countrySearchInput';
import { LocationIndicator } from '@/components/locationIndicator';

import { CountryItem } from '@/types';

export default function Page() {
  const [selectedCountry, setSelectedCountry] = useState<CountryItem>();

  return (
    <GeolocationProvider>
      <main className='w-full min-h-dvh max-w-xl mx-auto pt-4 sm:pt-8 px-4'>
        <LocationIndicator className='mb-4' />

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
      </main>
    </GeolocationProvider>
  );
}
