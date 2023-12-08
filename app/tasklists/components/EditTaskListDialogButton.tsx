import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {UpdateTasklistDocument} from '@/graphql/generated';
import {GetAllTasklistsDocument} from '@/graphql/generated';
import {Tasklist} from '@/graphql/types';
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
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

interface EditTaskListDialogButtonProps {
  tasklist: Tasklist;
}

const EditTaskListDialogButton = ({tasklist}: EditTaskListDialogButtonProps) => {
  const [name, setName] = useState(tasklist.name ?? '');
  const [description, setDescription] = useState(tasklist.description ?? '');
  const [formError, setFormError] = useState(false);
  // just a dummy placeholder
  const [user, setUser] = useState<{userId: number} | null>(null);
  const [editTasklist, {data, loading, error}] = useMutation(UpdateTasklistDocument, {refetchQueries: [GetAllTasklistsDocument]});

  function onSubmit(e: React.FormEvent<HTMLButtonElement>) {
    if (name.length === 0) {
      setFormError(true);
      e.preventDefault();
      return;
    }

    editTasklist({variables: {tasklistName: tasklist.name, edits: {name, description}}});
  }

  return (
    <Dialog
      onOpenChange={(opened) => {
        if (!opened) {
          setName('');
          setDescription('');
          setFormError(false);
        }
      }}>
      <DialogTrigger asChild>
        <Button
          variant={'link'}
          size={'icon'}
          onClick={() => {
            setName(tasklist.name ?? '');
            setDescription(tasklist.description ?? '');
          }}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>New Tasklist</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <div className='col-span-3'>
              <Input id='name' defaultValue={name} onChange={(e) => setName(e.target.value)} />
              {formError && <p className='text-red-500 text-sm'>A name is required.</p>}
            </div>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Description
            </Label>
            <Textarea
              id='description'
              defaultValue={description}
              className='col-span-3'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onSubmit} type='submit'>
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskListDialogButton;
