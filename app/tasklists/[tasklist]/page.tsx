import {buttonVariants} from '@/components/ui/button';
import {GetTasksDueDatesDocument} from '@/graphql/generated';
import {getClient} from '@/lib/client';
import {ArrowLeftIcon} from '@radix-ui/react-icons';
import Link from 'next/link';
import TaskCalendar from './components/TaskCalendar';
import TaskTable from './components/TaskTable';

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
              <TaskCalendar tasksDueDates={calendarTasks} />
            </div>
            <TaskTable dateParam={date} tasklistName={params.tasklist} />
          </div>
        </div>
      </section>
    </div>
  );
}
