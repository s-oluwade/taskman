/*
 * This file can be used to load types based on our graphql queries.
 */

import type {GetTasksQuery, GetTaskQuery, GetTaskListQuery} from './generated';

export type TaskList = NonNullable<GetTaskListQuery['taskList']>;
export type Task = NonNullable<GetTaskQuery['task']>;
export type Subtask = NonNullable<GetTasksQuery['tasks'][0]>['subtasks'][0];
