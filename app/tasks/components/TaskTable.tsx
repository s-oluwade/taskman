"use client"

import { GetTasksDocument } from '@/graphql/generated';
import { useQuery } from '@urql/next';
import CreateTaskButton from './CreateTaskButton';
import TaskBar from './TaskBar';
import styles from './TaskTable.module.css';
import { Task } from '@/graphql/types';

interface TasksProps {
  tasks: Task[];
}

const TaskTable = ({tasks}: TasksProps) => {
  const colSpan = 7;

  return (
    <div className='space-y-4 border p-2 rounded'>
      <CreateTaskButton />
      <table className={styles.table}>
        <thead className={styles.tableHeading}>
          <tr className={styles.tableRow}>
            <th className={styles.tableHead}></th>
            <th className={styles.tableHead}>TASK</th>
            <th className={`${styles.tableHead} text-left`}>title</th>
            <th className={styles.tableHead}>priority</th>
            <th className={styles.tableHead}>due</th>
            <th colSpan={2}/>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {tasks ? (
            tasks.map((task, index) => <TaskBar key={index} width={colSpan} originalTask={task} index={index} />)
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
