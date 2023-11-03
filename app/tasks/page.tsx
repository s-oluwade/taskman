'use client';

import {Metadata} from 'next';
import TaskTable from './components/TaskTable';
import {UserNav} from './components/user-nav';
import {Calendar} from '@/components/ui/calendar';
import TaskCalendar from './components/TaskCalendar';
import Link from 'next/link';
import {Suspense} from 'react';
import {useQuery, gql} from '@urql/next';
import { GetTasksDocument } from '@/graphql/generated';

// export const metadata: Metadata = {
//   title: 'Tasks',
//   description: 'A task and issue tracker build using Tanstack Table.',
// };

// export const revalidate = 0;

export default function TaskPage() {

  const [results] = useQuery({ query: GetTasksDocument });
  const tasks = results.data?.tasks ?? []

  return (
    <Suspense>
      <div>
        <section className='my-10'>
          <div className='rounded-[0.5rem]'>
            <div className='h-full flex-1 flex-col space-y-8 p-8 md:flex'>
              <div className='flex justify-between grow-0 items-start'>
                <div>
                  <h2 className='text-2xl font-bold tracking-tight'>Welcome</h2>
                  <p className='text-muted-foreground'>Here&apos;s your list of tasks.</p>
                </div>
                <TaskCalendar />
                <div className='flex items-center space-x-2'>
                  <UserNav />
                </div>
              </div>
              <TaskTable tasks={tasks} />
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
}
