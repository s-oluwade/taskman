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

import AnimatingIcon from '@/components/AnimatingIcon';
import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {CheckIcon, TrashIcon} from '@radix-ui/react-icons';
import {useEffect, useState} from 'react';
import StatusComboboxPopover from './StatusComboboxPopover';
import {Task, Subtask} from '@/graphql/types';
import {useMutation, Mutation, useQuery} from 'urql';
import {DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd';
import {RowsIcon} from '@radix-ui/react-icons';
import {ReorderSubtasksDocument, UpdateSubtaskDocument, DeleteSubtaskDocument, DeleteTaskDocument} from '@/graphql/generated';
import AddSubtaskButton from './AddSubtaskButton';

interface SubTaskTableProps {
  cursor: number;
  subtasks: Subtask[];
}

export function SubtaskTable({cursor, subtasks}: SubTaskTableProps) {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [orderedSubtasksResult, reorderSubtasks] = useMutation(ReorderSubtasksDocument);
  const [updatedSubtaskResult, updateSubtask] = useMutation(UpdateSubtaskDocument);
  const [deletedSubtaskResult, deleteSubtask] = useMutation(DeleteSubtaskDocument);
  const [deletedTaskResult, deleteTask] = useMutation(DeleteTaskDocument);

  useEffect(() => {
    setAudio(new Audio('/click.wav'));
  }, []);

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const subtaskId = Number(result.draggableId);
    await reorderSubtasks({subtaskId: subtaskId, newIndex: result.destination.index});
  };

  async function actionSubtaskDelete(subtaskId: number) {
    const taskId = subtasks[0].taskId;
    await deleteSubtask({subtaskId: subtaskId});
    if (subtasks.length <= 1) {
      await deleteTask({id: taskId});
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='table'>
        {(provided: any) => (
          <Table ref={provided.innerRef} {...provided.droppableProps}>
            <TableCaption className='my-4'>
              Here are your subtasks.{' '}
              {subtasks.length !== 0 && subtasks.filter((subtask) => subtask?.status !== 'done').length === 0 && (
                <span className='inline-flex items-center gap-4'>
                  <span className='text-green-600'>Task Complete!</span>
                  <span>
                    <AnimatingIcon animationIndex={0} />
                  </span>
                </span>
              )}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead className='w-[100px] text-center'>Step</TableHead>
                <TableHead>Subtask</TableHead>
                <TableHead className='text-center'>Status</TableHead>
                <TableHead className='w-[100px] pr-0'>
                  <CheckIcon className='h-6 w-6 mx-auto' />
                </TableHead>
                <TableHead></TableHead>
              </TableRow>
              {provided.placeholder}
            </TableHeader>
            <TableBody>
              {subtasks.map((subtask, index) => (
                <Draggable key={subtask.id} draggableId={subtask.id.toString()} index={subtask.index}>
                  {(provided: any, snapshot: any) => (
                    <TableRow
                      ref={provided.innerRef}
                      key={subtask.id}
                      className={`${cursor < index ? 'text-gray-600' : ''} ${
                        snapshot.isDragging ? 'dark:bg-gray-900 flex justify-between items-center' : ''
                      }`}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <TableCell>
                        <RowsIcon className='h-5 w-5' />
                      </TableCell>
                      <TableCell className='font-medium text-center'>{subtask.index + 1}</TableCell>
                      <TableCell>{subtask.title}</TableCell>
                      <TableCell className='flex justify-center items-center gap-2'>
                        <StatusComboboxPopover
                          subtaskId={subtask.id}
                          status={subtask.status}
                          notReady={cursor < index}
                          onChange={updateSubtask}
                        />
                      </TableCell>
                      <TableCell className='text-center'>
                        <Checkbox
                          disabled={cursor < index}
                          defaultChecked={subtask.status === 'done'}
                          onCheckedChange={(checked: any) => {
                            if (!checked) {
                              updateSubtask({subtaskId: subtask.id, edits: {status: 'in progress'}});
                            } else {
                              updateSubtask({subtaskId: subtask.id, edits: {status: 'done'}});
                            }

                            if (audio) {
                              audio.play();
                            }
                          }}
                          className='h-8 w-8'
                        />
                      </TableCell>
                      <TableCell className='text-right'>
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
                              <DialogTitle className='text-2xl'>
                                {subtasks.length > 1 ? '🤔' : 'This is the only subtask 😯'}
                              </DialogTitle>
                              <DialogDescription className='pt-4 space-y-6 text-lg'>
                                {subtasks.length === 1 && <span>The <span className='text-primary underline'>Task</span> will also be deleted.</span>}
                                <span>Remove <span className='text-primary'>`{subtask.title}`</span>?</span>
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button
                                  onClick={async () => {
                                    actionSubtaskDelete(subtask.id);
                                  }}
                                  type='submit'>
                                  Remove
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  )}
                </Draggable>
              ))}
              <TableRow>
                <TableCell className='text-center' colSpan={6}>
                  <AddSubtaskButton taskId={subtasks[0].taskId} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </Droppable>
    </DragDropContext>
  );
}
