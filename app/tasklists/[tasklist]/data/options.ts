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
      value: 'art',
      label: 'Art',
    },
    {
      value: 'automotive',
      label: 'Automotive',
    },
    {
      value: 'beauty',
      label: 'Beauty',
    },
    {
      value: 'business',
      label: 'Business',
    },
    {
      value: 'delivery',
      label: 'Delivery',
    },
    {
      value: 'diy',
      label: 'DIY',
    },
    {
      value: 'ecommerce',
      label: 'Ecommerce',
    },
    {
      value: 'editing',
      label: 'Editing',
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
      value: 'gaming',
      label: 'Gaming',
    },
    {
      value: 'garden',
      label: 'Garden',
    },
    {
      value: 'health',
      label: 'Health',
    },
    {
      value: 'holidays',
      label: 'Holidays',
    },
    {
      value: 'office',
      label: 'Office',
    },
    {
      value: 'people',
      label: 'People',
    },
    {
      value: 'programming',
      label: 'Programming',
    },
    {
      value: 'religion',
      label: 'Religion',
    },
    {
      value: 'shopping',
      label: 'Shopping',
    },
    {
      value: 'summer',
      label: 'Summer',
    },
    {
      value: 'travel',
      label: 'Travel',
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
