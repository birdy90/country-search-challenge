import { Input } from '@/components/Input';
import { ResultsList } from '@/components/ResultsList';

export default function Page() {
  return (
    <main className='w-full min-h-dvh max-w-xl mx-auto pt-4 sm:pt-8 px-4 flex flex-col gap-2'>
      <h1>Find your closest countries</h1>
      <Input autoFocus placeholder='Enter country name' />
      <ResultsList items={['Georgia', 'Armenia', 'Austria']} />
      <ResultsList items={[]} />
    </main>
  );
}
