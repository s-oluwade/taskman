'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet';
import {useRouter} from 'next/navigation';
import {useState, useTransition} from 'react';
import {options} from '../data/options';
import {DueDatePicker} from './DueDatePicker';

const CreateTaskButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState<String | null>(null);

  async function onSubmit() {
    await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title,
        label,
        priority,
        dueDate
      }),
    });

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }

  function changeDueDate(date: Date) {
    setDueDate(date.toLocaleDateString());
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>Create New Task</Button>
      </SheetTrigger>
      <SheetContent className='h-52' side={'bottom'}>
        <SheetHeader>
          <SheetTitle className='text-2xl mb-6 font-thin'>New Task</SheetTitle>
          {/* <SheetDescription>
            </SheetDescription> */}
        </SheetHeader>
        <div className='flex items-center gap-4 justify-center'>
          <div className='flex w-5/6 gap-4'>
            <div className='flex flex-1 items-center gap-2'>
              <Label htmlFor='title' className='text-right font-light'>
                Title
              </Label>
              <Input
                id='title'
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div>
              <Select onValueChange={setLabel}>
                <SelectTrigger className='w-[160px]'>
                  <SelectValue placeholder='Label' />
                </SelectTrigger>
                <SelectContent>
                  {options.labels.map((label) => (
                    <SelectItem key={label.value} value={label.value}>
                      {label.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select onValueChange={setPriority}>
                <SelectTrigger className='w-[130px]'>
                  <SelectValue placeholder='Priority' />
                </SelectTrigger>
                <SelectContent>
                  {options.priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <DueDatePicker onChange={changeDueDate} />
            </div>
          </div>
          <SheetClose asChild>
            <Button onClick={onSubmit} type='submit'>
              Create
            </Button>
            {/* <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button> */}
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateTaskButton;
