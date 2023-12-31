/*
 * This file can be used to load types based on our graphql queries.
 */

import type {GetTasksQuery, GetTaskQuery, GetTasklistsQuery, GetTasksDueDatesQuery} from './generated';

export type Tasklist = NonNullable<GetTasklistsQuery['tasklists'][0]>;
export type Task = NonNullable<GetTaskQuery['task']>;
export type Subtask = NonNullable<NonNullable<NonNullable<GetTasksQuery['tasks'][0]>['subtasks']>[0]>;
export type TaskDueDate = GetTasksDueDatesQuery['tasks'][0];