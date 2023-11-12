'use client';

import { GetTasklistsDocument } from '@/graphql/generated';
import { Tasklist } from '@/graphql/types';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AddTasklistDialogButton } from './components/AddTasklistDialogButton';
import DeleteTaskListDialogButton from './components/DeleteTaskListDialogButton';
import EditTaskListDialogButton from './components/EditTaskListDialogButton';

const TasksListPage = () => {
  const [taskLists, setTasklists] = useState<Tasklist[]>([]);
  // const {data} = useSuspenseQuery(GetAllTasklistsDocument);
  const localTaskListNames =
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('localTaskListNames') ?? '[]') : [];
  const [localNames, setLocalNames] = useState<string[]>(localTaskListNames);
  const {data} = useSuspenseQuery(GetTasklistsDocument, {variables: {names: localNames}});

  useEffect(() => {
    if (data.tasklists) {
      const t: any = data.tasklists;
      setTasklists(t);
    }

  }, [data.tasklists]);

  // useEffect(() => {
  //   if (data?.allTasklists) {
  //     const t: any = data.allTasklists;
  //     setTasklists(t);
  //   }
  // }, [data?.allTasklists])

  return (
    <section className='my-6 px-2'>
      <div className='flex w-full max-w-sm items-center space-x-2 mb-6'>
        {/* <form
          action=''
          className='flex gap-2'
          onSubmit={(e) => {
            e.preventDefault();
            const newTaskListName = new FormData(e.target as HTMLFormElement).get('tasklist-name') as string;
            localTaskListNames.push(newTaskListName.toLowerCase());
            localStorage.setItem("localTaskListNames", JSON.stringify(localTaskListNames));
          }}>
          <Input name='tasklist-name' type='tasklist' placeholder='tasklist-name' />
          <Button className='whitespace-nowrap' type='submit'>
            Add to Local Storage
          </Button>
        </form> */}
      </div>
      <div className='text-xl'>Your Tasklists</div>
      <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3'>
        {taskLists.length > 0 ? taskLists.map((tasklist) => (
          <div key={tasklist.id} className='p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl'>
            <div className='flex justify-between'>
              <span className='inline-block text-blue-500 dark:text-blue-400'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-8 h-8'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z'
                  />
                </svg>
              </span>
              <span>
                {/* Delete button */}
                <DeleteTaskListDialogButton tasklistId={tasklist.id} />
              </span>
            </div>

            <h1 className='text-xl font-semibold text-gray-700 capitalize dark:text-white'>
              {tasklist.name}
              {/* Edit button */}
              <EditTaskListDialogButton tasklist={tasklist} />
            </h1>

            <p className='text-gray-500 dark:text-gray-300'>
              {tasklist.description ? tasklist.description : 'No description'}
            </p>

            <Link
              href={'/tasklists/' + tasklist.name}
              className='inline-flex p-2 text-blue-500 capitalize transition-colors duration-300 transform bg-blue-100 rounded-full rtl:-scale-x-100 dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </Link>
          </div>
        )): (<div>You have no task list</div>)}
        <AddTasklistDialogButton onChange={setLocalNames} />
      </div>
    </section>
  );
};

export default TasksListPage;
