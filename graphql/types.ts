/*
* This file can be used to load types based on our graphql queries.
*/

import type {GetTasksQuery, GetTaskQuery} from './generated'

export type Task = GetTaskQuery["task"]
export type Subtask = GetTasksQuery["tasks"][0]["subtasks"][0]