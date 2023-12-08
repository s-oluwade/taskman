'use client';

import Header from '@/components/Header';
import { Context } from '@/components/context-provider';
import { UpdateTasklistDocument } from '@/graphql/generated';
import { ApolloWrapper } from '@/lib/apollo-provider';
import { useMutation } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

export default function TasksPageLayout({children}: {children: React.ReactNode}) {
  const {session} = useContext(Context);
  
  return (
    <SessionProvider session={session}>
      <ApolloWrapper>
        <Header />
        {children}
      </ApolloWrapper>
    </SessionProvider>
  );
}
