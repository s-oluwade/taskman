"use client"

import {useMemo} from 'react';
import {UrqlProvider, ssrExchange, cacheExchange, fetchExchange, createClient} from '@urql/next';

export default function TasksPageLayout({children}: {children: React.ReactNode}) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange();
    const client = createClient({
      url: process.env.NEXT_PUBLIC_GRAPHQL_API_URL || 'http://localhost:4000/graphql',
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true,
      fetchOptions: {
        cache: 'no-store'
      }
    });

    return [client, ssr];
  }, []);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
}