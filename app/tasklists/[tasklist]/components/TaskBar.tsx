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
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  ClockIcon,
  CrossCircledIcon,
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
import {Subtask, Task} from '@/graphql/types';
import {useMutation} from '@apollo/client';
import {addDays} from 'date-fns';
import React, {useEffect, useState, useTransition} from 'react';
import {options} from '../data/options';
import {SubtaskTable} from './SubtaskTable';
import {TaskDueDatePicker} from './TaskDueDatePicker';
import styles from './TaskTable.module.css';
import {useRouter} from 'next/navigation';

interface TaskBarProps {
  task: NonNullable<Task>;
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
  high: ArrowUpIcon,
};

const TaskBar = ({task, width, index}: TaskBarProps) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {toast} = useToast();
  const [updateTask, {data: editData, loading: editLoading, error: editError}] = useMutation(EditTaskDocument);
  const [deleteTask, {data: deleteData, loading: deleteLoading, error: deleteError}] = useMutation(DeleteTaskDocument);
  const [optimizedTask, setOptimizedTask] = useState(task);

  useEffect(() => {
    setOptimizedTask(task);
  }, [task]);

  const toggleRow = (rowId: number) => {
    if (expandedRows.includes(rowId)) {
      setExpandedRows(expandedRows.filter((id) => id !== rowId));
    } else {
      setExpandedRows([...expandedRows, rowId]);
    }
  };

  function changeStatus(updatedSubtask: Subtask, newCursor: number) {
    // filter out the old subtask and add the updated subtask to the optimizedTask
    // then add the new subtask to the optimizedTask
    if(!task.subtasks) return;

    const newSubtasks = task.subtasks.filter((subtask) => subtask?.id !== updatedSubtask?.id);
    newSubtasks.push(updatedSubtask);
    const newProgress = Math.ceil(
      (newSubtasks.filter((subtask) => subtask?.status === 'done').length / newSubtasks.length) * 100
    );
    const copy = Object.assign({}, task);
    if (newProgress === 100) {
      copy.status = 'done';
    } else if (newProgress === 0) {
      copy.status = 'todo';
    } else {
      copy.status = 'in progress';
    }
    copy.cursor = newCursor;
    copy.progress = newProgress;

    // update the task immediately to avoid lag
    setOptimizedTask({...copy, subtasks: newSubtasks.sort((a, b) => {
      if (a === null || b === null) return 0;
      return a.index - b.index;
    })});
    router.refresh();
  }

  function TaskPriorityChanger() {
    return (
      <div className='flex items-center justify-center'>
        <Select
          onValueChange={(newVal: any) => {
            updateTask({variables: {id: task.id, edits: {priority: newVal}}});
          }}
          value={task.priority}>
          <SelectTrigger className='lg:w-[130px]'>
            <SelectValue defaultValue={task.priority} />
          </SelectTrigger>
          <SelectContent>
            {options.priorities.map((priority) => (
              <SelectItem key={priority.value} value={priority.value}>
                <div className='flex'>
                  {priority.value === 'low' && <icons.low className='lg:mr-2 h-5 w-5 text-blue-400' />}
                  {priority.value === 'medium' && <icons.medium className='lg:mr-2 h-5 w-5 text-yellow-400' />}
                  {priority.value === 'high' && <icons.high className='lg:mr-2 h-5 w-5 text-red-400' />}
                  <span className='capitalize hidden lg:inline'>{priority.value}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  function TaskSnoozer() {
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
                            variables: {
                              id: task.id,
                              edits: {dueDate: addDays(new Date(task.dueDate!), 0).toLocaleString()},
                            },
                          });
                          dismiss();
                        }}
                        altText='Goto schedule to undo'>
                        Undo
                      </ToastAction>
                    ),
                  });
                  updateTask({
                    variables: {
                      id: task.id,
                      edits: {dueDate: addDays(new Date(task.dueDate!), 1).toLocaleString()},
                    },
                  });
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
          <DialogHeader className='gap-4'>
            <DialogTitle className='text-muted-foreground'>Deleting</DialogTitle>
            <DialogDescription className='text-lg text-foreground'>
              Task -&gt; <span className='italic'>{task.title}</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button
                onClick={async () => {
                  await deleteTask({variables: {id}});
                  router.refresh();
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
      <tr className={`${styles.tableRow} border-t`} title='Click to view subtasks' onClick={() => toggleRow(index)}>
        <td className={`${styles.tableCell} text-center`}>
          <div className='flex items-center'>
            <span className='whitespace-nowrap hidden md:inline-block text-muted-foreground'>TASK-{index + 1}</span>
            <span className='md:hidden'>{index + 1}</span>
            <span className='ml-2 hidden lg:inline'>
              {task.status === 'backlog' && <icons.backlog className='mr-2 h-5 w-5 text-muted-foreground' />}
              {task.status === 'todo' && <icons.todo className='mr-2 h-5 w-5 text-muted-foreground' />}
              {task.status === 'in progress' && <icons.inprogress className='mr-2 h-5 w-5 text-blue-500/50' />}
              {task.status === 'done' && <icons.done className='mr-2 h-5 w-5 text-green-500/50' />}
              {task.status === 'canceled' && <icons.canceled className='mr-2 h-5 w-5 text-red-700/50' />}
            </span>
          </div>
        </td>
        <td className={styles.tableCell}>
          <div className='flex flex-col md:flex-row justify-between gap-2 grow shrink'>
            <div className='flex gap-2 px-4'>
              <div>
                <Badge className='mr-2 my-2 capitalize' variant='outline'>
                  {task.label}
                </Badge>
                <span className='capitalize'>{task.title}</span>
              </div>
              {task.progress === 100 && <AnimatingIcon animationTag={task.animation} />}
            </div>
            {/* taskbar controls, shows only on small screens */}
            <div id='taskbar-control-group-1' className='flex gap-2 items-center justify-end pt-2 lg:hidden'>
              {/* {TaskPriorityChanger()} */}
              <TaskDueDatePicker
                onChange={(newDate) => {
                  updateTask({variables: {id: task.id, edits: {dueDate: newDate?.toLocaleDateString() ?? null}}});
                }}
                dateString={task.dueDate ?? null}
              />
              {TaskSnoozer()}
              {TaskDeleter(task.id)}
            </div>
          </div>
        </td>
        {/* <td className={`${styles.tableCell} text-center hidden lg:table-cell`}>{TaskPriorityChanger()}</td> */}
        {/* shows only on large screens */}
        <td className={`${styles.tableCell} text-right hidden lg:table-cell`}>
          <TaskDueDatePicker
            onChange={async (newDate) => {
              await updateTask({variables: {id: task.id, edits: {dueDate: newDate?.toLocaleDateString() ?? null}}});
              router.refresh();
            }}
            dateString={task.dueDate ?? null}
          />
        </td>
        {/* shows only on large screens */}
        <td className='hidden lg:table-cell items-center'>
          <div className='flex items-center gap-2 justify-center'>
            {TaskSnoozer()}
            {TaskDeleter(task.id)}
          </div>
        </td>
      </tr>
      <tr className='border-b'>
        <td colSpan={width}>
          <Progress value={optimizedTask.progress} />
        </td>
      </tr>
      <tr>
        <td colSpan={width}>
          <div className={`${styles.expandedRow} ${expandedRows.includes(index) ? `${styles.show}` : ''}`}>
            <SubtaskTable
              animation={task.animation}
              onStatusChange={changeStatus}
              subtasks={optimizedTask.subtasks ?? []}
              cursor={optimizedTask.cursor}
              taskId={task.id}
            />
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default TaskBar;
