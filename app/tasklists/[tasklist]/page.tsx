import {buttonVariants} from '@/components/ui/button';
import {GetTasksDueDatesDocument} from '@/graphql/generated';
import {getClient} from '@/lib/client';
import {ArrowLeftIcon} from '@radix-ui/react-icons';
import Link from 'next/link';
import TaskCalendar from './components/TaskCalendar';
import TaskTable from './components/TaskTable';
import Image from 'next/image';

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
      <div className='px-8'>
        <div className='flex items-center justify-center'>
          <Image width={'150'} height={'150'} className='object-cover rounded-full' src='/img/task-man.png' alt='' />
        </div>
        <p className='text-center mb-6'>
          Lazy <span className='text-green-400'>Taskman</span> complete your darn{' '}
          <span className='text-green-400'>Task</span>.
        </p>
        <div className='flex justify-between gap-6 py-8 items-end sm:items-start flex-col sm:flex-row'>
          <Link href={'/tasklists'} className={buttonVariants({variant: 'outline'})}>
            <ArrowLeftIcon className='mr-2' /> Back to Tasklists
          </Link>
          <TaskCalendar tasksDueDates={calendarTasks} />
        </div>
      </div>
      <section>
        <div className='rounded-[0.5rem]'>
          <div className='h-full flex flex-1 flex-col md:p-8 px-2'>
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
