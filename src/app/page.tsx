import { countries } from '@/data/countries';

import { CountryDescription } from '@/components/countryDescription/countryDescription';
import { CountrySearchInput } from '@/components/countrySearchInput';

export default function Page() {
  return (
    <main className='w-full min-h-dvh max-w-xl mx-auto pt-4 sm:pt-8 px-4'>
      <h1 className='mb-4'>Find your closest countries</h1>
      <CountrySearchInput
        className='mb-8'
        autoFocus
        placeholder='Enter country name'
      />
      <CountryDescription country={countries[82]} />
    </main>
  );
}
