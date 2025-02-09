'use client';

import { Context } from '@/components/context-provider';
import { Button } from '@/components/ui/button';
import { GetTasklistsDocument, UpdateTasklistDocument } from '@/graphql/generated';
import { Tasklist } from '@/graphql/types';
import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { AddTasklistDialogButton } from './components/AddTasklistDialogButton';
import DeleteTaskListDialogButton from './components/DeleteTaskListDialogButton';
import EditTaskListDialogButton from './components/EditTaskListDialogButton';

const TasksListPage = () => {
  const router = useRouter();
  const {session, setSession} = useContext(Context);
  const {data: sessionData} = useSession();
  const [taskLists, setTasklists] = useState<Tasklist[]>([]);
  const [updateTasklist, {data: data1, loading, error}] = useMutation(UpdateTasklistDocument);
  const localTaskListNames =
  typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('localTaskListNames') ?? '[]') : [];
  const [localNames, setLocalNames] = useState<string[]>(localTaskListNames);
  const {data} = useQuery(GetTasklistsDocument, {variables: {names: localNames, userId: sessionData?.user?.email}});

  const currentUserId = sessionData?.user?.email;
  if (currentUserId && localTaskListNames.length > 0) {
    localTaskListNames.forEach(async (tasklistName: string) => {
      // const tasklist = session.user.tasklists.find((tasklist) => tasklist.name === tasklistName);
      await updateTasklist({
        variables: {
          tasklistName,
          edits: {
            userId: currentUserId,
          },
        },
      });
    });
    localStorage.removeItem('localTaskListNames');
  }

  useEffect(() => {
    if (data?.tasklists) {
      const t: any = data.tasklists;
      setTasklists(t);
    }
  }, [data?.tasklists]);

  useEffect(() => {
    if (sessionData && JSON.stringify(session) !== JSON.stringify(sessionData)) {
      setSession(sessionData);
    }
  }, [session, sessionData, setSession])

  return (
    <section className='my-6 px-2'>
      <div className='flex w-full max-w-sm items-center space-x-2 mb-6'></div>
      <div className='text-xl'>Your Tasklists</div>
      <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3'>
        {taskLists.length > 0 ? (
          taskLists.map((tasklist) => (
            <div key={tasklist.id} className='p-8 space-y-3 border-2 border-emerald-800 rounded-md'>
              <div className='flex justify-between'>
                <span className='inline-block text-emerald-800'>
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

              <Button asChild>
                <Link href={'/tasklists/' + tasklist.name}>View</Link>
              </Button>
            </div>
          ))
        ) : (
          <div>You have no task list</div>
        )}
        <AddTasklistDialogButton onChange={setLocalNames} />
      </div>
    </section>
  );
};

export default TasksListPage;
