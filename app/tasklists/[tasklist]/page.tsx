'use client';

/**
 * Currently there's a bug that causes infinite loop when using variables in useQuery.
 * Hence, why I'm fetching all tasks and filtering them here.
 *
 * I will love to add pagination so will replace urql with apollo client at some point
 *
 */

import { buttonVariants } from '@/components/ui/button';
import { GetTasksDocument, GetTasksDueDatesDocument } from '@/graphql/generated';
import { Task } from '@/graphql/types';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import TaskCalendar from './components/TaskCalendar';
import TaskTable from './components/TaskTable';

interface TasksPageProps {
  params: {tasklist: string};
}

export default function TasksPage({params}: TasksPageProps) {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const [tasks, setTasks] = useState<NonNullable<Task>[]>([]);
  const [calendarTasks, setCalendarTasks] = useState<NonNullable<Task>[]>([]);
  const {data} = useSuspenseQuery(GetTasksDocument, {
    variables: {tasklistName: params.tasklist},
    fetchPolicy: 'network-only',
  });

  const {data: calendarData} = useSuspenseQuery(GetTasksDueDatesDocument, {
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

  useEffect(() => {
    if (calendarData?.tasks) {
      let tasks: any[] = calendarData?.tasks.filter((task) => task?.tasklistName === checkLocalStorage(params.tasklist)) ?? [];
      setCalendarTasks(tasks);
    }
  }, [calendarData, params.tasklist]);

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
        <section>
          <div className='rounded-[0.5rem]'>
            <div className='h-full flex flex-1 flex-col space-y-8 md:p-8 md:flex px-2'>
              <div className='flex flex-col md:flex-row justify-between grow-0 items-start'>
                <div className='p-2 space-y-2'>
                  <h2 className='text-2xl font-bold tracking-tight'>Welcome</h2>
                  <p className='text-muted-foreground'>
                    Here are the tasks in <span className='text-foreground'>{params.tasklist}</span>.
                  </p>
                </div>
                <TaskCalendar tasks={calendarTasks} />
              </div>
              <TaskTable tasklistName={params.tasklist} tasks={tasks} />
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
}
