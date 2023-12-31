'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-for-priority';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { CreateTaskDocument, CreateSubtasksDocument } from '@/graphql/generated';
import { useMutation } from '@apollo/client';
import { CheckIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { generateLabelGPT } from '../actions';
import { options } from '../data/options';
import { Context } from '@/components/context-provider';

interface CreateTaskButtonProps {
  tasklistName: string;
}

const CreateTaskButton = ({tasklistName}: CreateTaskButtonProps) => {
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [priority, setPriority] = useState('low');
  const [openSheet, setOpenSheet] = useState(false);
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [autoLabel, setAutoLabel] = useState<string | null>(null);
  const router = useRouter();
  const [createTask, {loading, error}] = useMutation(CreateTaskDocument);
  const [creatingTask1, setCreatingTask1] = useState(false);
  const [creatingTask2, setCreatingTask2] = useState(false);
  const {createSubtasks, setCreateSubtasks, setCreateSubtasksTaskId} = useContext(Context);
  const [createSubtask, {loading: loadingSubtasks, error: errorCreatingSubtasks}] = useMutation(CreateSubtasksDocument);

  if (error) {
    console.log(error);
  }

  async function handleCreateTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, auto: boolean) {
    e.stopPropagation();

    if (title === '' || priority === '') {
      setCreatingTask1(false);
      setCreatingTask2(false);
      console.log('missing fields');
      return;
    }

    if (!auto) {
      setCreatingTask1(true);
    }
    else {
      setCreatingTask2(true);
    }

    createTask({
      variables: {
        task: {
          tasklistName,
          title,
          label,
          priority,
          dueDate,
        },
        autosubtasks: auto,
      },
    })
      .then(async (task) => {
        {
          if (!task.data?.addTask) {
            console.log('error creating task');
            return;
          }
          setOpenSheet(false);
          if (!auto) {
            await createSubtask({
              variables: {
                taskId: task.data.addTask.id,
                auto: false
              }
            })
          }
          else {
            setCreateSubtasks(true);
            setCreateSubtasksTaskId(task.data.addTask.id);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTitle('');
        setLabel('');
        setAutoLabel(null);
        setPriority('low');
        setCreatingTask1(false);
        setCreatingTask2(false);
        router.refresh();
      });
  }

  useEffect(() => {
    if (label === 'custom') {
      document.getElementById('custom')?.classList.remove('hidden');
    } else {
      document.getElementById('custom')?.classList.add('hidden');
    }
  }, [label]);

  useEffect(() => {
    if (autoLabel) {
      setLabel(autoLabel);
    }
  }, [autoLabel]);

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button className='whitespace-nowrap text-base' variant='outline'>
          Create New Task
        </Button>
      </SheetTrigger>
      <SheetContent className='min-h-min' side={'bottom'}>
        <SheetHeader>
          <SheetTitle className='text-2xl mb-6 font-thin'>New Task</SheetTitle>
          {/* <SheetDescription>
            </SheetDescription> */}
        </SheetHeader>
        <div className='flex justify-center'>
          <div className='flex items-center gap-4 justify-center flex-col xl:flex-row'>
            <div className='flex flex-1 items-center gap-2 w-full'>
              <Label htmlFor='title' className='text-right font-light'>
                Title
              </Label>
              <Input
                id='title'
                className='min-w-[300px]'
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className='flex flex-wrap gap-4 justify-center items-center'>
              <Label htmlFor='label' className='text-right font-light'>
                Label
              </Label>
              <SelectGroup id='label' className='flex flex-wrap gap-2 justify-center'>
                <Select
                  onValueChange={async (value) => {
                    setLabel(value);
                    if (value === '.') {
                      document.getElementById('autogeneratedLabel')?.classList.remove('hidden');
                      generateLabelGPT(title)
                        .then((res) => {
                          setAutoLabel(res?.content);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    } else {
                      document.getElementById('autogeneratedLabel')?.classList.add('hidden');
                      setAutoLabel(null);
                    }
                  }}>
                  <SelectTrigger className='w-[160px]'>
                    <SelectValue placeholder='Choose a label' />
                  </SelectTrigger>
                  <SelectContent className='overflow-y-auto max-h-[30rem]'>
                    {options.labels.map((label) => (
                      <SelectItem className='cursor-pointer hover:bg-accent' key={label.value} value={label.value}>
                        {label.label}
                      </SelectItem>
                    ))}
                    <SelectItem value='.' className='mt-4 cursor-pointer hover:bg-accent'>
                      <span>Autogenerate </span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='ml-1 w-5 h-5 inline'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'
                        />
                      </svg>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {
                  <div id='autogeneratedLabel' className='hidden'>
                    {title.length < 2 ? (
                      <div className='leading-9 flex items-center text-sm text-red-500'>Title length too short</div>
                    ) : autoLabel ? (
                      <div className='text-green-800 leading-9 flex items-center gap-1 px-1'>
                        {autoLabel}
                        <CheckIcon className='h-4 w-4' />
                      </div>
                    ) : (
                      <div role='status' className='flex items-center pt-1'>
                        <svg
                          aria-hidden='true'
                          className='w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white'
                          viewBox='0 0 100 101'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                            fill='currentColor'
                          />
                          <path
                            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                            fill='currentFill'
                          />
                        </svg>
                        <span className='sr-only'>Loading...</span>
                      </div>
                    )}
                  </div>
                }
              </SelectGroup>

              {/* <Label htmlFor='priority' className='text-right font-light'>
                Priority
              </Label>
              <SelectGroup id='priority'>
                <Select defaultValue='low' onValueChange={setPriority}>
                  <SelectTrigger className='capitalize w-[130px]'>
                    <SelectValue placeholder='Priority' />
                  </SelectTrigger>
                  <SelectContent>
                    {options.priorities.map((priority) => (
                      <SelectItem className='capitalize' key={priority.value} value={priority.value}>
                        {priority.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </SelectGroup> */}
              {error && <p className='text-red-500'>An error occured while creating the task.</p>}
              {/* <div>
                <CreateTaskDueDatePicker onChange={changeDueDate} />
              </div> */}
              {/* <SheetClose asChild> */}
              {loading && creatingTask1 ? (
                <Button disabled>
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                  Creating...
                </Button>
              ) : (
                <Button
                  disabled={loading}
                  id='createBtn1'
                  onClick={(e) => {
                    handleCreateTask(e, false);
                  }}
                  type='submit'>
                  Create default
                </Button>
              )}
              <span>or</span>
              {loading && creatingTask2 ? (
                <Button disabled>
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                  Creating...
                </Button>
              ) : (
                <Button
                  disabled={loading}
                  id='createBtn2'
                  onClick={(e) => {
                    handleCreateTask(e, true);
                  }}
                  type='submit'>
                  Create (with autogenerated subtasks)
                </Button>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateTaskButton;
