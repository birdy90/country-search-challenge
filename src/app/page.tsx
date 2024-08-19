import { Input } from '@/components/Input';

export default function Page() {
  return (
    <main className='w-full min-h-dvh max-w-xl mx-auto flex flex-col gap-2'>
      <h1>Find your closest countries</h1>
      <Input autoFocus placeholder='Enter country name' />
    </main>
  );
}
