import { GetTasksDocument } from '@/graphql/generated';
import { getClient } from '@/lib/client';
import CreateTaskButton from './CreateTaskButton';
import TaskBar from './TaskBar';
import styles from './TaskTable.module.css';
import { getTasks } from '../actions';

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
        <span className='px-4 text-muted-foreground'>Completed {completed+'/'+tasks.length}</span>
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
            <th className={`${styles.tableHead} hidden lg:table-cell `}><span className='lg:pl-12'>due</span></th>
            <th className='hidden lg:table-cell'/>
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
