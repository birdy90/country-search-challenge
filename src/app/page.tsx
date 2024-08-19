import { countries } from '@/data/countries';

import { CountryDescription } from '@/components/countryDescription/countryDescription';
import { Input } from '@/components/input';
import { ResultsList } from '@/components/resultsList';

export default function Page() {
  return (
    <main className='w-full min-h-dvh max-w-xl mx-auto pt-4 sm:pt-8 px-4 flex flex-col gap-2'>
      <h1>Find your closest countries</h1>
      <Input autoFocus placeholder='Enter country name' />
      <ResultsList items={['Georgia', 'Armenia', 'Austria']} />
      <ResultsList items={[]} />
      {Array(countries.length)
        .fill(0)
        .map((_, i) => {
          return <CountryDescription key={i} country={countries[i]} />;
        })}
    </main>
  );
}
