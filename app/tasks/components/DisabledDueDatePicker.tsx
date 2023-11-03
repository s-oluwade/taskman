'use client';

import * as React from 'react';
import {CalendarIcon} from '@radix-ui/react-icons';
import {addDays, format} from 'date-fns';
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

interface DisabledDueDatePicker {
  dateString: string | null;
}
export function DisabledDueDatePicker({dateString}: DisabledDueDatePicker) {
  const [date, setDate] = React.useState<Date | undefined>(dateString ? new Date(dateString) : undefined);
  const [isLate, setIsLate] = React.useState(false);
  const [isVeryLate, setIsVeryLate] = React.useState(false);

  React.useEffect(() => {
    if (dateString) {
      setDate(new Date(dateString));
      const diffInHrs = getDifferenceInHours(new Date(), new Date(dateString));
      if (diffInHrs <= 2 && diffInHrs > 1) {
        setIsLate(true);
      } else {
        setIsLate(false);
      }

      if (diffInHrs <= 1) {
        setIsVeryLate(true);
      } else {
        setIsVeryLate(false);
      }
    }
  }, [dateString]);

  function getDifferenceInHours(now: Date, then: Date) {
    // if current date has passed the deadline,
    // return a large difference to trigger else clause
    if (now.getTime() > then.getTime()) {
      return 10;
    }
    const diffInMs = Math.abs(now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24);
    return diffInMs;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled
          variant={'outline'}
          className={cn(
            `w-[200px] justify-start text-left font-normal ${isLate && 'bg-yellow-700'} ${isVeryLate && 'bg-red-700'}`,
            !date && 'text-muted-foreground'
          )}>
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Whenever</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='flex w-auto flex-col space-y-2 p-2'>
        <Select
          onValueChange={(value: any) => {
            if (value === '.') {
              setDate(undefined);
            } else {
              setDate(addDays(new Date(), parseInt(value)));
            }
          }}>
          <SelectTrigger>
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent position='popper'>
            <SelectItem value='0'>Today</SelectItem>
            <SelectItem value='1'>Tomorrow</SelectItem>
            <SelectItem value='3'>In 3 days</SelectItem>
            <SelectItem value='7'>In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className='rounded-md border'>
          <Calendar mode='single' selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
