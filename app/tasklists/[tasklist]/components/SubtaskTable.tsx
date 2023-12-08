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
import StatusComboboxPopover from './StatusComboboxPopover';
import {Task, Subtask} from '@/graphql/types';
import {useMutation} from '@apollo/client';
import {DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd';
import {RowsIcon} from '@radix-ui/react-icons';
import {
  CreateSubtasksDocument,
  ReorderSubtasksDocument,
  UpdateSubtaskDocument,
  DeleteSubtaskDocument,
  DeleteTaskDocument,
} from '@/graphql/generated';
import AddSubtaskButton from './AddSubtaskButton';
import {useRouter} from 'next/navigation';
import ThreeDotLoader from '@/components/ThreeDotLoader';
import React, {useEffect, useState, useTransition, useContext} from 'react';
import { Context } from '@/components/context-provider';

interface SubTaskTableProps {
  cursor: number;
  subtasks: any[];
  onStatusChange: (subtask: Subtask, newCursor: number) => void;
  animation: string | null | undefined;
  taskId: number;
}

export function SubtaskTable({cursor, subtasks, onStatusChange, animation, taskId}: SubTaskTableProps) {
  const router = useRouter();
  // const [reorderSubtasks] = useMutation(ReorderSubtasksDocument);
  // const [updateSubtask] = useMutation(UpdateSubtaskDocument);
  // const [deleteSubtask] = useMutation(DeleteSubtaskDocument);
  // const [deleteTask] = useMutation(DeleteTaskDocument);
  const {createSubtasks} = useContext(Context);
  
  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const subtaskId = Number(result.draggableId);
    // await reorderSubtasks({variables: {subtaskId: subtaskId, newIndex: result.destination.index}});
    router.refresh();
  };

  async function actionSubtaskDelete(subtaskId: number) {
    const taskId = subtasks[0].taskId;
    // await deleteSubtask({variables: {subtaskId: subtaskId}});
    // if (subtasks.length <= 1) {
    //   await deleteTask({variables: {id: taskId}});
    // }
    router.refresh();
  }

  if (!subtasks) return;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='table'>
        {(provided: any) => (
          <Table ref={provided.innerRef} {...provided.droppableProps}>
            <TableCaption className='my-4'>
              Here are your subtasks.{' '}
              {subtasks.length !== 0 && subtasks?.filter((subtask) => subtask?.status !== 'done').length === 0 && (
                <span className='inline-flex items-center gap-4'>
                  <span className='text-green-600'>Task Complete!</span>
                  <span>
                    <AnimatingIcon animationTag={animation} />
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
              {subtasks && subtasks.length > 0 ? (
                subtasks?.map((subtask, index) => (
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
                            onChange={async (subtaskId: any, edits: any) => {
                              // await updateSubtask({variables: {subtaskId: subtaskId, edits: edits}});
                              router.refresh();
                            }}
                          />
                        </TableCell>
                        <TableCell className='text-center'>
                          <Checkbox
                            disabled={cursor < index}
                            defaultChecked={subtask.status === 'done'}
                            onCheckedChange={async (checked: any) => {
                              if (!checked) {
                                const copy = Object.assign({}, subtask);
                                copy.status = 'in progress';
                                onStatusChange(copy, cursor--);
                                // await updateSubtask({variables: {subtaskId: copy.id, edits: {status: 'in progress'}}});
                                router.refresh();
                              } else {
                                const copy = Object.assign({}, subtask);
                                copy.status = 'done';
                                onStatusChange(copy, cursor++);
                                // await updateSubtask({variables: {subtaskId: copy.id, edits: {status: 'done'}}});
                                router.refresh();
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
                                  {subtasks?.length > 1 ? '🤔' : 'This is the only subtask 😯'}
                                </DialogTitle>
                                <DialogDescription className='pt-4 space-y-6 text-lg'>
                                  {subtasks?.length === 1 && (
                                    <span>
                                      The <span className='text-primary underline'>Task</span> will also be deleted.
                                    </span>
                                  )}
                                  <span>
                                    Remove <span className='text-primary'>`{subtask.title}`</span>?
                                  </span>
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
                ))
              ) : createSubtasks ? (
                <TableRow>
                  <TableCell className='text-center' colSpan={6}>
                    <ThreeDotLoader/>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell className='text-center' colSpan={6}>
                    ...
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell className='text-center' colSpan={6}>
                  <AddSubtaskButton taskId={taskId} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </Droppable>
    </DragDropContext>
  );
}
