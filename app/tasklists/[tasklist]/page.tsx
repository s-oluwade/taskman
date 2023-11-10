'use client';

/**
 * Currently there's a bug that causes infinite loop when using variables in useQuery.
 * Hence, why I'm fetching all tasks and filtering them here.
 *
 * I will love to add pagination so will replace urql with apollo client at some point
 *
 */

import {GetTasksDocument, GetAllTasksDocument, GetTasklistsDocument} from '@/graphql/generated';
import {useQuery} from '@urql/next';
import {Suspense, useEffect, useMemo, useState} from 'react';
import TaskCalendar from './components/TaskCalendar';
import TaskTable from './components/TaskTable';
import {Task} from '@/graphql/types';
import React from 'react';
import {useSearchParams} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {ArrowLeftIcon} from '@radix-ui/react-icons';
import {buttonVariants} from '@/components/ui/button';
import Link from 'next/link';
import {useSuspenseQuery} from '@apollo/experimental-nextjs-app-support/ssr';

interface TasksPageProps {
  params: {tasklist: string};
}

export default function TasksPage({params}: TasksPageProps) {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const [tasks, setTasks] = useState<NonNullable<Task>[]>([]);
  const {data} = useSuspenseQuery(GetTasksDocument, {
    variables: {tasklistName: params.tasklist},
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data?.tasks) {
      let tasks: any[] = data?.tasks.filter((task) => task?.tasklistName === checkLocalStorage(params.tasklist)) ?? [];
      if (date) {
        tasks = tasks.filter((task) => task?.dueDate && task.dueDate.includes(date));
      }
      setTasks(tasks);
    }
  }, [data, date, params.tasklist]);

  function checkLocalStorage(name: string): string {
    if (typeof window !== 'undefined') {
      let localTasklistNames = localStorage.getItem('localTaskListNames');
      if (localTasklistNames && JSON.parse(localTasklistNames).includes(name)) {
        return name;
      }
    }
    return '';
  }

  return (
    <Suspense>
      <div>
        <div className='px-8'>
          {/* <Button size={'default'} variant={'outline'}></Button> */}
          <Link href={'/tasklists'} className={buttonVariants({variant: 'outline'})}>
            <ArrowLeftIcon className='mr-2' /> Back to Tasklists
          </Link>
        </div>
        <section className='my-10'>
          <div className='rounded-[0.5rem]'>
            <div className='h-full flex flex-1 flex-col space-y-8 md:p-8 md:flex px-2'>
              <div className='flex flex-col md:flex-row justify-between grow-0 items-start'>
                <div className='p-2 space-y-2'>
                  <h2 className='text-2xl font-bold tracking-tight'>Welcome</h2>
                  <p className='text-muted-foreground'>
                    Here are the tasks in <span className='text-foreground'>{params.tasklist}</span>.
                  </p>
                </div>
                <TaskCalendar tasks={tasks} />
              </div>
              <TaskTable tasklistName={params.tasklist} tasks={tasks} />
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
}
