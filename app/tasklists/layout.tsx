import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ApolloWrapper } from '@/lib/apollo-provider';
import { RocketIcon } from '@radix-ui/react-icons';

const session = false;

export default function TasksPageLayout({children}: {children: React.ReactNode}) {

  return (
    <ApolloWrapper>
      {!session && (
        <Alert className='mb-6 mt-2'>
          <RocketIcon className='h-4 w-4' />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>Your tasks are currently saved locally on the browser and will be transferred to your account after sign in. Clearing local storage will erase your data!</AlertDescription>
        </Alert>
      )}
      {children}
    </ApolloWrapper>
  );
}
