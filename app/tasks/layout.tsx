'use client';

import {useMemo} from 'react';
import {UrqlProvider, ssrExchange, cacheExchange, fetchExchange, createClient} from '@urql/next';
import {devtoolsExchange} from '@urql/devtools';

export default function TasksPageLayout({children}: {children: React.ReactNode}) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange();
    const client = createClient({
      url: process.env.NEXT_PUBLIC_GRAPHQL_API_URL || 'http://localhost:4000/graphql',
      exchanges: [devtoolsExchange, cacheExchange, ssr, fetchExchange],
      suspense: true,
      requestPolicy: 'cache-and-network',
    });

    return [client, ssr];
  }, []);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
}
