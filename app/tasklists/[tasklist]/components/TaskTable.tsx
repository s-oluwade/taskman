import { CheckCircledIcon } from '@radix-ui/react-icons';
import {getTasks} from '../actions';
import TaskBar from './TaskBar';
import styles from './TaskTable.module.css';

interface TasksProps {
  tasklistName: string;
  dateParam: string;
}

const TaskTable = async ({tasklistName, dateParam}: TasksProps) => {
  const colSpan = 7;
  const tasks = await getTasks(tasklistName, dateParam);
  const completed = tasks.filter((task) => task?.progress === 100).length;

  return (
    <div className='space-y-4 border border-gray-400 dark:border-border p-2 rounded min-w-fit'>
      <div className='flex justify-start items-center'>
        <span className='px-4 text-muted-foreground'>Completed {completed + '/' + tasks.length}</span>
        {completed === tasks.length && (
          <span>
            <span className='text-green-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-hammer inline transform -rotate-45'>
                <path d='m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9' />
                <path d='M17.64 15 22 10.64' />
                <path d='m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91' />
              </svg>
              asks Complete{' '}
              <CheckCircledIcon className='ml-2 h-6 w-6 text-green-500/50 inline' />
            </span>
          </span>
        )}
      </div>
      <table className={styles.table}>
        <thead className={styles.tableHeading}>
          <tr className={styles.tableRow}>
            {/* 5 headers on large screens, 1 header on anything smaller  */}
            <th colSpan={2} className='table-cell lg:hidden text-center'>
              TASKS
            </th>
            <th className={`${styles.tableHead} text-left hidden lg:table-cell`}>TASKS</th>
            <th className={`${styles.tableHead} text-left hidden lg:table-cell`}>
              <span className='pl-8'>title</span>
            </th>
            {/* <th className={`${styles.tableHead} hidden lg:table-cell`}>priority</th> */}
            <th className={`${styles.tableHead} hidden lg:table-cell `}>
              <span className='lg:pl-12'>due</span>
            </th>
            <th className='hidden lg:table-cell' />
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {tasks ? (
            tasks.map((task, index) => <TaskBar key={index} width={colSpan} task={task!} index={index} />)
          ) : (
            <tr>
              <td className='mt-4 text-sm text-muted-foreground text-center' colSpan={colSpan}>
                You have no task.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
