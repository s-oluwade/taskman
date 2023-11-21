import {buttonVariants} from '@/components/ui/button';
import {GetTasksDueDatesDocument} from '@/graphql/generated';
import {getClient} from '@/lib/client';
import {ArrowLeftIcon} from '@radix-ui/react-icons';
import Link from 'next/link';
import TaskCalendar from './components/TaskCalendar';
import TaskTable from './components/TaskTable';
import Image from 'next/image';
import CreateTaskButton from './components/CreateTaskButton';

interface TasksPageProps {
  params: {tasklist: string};
  searchParams: {date: string};
}

export const revalidate = 0;

export default async function TasksPage({params, searchParams: {date}}: TasksPageProps) {
  const client = getClient();
  const {data: calendarData} = await client.query({
    query: GetTasksDueDatesDocument,
    variables: {tasklistName: params.tasklist},
    fetchPolicy: 'no-cache',
    partialRefetch: true,
  });

  let calendarTasks = calendarData?.tasks;
  if (date) {
    calendarTasks = calendarTasks.filter((task) => task?.dueDate && task.dueDate.includes(date));
  }

  return (
    <div>
      <div className='px-4'>
        <div className='flex items-center justify-center'>
          <Image width={'150'} height={'150'} className='object-cover rounded-full' src='/img/task-man.png' alt='' />
        </div>
        <p className='text-center'>
          Lazy <span className='text-green-400'>Taskman</span>
        </p>
        <p className='text-center mb-6'>
          Complete your darn{' '}
          <span className='text-green-400'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-hammer inline transform -rotate-45'>
              <path d='m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9' />
              <path d='M17.64 15 22 10.64' />
              <path d='m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91' />
            </svg>
            ask
          </span>{' '}
          !
        </p>
        <div className='flex justify-between gap-6 py-8 items-end md:items-start flex-col md:flex-row'>
          <Link href={'/tasklists'} className={buttonVariants({variant: 'outline'})}>
            <ArrowLeftIcon className='mr-2' /> Back to Tasklists
          </Link>
          <CreateTaskButton tasklistName={params.tasklist} />
          <TaskCalendar tasksDueDates={calendarTasks} />
        </div>
      </div>
      <section>
        <div className='rounded-[0.5rem]'>
          <div className='h-full flex flex-1 flex-col md:p-4 px-2'>
            <p className='text-muted-foreground p-2'>
              Here are the tasks in <span className='text-green-400'>{params.tasklist}</span>.
            </p>
            <TaskTable dateParam={date} tasklistName={params.tasklist} />
          </div>
        </div>
      </section>
    </div>
  );
}
