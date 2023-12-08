'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { AddSubtaskDocument } from '@/graphql/generated';
import { useMutation } from '@apollo/client';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AddSubtaskButtonProps {
  taskId: number;
}

const AddSubtaskButton = ({taskId}: AddSubtaskButtonProps) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  // const [addSubtask, {data, loading, error}] = useMutation(AddSubtaskDocument);
  const [openSheet, setOpenSheet] = useState(false);

  async function onSubmit(e: any) {
    e.preventDefault();
    if (!taskId || title === '') {
      return;
    }

    // await addSubtask({
    //   variables: {
    //     input: {
    //       title,
    //       taskId,
    //     },
    //   },
    // });
    setOpenSheet(false);

    router.refresh();
  }

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button variant={'outline'}>+</Button>
      </SheetTrigger>
      <SheetContent className='h-52' side={'bottom'}>
        <SheetHeader>
          <SheetTitle className='text-2xl mb-6 font-thin'>Add Subtask</SheetTitle>
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
          </div>
          <SheetClose asChild>
            {/* {!loading ? (
              <Button onClick={onSubmit} type='submit'>
                Add
              </Button>
            ) : (
              <Button>
                Adding
                <ReloadIcon className='ml-2 h-4 w-4 animate-spin' />
              </Button>
            )} */}
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddSubtaskButton;
