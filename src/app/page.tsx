'use client';

import { useState } from 'react';

import { CountryDescription } from '@/components/countryDescription/countryDescription';
import { CountrySearchInput } from '@/components/countrySearchInput';

import { CountryItem } from '@/types';

export default function Page() {
  const [selectedCountry, setSelectedCountry] = useState<CountryItem>();

  return (
    <main className='w-full min-h-dvh max-w-xl mx-auto pt-4 sm:pt-8 px-4'>
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
  );
}
