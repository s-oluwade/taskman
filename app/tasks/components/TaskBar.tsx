'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  ArrowDownIcon,
  ArrowRightIcon,
  CheckCircledIcon,
  CircleIcon,
  ClockIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
  TrashIcon,
} from '@radix-ui/react-icons';

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {ToastAction} from '@/components/ui/toast';
import {useToast} from '@/components/ui/use-toast';
import {DialogClose} from '@radix-ui/react-dialog';
import {addDays} from 'date-fns';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState, useTransition} from 'react';
import {options} from '../data/options';
import {DisabledDueDatePicker} from './DisabledDueDatePicker';
import {SubTaskTable} from './SubTaskTable';
import styles from './TaskTable.module.css';
import AnimatingIcon from '@/components/AnimatingIcon';
import {Task} from '@/graphql/types';
import {useMutation, Mutation, useQuery} from 'urql';
import {EditTaskDocument, DeleteTaskDocument} from '@/graphql/generated';

interface TaskBarProps {
  originalTask: Task;
  width: number;
  index: number;
  // onDelete: (newTaskList: Task[]) => void;
}

const icons = {
  backlog: QuestionMarkCircledIcon,
  todo: CircleIcon,
  inprogress: StopwatchIcon,
  done: CheckCircledIcon,
  canceled: CrossCircledIcon,
  low: ArrowDownIcon,
  medium: ArrowRightIcon,
  high: ExclamationTriangleIcon,
};

const TaskBar = ({originalTask, width, index}: TaskBarProps) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {toast} = useToast();
  const [task, setTask] = useState<Task>(originalTask);
  const [updatedTask, updateTask] = useMutation(EditTaskDocument);
  const [deletedTaskResult, deleteTask] = useMutation(DeleteTaskDocument);

  useEffect(() => {
    setTask(originalTask);
  }, [originalTask]);

  // useEffect(() => {
  //   setTask(updatedTask);
  // }, [updatedTask]);

  const toggleRow = (rowId: number) => {
    if (expandedRows.includes(rowId)) {
      setExpandedRows(expandedRows.filter((id) => id !== rowId));
    } else {
      setExpandedRows([...expandedRows, rowId]);
    }
  };

  // async function deleteTask(taskId: number) {
  //   await fetch('http://localhost:3000/api/tasks/' + taskId, {
  //     method: 'DELETE',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({}),
  //   });

  //   startTransition(() => {
  //     // Refresh the current route and fetch new data from the server without
  //     // losing client-side browser or React state.
  //     router.refresh();
  //   });
  // }

  async function snoozeTask(toDate: string, taskId: number) {
    updateTask({id: taskId, edits: {dueDate: toDate}});
  }

  if (!task) {
    return;
  }

  return (
    <React.Fragment>
      <tr>
        <td colSpan={width}>
          <Progress value={task.progress} />
        </td>
      </tr>
      <tr className={styles.tableRow} onClick={() => toggleRow(index)}>
        <td className={styles.tableCell}>
          <div className='flex items-center'>
            {task.status === 'backlog' && <icons.backlog className='mr-2 h-6 w-6 text-muted-foreground' />}
            {task.status === 'todo' && <icons.todo className='mr-2 h-6 w-6 text-muted-foreground' />}
            {task.status === 'in progress' && <icons.inprogress className='mr-2 h-6 w-6 text-blue-500' />}
            {task.status === 'done' && <icons.done className='mr-2 h-6 w-6 text-green-500' />}
            {task.status === 'canceled' && <icons.canceled className='mr-2 h-6 w-6 text-red-700' />}
            {/* <span className='capitalize whitespace-nowrap'>{item.status}</span> */}
          </div>
        </td>
        <td className={`${styles.tableCell} text-center`}>
          <span>TASK-{index + 1}</span>
        </td>
        <td className={`${styles.tableCell} flex gap-4`}>
          <div>
            <Badge className='m-2' variant='outline'>
              {task.label}
            </Badge>
            <span className='capitalize'>{task.title}</span>
          </div>
          {task.progress === 100 && <AnimatingIcon animationIndex={0} />}
        </td>
        <td className={`${styles.tableCell} text-center`}>
          <div className='flex items-center justify-center'>
            <Select
              onValueChange={(newVal: any) => {
                updateTask({id: task.id, edits: {priority: newVal}});
              }}
              value={task.priority}>
              <SelectTrigger className='w-[130px]'>
                <SelectValue defaultValue={task.priority} />
              </SelectTrigger>
              <SelectContent>
                {options.priorities.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    <div className='flex'>
                      {priority.value === 'low' && <icons.low className='mr-2 h-5 w-5 text-blue-400' />}
                      {priority.value === 'medium' && <icons.medium className='mr-2 h-5 w-5 text-yellow-400' />}
                      {priority.value === 'high' && <icons.high className='mr-2 h-5 w-5 text-red-400' />}
                      <span className='capitalize'>{priority.value}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </td>
        <td className={`${styles.tableCell} text-center`}>
          <DisabledDueDatePicker dateString={task.dueDate ?? null} />
        </td>
        <td>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (task.dueDate) {
                      const {dismiss} = toast({
                        title: 'Snoozed!',
                        description: `+1 day ${addDays(new Date(task.dueDate), 1).toLocaleString()}`,
                        action: (
                          <ToastAction
                            onClick={() => {
                              clearTimeout(timeout);
                              updateTask({id: task.id, edits: {dueDate: addDays(new Date(task.dueDate!), 0).toLocaleString()}});
                              dismiss();
                            }}
                            altText='Goto schedule to undo'>
                            Undo
                          </ToastAction>
                        ),
                      });
                      updateTask({id: task.id, edits: {dueDate: addDays(new Date(task.dueDate!), 1).toLocaleString()}});
                      const timeout = setTimeout(() => {
                        dismiss();
                      }, 5000);
                    }
                  }}
                  variant={'outline'}
                  size={'icon'}>
                  <ClockIcon className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Snooze one day</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </td>
        <td>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                variant={'outline'}
                size={'icon'}>
                <TrashIcon className='h-4 w-4' />
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Delete Task</DialogTitle>
                <DialogDescription>Are you sure?</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>
                  <Button
                    onClick={() => {
                      deleteTask({id: task.id}).then((result) => {
                        console.log(result.data);
                      });
                    }}
                    type='submit'>
                    Delete
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </td>
      </tr>
      <tr>
        <td colSpan={width}>
          <div className={`${styles.expandedRow} ${expandedRows.includes(index) ? `${styles.show}` : ''}`}>
            <SubTaskTable subtasks={task.subtasks} cursor={task.cursor} />
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default TaskBar;
