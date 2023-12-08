'use client';

import { UserNav } from '@/components/UserNav';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UpdateTasklistDocument } from '@/graphql/generated';
import { useMutation } from '@apollo/client';
import { RocketIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { Context } from './context-provider';
import { Button } from './ui/button';

const Header = () => {
  const {session} = useContext(Context);

  return (
    <div className={session ? 'text-right' : ''}>
    {session ? (
      <UserNav session={session} />
    ) : (
      <>
        <Alert className='mb-6 mt-2'>
          <RocketIcon className='h-4 w-4' />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Your tasks are currently saved locally on the browser and will be transferred to your account after sign
            in. Clearing local storage will erase your data!
          </AlertDescription>
        </Alert>
        <Button asChild>
          <Link href={'/'}>Sign In</Link>
        </Button>
      </>
    )}
  </div>
  );
};

export default Header;
