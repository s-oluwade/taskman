'use client';

import {ApolloLink, HttpLink} from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import {Next13ProgressBar} from 'next13-progressbar';

function makeClient() {
  const httpLink = new HttpLink({
    uri:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/graphql'
        : process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    // fetchOptions: {
    //   mode: 'no-cors'
    // }
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
    defaultOptions: {
      watchQuery: {
        nextFetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
    },
  });
}

export function ApolloWrapper({children}: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
      <Next13ProgressBar height='4px' color='#15691d' options={{showSpinner: true}} showOnShallow />
    </ApolloNextAppProvider>
  );
}
