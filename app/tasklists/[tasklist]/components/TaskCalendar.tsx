'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calendar } from '@/components/ui/calendar';
import { TaskDueDate } from '@/graphql/types';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useEffect, useState } from 'react';

interface TaskCalendarProps {
  tasksDueDates: TaskDueDate[];
}

const TaskCalendar = ({tasksDueDates}: TaskCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [taskDays, setTaskDays] = useState<Date[]>([]);
  const router = useRouter();

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: window.location.href,
      query: {
        date: date?.toLocaleDateString('en-US'),
      },
    });
    
    router.push(url);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    setTaskDays(tasksDueDates.filter((task) => task?.dueDate).map((task) => new Date(task?.dueDate!)));
  }, [tasksDueDates, router])

  return (
    <Accordion className='w-64' type='single' collapsible>
      <AccordionItem className='border-b-0' value='item-1'>
        <AccordionTrigger className='leading-6 py-2'>
          <span className='flex gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z'
              />
            </svg>
            Filter By Due Date
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <Calendar
            bookedDays={taskDays}
            mode='single'
            selected={date}
            onSelect={setDate}
            className='rounded-md border'
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TaskCalendar;
