'use client';

import {
  Dialog,
  DialogClose,
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

import AnimatingIcon from '@/components/AnimatingIcon';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select-for-priority';
import {ToastAction} from '@/components/ui/toast';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {useToast} from '@/components/ui/use-toast';
import {DeleteTaskDocument, EditTaskDocument} from '@/graphql/generated';
import {Task} from '@/graphql/types';
import {addDays} from 'date-fns';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState, useTransition} from 'react';
import {useMutation} from 'urql';
import {options} from '../data/options';
import {TaskDueDatePicker} from './TaskDueDatePicker';
import {SubtaskTable} from './SubtaskTable';
import styles from './TaskTable.module.css';

interface TaskBarProps {
  originalTask: Task;
  width: number;
  index: number;
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
  const [updatedTaskResult, updateTask] = useMutation(EditTaskDocument);
  const [deletedTaskResult, deleteTask] = useMutation(DeleteTaskDocument);

  useEffect(() => {
    setTask(originalTask);
  }, [originalTask]);

  const toggleRow = (rowId: number) => {
    if (expandedRows.includes(rowId)) {
      setExpandedRows(expandedRows.filter((id) => id !== rowId));
    } else {
      setExpandedRows([...expandedRows, rowId]);
    }
  };

  if (!task) {
    return;
  }

  function TaskPriorityChanger(task: Task) {
    if (!task) {
      return;
    }

    return (
      <div className='flex items-center justify-center'>
        <Select
          onValueChange={(newVal: any) => {
            updateTask({id: task.id, edits: {priority: newVal}});
          }}
          value={task.priority}>
          <SelectTrigger className='md:w-[130px]'>
            <SelectValue defaultValue={task.priority} />
          </SelectTrigger>
          <SelectContent>
            {options.priorities.map((priority) => (
              <SelectItem key={priority.value} value={priority.value}>
                <div className='flex'>
                  {priority.value === 'low' && <icons.low className='md:mr-2 h-5 w-5 text-blue-400' />}
                  {priority.value === 'medium' && <icons.medium className='md:mr-2 h-5 w-5 text-yellow-400' />}
                  {priority.value === 'high' && <icons.high className='md:mr-2 h-5 w-5 text-red-400' />}
                  <span className='capitalize hidden md:inline'>{priority.value}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  function TaskSnoozer(task: Task) {
    if (!task) {
      return;
    }

    return (
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
                          updateTask({
                            id: task.id,
                            edits: {dueDate: addDays(new Date(task.dueDate!), 0).toLocaleString()},
                          });
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
    );
  }

  function TaskDeleter(id: number) {
    return (
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
        <DialogContent
          onClick={(e) => {
            e.stopPropagation();
          }}
          className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>Are you sure?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button
                onClick={async () => {
                  await deleteTask({id});
                }}
                type='submit'>
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <React.Fragment>
      <tr>
        <td colSpan={width}>
          <Progress value={task.progress} />
        </td>
      </tr>
      <tr className={styles.tableRow} onClick={() => toggleRow(index)}>
        <td className={`${styles.tableCell} text-center`}>
          <div className='flex items-center'>
            <span className='whitespace-nowrap'>TASK-{index + 1}</span>
            <span className='ml-2 hidden md:inline'>
              {task.status === 'backlog' && <icons.backlog className='mr-2 h-6 w-6 text-muted-foreground' />}
              {task.status === 'todo' && <icons.todo className='mr-2 h-6 w-6 text-muted-foreground' />}
              {task.status === 'in progress' && <icons.inprogress className='mr-2 h-5 w-5 text-blue-500/50' />}
              {task.status === 'done' && <icons.done className='mr-2 h-5 w-5 text-green-500/50' />}
              {task.status === 'canceled' && <icons.canceled className='mr-2 h-5 w-5 text-red-700/50' />}
            </span>
          </div>
        </td>
        <td className={styles.tableCell}>
          <div className='flex gap-2 px-4'>
            <div>
              <Badge className='mr-2 my-2' variant='outline'>
                {task.label}
              </Badge>
              <span className='capitalize'>{task.title}</span>
            </div>
            {task.progress === 100 && <AnimatingIcon animationIndex={0} />}
          </div>
        </td>
        <td className={`${styles.tableCell} text-center hidden md:table-cell`}>{TaskPriorityChanger(task)}</td>
        <td className={`${styles.tableCell} text-center hidden md:table-cell`}>
          <TaskDueDatePicker
            onChange={(newDate) => {
              updateTask({id: task.id, edits: {dueDate: newDate?.toLocaleDateString() ?? null}});
            }}
            dateString={task.dueDate ?? null}
          />
        </td>
        <td className='hidden md:table-cell items-center'>
          <div className='flex items-center gap-2'>
            {TaskSnoozer(task)}
            {TaskDeleter(task.id)}
          </div>
        </td>
        <td className='table-cell md:hidden'>
          <div className='flex items-center gap-2'>
            {TaskPriorityChanger(task)}
            <TaskDueDatePicker
              onChange={(newDate) => {
                updateTask({id: task.id, edits: {dueDate: newDate?.toLocaleDateString() ?? null}});
              }}
              dateString={task.dueDate ?? null}
            />
            {TaskSnoozer(task)}
            {TaskDeleter(task.id)}
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={width}>
          <div className={`${styles.expandedRow} ${expandedRows.includes(index) ? `${styles.show}` : ''}`}>
            <SubtaskTable subtasks={task.subtasks} cursor={task.cursor} />
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default TaskBar;
