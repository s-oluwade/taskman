"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
  const httpLink = new HttpLink({
      uri: 'https://main--time-pav6zq.apollographos.net/graphql',
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
        defaultOptions: {
          watchQuery: {
            nextFetchPolicy: 'cache-and-network'
          }
        }
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    // <ApolloNextAppProvider makeClient={makeClient}>
    <div>

      {children}
    </div>
    // </ApolloNextAppProvider>
  )
}