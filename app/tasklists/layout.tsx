'use client';

import {useMemo} from 'react';
import {UrqlProvider, ssrExchange, cacheExchange, fetchExchange, createClient} from '@urql/next';
import {devtoolsExchange} from '@urql/devtools';
import {ApolloWrapper} from '@/lib/apollo-provider';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {RocketIcon} from '@radix-ui/react-icons';

const session = false;

export default function TasksPageLayout({children}: {children: React.ReactNode}) {
  // const [client, ssr] = useMemo(() => {
  //   const ssr = ssrExchange();
  //   const client = createClient({
  //     url: process.env.NEXT_PUBLIC_GRAPHQL_API_URL || 'http://localhost:4000/graphql',
  //     exchanges: [devtoolsExchange, cacheExchange, ssr, fetchExchange],
  //     suspense: true,
  //     // requestPolicy: 'cache-and-network',
  //   });

  //   return [client, ssr];
  // }, []);

  return (
    // <UrqlProvider client={client} ssr={ssr}>
    <ApolloWrapper>
      {!session && (
        <Alert className='mb-6'>
          <RocketIcon className='h-4 w-4' />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>Your tasks are currently saved on local storage and will be transferred to your account on sign in. Clearing local storage will erase your data!</AlertDescription>
        </Alert>
      )}
      {children}
    </ApolloWrapper>
    // </UrqlProvider>
  );
}
