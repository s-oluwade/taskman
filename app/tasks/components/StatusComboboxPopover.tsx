'use client';

import * as React from 'react';
import {Button} from '@/components/ui/button';
import {Command, CommandEmpty, CommandGroup, CommandItem, CommandList} from '@/components/ui/command';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {useEffect} from 'react';
import {options} from '../data/options';

interface StatusComboboxPopoverProps {
  onChange: ({subtaskId, edits}: {subtaskId: number; edits: {status: string}}) => void;
  notReady: boolean;
  status: string;
  subtaskId: number;
}

export default function StatusComboboxPopover({subtaskId, notReady, status, onChange}: StatusComboboxPopoverProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(status);

  useEffect(() => {
    setSelectedStatus(status);
  }, [status]);

  return (
    <div className='flex items-center space-x-4'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger disabled={selectedStatus === 'done' || notReady} asChild>
          <Button variant='outline' className='w-[120px] justify-start capitalize whitespace-nowrap'>
            {selectedStatus ? <>{selectedStatus}</> : <>+ Set status</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-0' side='left' align='start'>
          <Command>
            {/* <CommandInput placeholder='Change status...' /> */}
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.statuses.map((status) => (
                  <CommandItem
                    className={status.value === 'done' ? 'hidden' : ''}
                    key={status.value}
                    value={status.value}
                    onSelect={() => {
                      setSelectedStatus(status.value ?? null);
                      onChange({subtaskId, edits: {status: status.value}});
                      setOpen(false);
                    }}>
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
