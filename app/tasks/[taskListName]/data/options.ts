import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
  PlayIcon,
  ExclamationTriangleIcon
} from '@radix-ui/react-icons';

export const options = {
  labels: [
    {
      value: 'bug',
      label: 'Bug',
      icon: null,
    },
    {
      value: 'feature',
      label: 'Feature',
      icon: null,
    },
    {
      value: 'documentation',
      label: 'Documentation',
      icon: null,
    },
  ],
  statuses: [
    {
      value: 'skip',
      label: 'Skip',
      icon: QuestionMarkCircledIcon,
    },
    {
      value: 'todo',
      label: 'Todo',
      icon: CircleIcon,
    },
    {
      value: 'in progress',
      label: 'In Progress',
      icon: StopwatchIcon,
    },
    {
      value: 'done',
      label: 'Done',
      icon: CheckCircledIcon,
    },
    {
      value: 'stall',
      label: 'Stall',
      icon: CrossCircledIcon,
    },
  ],
  priorities: [
    {
      label: 'Low',
      value: 'low',
      icon: ArrowDownIcon,
    },
    {
      label: 'Medium',
      value: 'medium',
      icon: ArrowRightIcon,
    },
    {
      label: 'High',
      value: 'high',
      icon: ExclamationTriangleIcon,
    },
  ],
} as const;
