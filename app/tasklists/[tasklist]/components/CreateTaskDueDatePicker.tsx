'use client';

import * as React from 'react';
import {CalendarIcon} from '@radix-ui/react-icons';
import {addDays, format} from 'date-fns';
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select-for-priority';

interface DueDatePickerProps {
  onChange: (date: Date | undefined) => void;
}

export function CreateTaskDueDatePicker({onChange}: DueDatePickerProps) {
  const [date, setDate] = React.useState<Date>();
  
  React.useEffect(()=>{
    if (date) {
      onChange(date);
    }
  }, [date, onChange])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('border-gray-400 dark:border-border w-[200px] justify-start text-left font-normal', !date && 'text-muted-foreground')}>
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
            <SelectItem value='.'>Whenever</SelectItem>
          </SelectContent>
        </Select>
        <div className='rounded-md border'>
          <Calendar mode='single' selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
