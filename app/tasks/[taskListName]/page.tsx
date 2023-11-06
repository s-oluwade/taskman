'use client';

/**
 * Currently there's a bug that causes infinite loop when using variables in useQuery.
 * Hence, why I'm fetching all tasks and filtering them here.
 *
 * I will love to add pagination so will replace urql with apollo client at some point
 *
 */

import {GetTasksDocument, GetAllTasksDocument} from '@/graphql/generated';
import {useQuery} from '@urql/next';
import {Suspense, useEffect, useState} from 'react';
import TaskCalendar from './components/TaskCalendar';
import TaskTable from './components/TaskTable';
import {Task} from '@/graphql/types';
import React from 'react';
import {useSearchParams} from 'next/navigation';

interface TasksPageProps {
  params: {taskListName: string};
}

export default function TasksPage({params}: TasksPageProps) {
  const [results] = useQuery({
    query: GetAllTasksDocument,
    requestPolicy: 'cache-and-network',
    // variables: {taskListName:checkLocalStorage(params.taskListName)},
  });

  const searchParams = useSearchParams();
  const date = searchParams.get('date');

  const [tasks, setTasks] = useState<NonNullable<Task>[]>([]);

  useEffect(() => {
    if (results.data?.allTasks) {
      let tasks: any[] =
        results.data?.allTasks.filter((task) => task?.taskListName === checkLocalStorage(params.taskListName)) ?? [];
      if (date) {
        tasks = tasks.filter((task) => task?.dueDate && task.dueDate.includes(date));
      }
      setTasks(tasks);
    }
  }, [results, date, params.taskListName]);

  function checkLocalStorage(name: string): string {
    if (typeof window !== 'undefined') {
      let localTaskListNames = localStorage.getItem('localTaskListNames');
      if (localTaskListNames && JSON.parse(localTaskListNames).includes(name)) {
        return name;
      }
    }
    return '';
  }

  return (
    <Suspense>
      <div>
        <section className='my-10'>
          <div className='rounded-[0.5rem]'>
            <div className='h-full flex flex-1 flex-col space-y-8 md:p-8 md:flex'>
              <div className='flex flex-col md:flex-row justify-between grow-0 md:items-start items-center'>
                <div className='p-2 space-y-2'>
                  <h2 className='text-2xl font-bold tracking-tight'>Welcome</h2>
                  <p className='text-muted-foreground'>
                    Here are the tasks in <span className='text-foreground'>{params.taskListName}</span>.
                  </p>
                </div>
                <TaskCalendar tasks={tasks} />
              </div>
              <TaskTable taskListName={params.taskListName} tasks={tasks} />
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
}
