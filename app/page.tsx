import GithubButton from '@/components/GithubButton';
import GoogleButton from '@/components/GoogleButton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function Home() {

  return (
    <main className='flex min-h-screen -mt-12 flex-col items-center justify-center p-24'>
      <ul className='items-center justify-between text-sm rounded border border-gray-200 dark:border-gray-600 p-6 space-y-2'>
        <li className='text-center'>
          <GithubButton />
        </li>
        <li className='text-center'>
          <GoogleButton />
        </li>
        <li>
          <Separator className='mt-4' />
        </li>
        <li>
          <Button variant={'link'} asChild>
            <Link className='' href={'/tasklists'}>
              Continue without signing in
            </Link>
          </Button>
        </li>
      </ul>
    </main>
  );
}
