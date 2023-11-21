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
      value: 'beauty',
      label: 'Beauty',
    },
    {
      value: 'business',
      label: 'Business',
    },
    {
      value: 'diy',
      label: 'DIY',
    },
    {
      value: 'education',
      label: 'Education',
    },
    {
      value: 'family',
      label: 'Family',
    },
    {
      value: 'finance',
      label: 'Finance',
    },
    {
      value: 'fitness',
      label: 'Fitness',
    },
    {
      value: 'food',
      label: 'Food',
    },
    {
      value: 'garden',
      label: 'Garden',
    },
    {
      value: 'shopping',
      label: 'Shopping',
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
      icon: ArrowUpIcon,
    },
  ],
} as const;
