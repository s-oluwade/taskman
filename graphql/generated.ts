import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddSubtaskInput = {
  taskId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type AddTaskInput = {
  dueDate?: InputMaybe<Scalars['String']['input']>;
  label: Scalars['String']['input'];
  priority: Scalars['String']['input'];
  taskListName: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type AddTaskListInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type EditSubtaskInput = {
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EditTaskInput = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  dueDate?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  progress?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  taskListName?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type EditTaskListInput = {
  userId: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addSubtask?: Maybe<Subtask>;
  addTask?: Maybe<Task>;
  createTaskList?: Maybe<TaskList>;
  deleteSubtask?: Maybe<Array<Maybe<Subtask>>>;
  deleteTask?: Maybe<Array<Maybe<Task>>>;
  deleteTaskList?: Maybe<Array<Maybe<TaskList>>>;
  reorderSubtasks?: Maybe<Array<Maybe<Subtask>>>;
  updateSubtask?: Maybe<Subtask>;
  updateTask?: Maybe<Task>;
  updateTaskList?: Maybe<TaskList>;
};


export type MutationAddSubtaskArgs = {
  subtask: AddSubtaskInput;
};


export type MutationAddTaskArgs = {
  task: AddTaskInput;
};


export type MutationCreateTaskListArgs = {
  taskList: AddTaskListInput;
};


export type MutationDeleteSubtaskArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTaskListArgs = {
  id: Scalars['Int']['input'];
};


export type MutationReorderSubtasksArgs = {
  newIndex: Scalars['Int']['input'];
  subtaskId: Scalars['Int']['input'];
};


export type MutationUpdateSubtaskArgs = {
  edits: EditSubtaskInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateTaskArgs = {
  edits: EditTaskInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateTaskListArgs = {
  edits: EditTaskListInput;
  id: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  allTaskLists: Array<Maybe<TaskList>>;
  allTasks: Array<Maybe<Task>>;
  subtask?: Maybe<Subtask>;
  subtasks: Array<Maybe<Subtask>>;
  task?: Maybe<Task>;
  taskList?: Maybe<TaskList>;
  taskLists: Array<Maybe<TaskList>>;
  tasks: Array<Maybe<Task>>;
};


export type QuerySubtaskArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySubtasksArgs = {
  taskId: Scalars['Int']['input'];
};


export type QueryTaskArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTaskListArgs = {
  name: Scalars['String']['input'];
};


export type QueryTaskListsArgs = {
  names: Array<InputMaybe<Scalars['String']['input']>>;
};


export type QueryTasksArgs = {
  taskListName: Scalars['String']['input'];
};

export type Subtask = {
  __typename?: 'Subtask';
  id: Scalars['Int']['output'];
  index: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  task: Task;
  taskId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Task = {
  __typename?: 'Task';
  cursor: Scalars['Int']['output'];
  dueDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
  priority: Scalars['String']['output'];
  progress: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  subtasks: Array<Subtask>;
  taskListName: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TaskList = {
  __typename?: 'TaskList';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  tasks: Array<Maybe<Task>>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UpdateSubtaskMutationVariables = Exact<{
  subtaskId: Scalars['Int']['input'];
  edits: EditSubtaskInput;
}>;


export type UpdateSubtaskMutation = { __typename?: 'Mutation', updateSubtask?: { __typename?: 'Subtask', id: number, index: number, status: string, taskId: number, title: string } | null };

export type AddSubtaskMutationVariables = Exact<{
  input: AddSubtaskInput;
}>;


export type AddSubtaskMutation = { __typename?: 'Mutation', addSubtask?: { __typename?: 'Subtask', id: number, index: number, status: string, taskId: number, title: string } | null };

export type DeleteSubtaskMutationVariables = Exact<{
  subtaskId: Scalars['Int']['input'];
}>;


export type DeleteSubtaskMutation = { __typename?: 'Mutation', deleteSubtask?: Array<{ __typename?: 'Subtask', id: number, index: number, status: string, taskId: number, title: string } | null> | null };

export type GetSubtaskQueryVariables = Exact<{
  subtaskId: Scalars['Int']['input'];
}>;


export type GetSubtaskQuery = { __typename?: 'Query', subtask?: { __typename?: 'Subtask', id: number, index: number, status: string, taskId: number, title: string } | null };

export type ReorderSubtasksMutationVariables = Exact<{
  subtaskId: Scalars['Int']['input'];
  newIndex: Scalars['Int']['input'];
}>;


export type ReorderSubtasksMutation = { __typename?: 'Mutation', reorderSubtasks?: Array<{ __typename?: 'Subtask', id: number, title: string, status: string, index: number, taskId: number } | null> | null };

export type GetSubtasksQueryVariables = Exact<{
  taskId: Scalars['Int']['input'];
}>;


export type GetSubtasksQuery = { __typename?: 'Query', subtasks: Array<{ __typename?: 'Subtask', id: number, index: number, status: string, taskId: number, title: string } | null> };

export type CreateTaskMutationVariables = Exact<{
  task: AddTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', addTask?: { __typename?: 'Task', id: number, taskListName: string, title: string, label: string, priority: string, progress: number, status: string, dueDate?: string | null, cursor: number, subtasks: Array<{ __typename?: 'Subtask', id: number, index: number, status: string, taskId: number, title: string }> } | null };

export type EditTaskMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  edits: EditTaskInput;
}>;


export type EditTaskMutation = { __typename?: 'Mutation', updateTask?: { __typename?: 'Task', id: number, taskListName: string, priority: string, title: string, label: string, cursor: number, dueDate?: string | null, progress: number, status: string, subtasks: Array<{ __typename?: 'Subtask', id: number, index: number, taskId: number, status: string, title: string }> } | null };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask?: Array<{ __typename?: 'Task', id: number, taskListName: string, priority: string, title: string, label: string, cursor: number, dueDate?: string | null, progress: number, status: string, subtasks: Array<{ __typename?: 'Subtask', id: number, index: number, taskId: number, status: string, title: string }> } | null> | null };

export type GetTaskQueryVariables = Exact<{
  taskId: Scalars['Int']['input'];
}>;


export type GetTaskQuery = { __typename?: 'Query', task?: { __typename?: 'Task', id: number, taskListName: string, priority: string, title: string, label: string, cursor: number, dueDate?: string | null, progress: number, status: string, subtasks: Array<{ __typename?: 'Subtask', id: number, index: number, taskId: number, status: string, title: string }> } | null };

export type CreateTaskListMutationVariables = Exact<{
  taskList: AddTaskListInput;
}>;


export type CreateTaskListMutation = { __typename?: 'Mutation', createTaskList?: { __typename?: 'TaskList', id: number, name?: string | null, userId?: string | null } | null };

export type UpdateTaskListMutationVariables = Exact<{
  taskListId: Scalars['Int']['input'];
  edits: EditTaskListInput;
}>;


export type UpdateTaskListMutation = { __typename?: 'Mutation', updateTaskList?: { __typename?: 'TaskList', id: number, name?: string | null, userId?: string | null } | null };

export type DeleteTaskListMutationVariables = Exact<{
  deleteTaskListId: Scalars['Int']['input'];
}>;


export type DeleteTaskListMutation = { __typename?: 'Mutation', deleteTaskList?: Array<{ __typename?: 'TaskList', id: number, name?: string | null, userId?: string | null } | null> | null };

export type GetTaskListsQueryVariables = Exact<{
  names: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type GetTaskListsQuery = { __typename?: 'Query', taskLists: Array<{ __typename?: 'TaskList', id: number, name?: string | null, userId?: string | null } | null> };

export type GetAllTaskListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTaskListsQuery = { __typename?: 'Query', allTaskLists: Array<{ __typename?: 'TaskList', id: number, name?: string | null, userId?: string | null } | null> };

export type GetTasksQueryVariables = Exact<{
  taskListName: Scalars['String']['input'];
}>;


export type GetTasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', cursor: number, dueDate?: string | null, id: number, label: string, priority: string, progress: number, status: string, taskListName: string, title: string, subtasks: Array<{ __typename?: 'Subtask', id: number, index: number, status: string, taskId: number, title: string }> } | null> };

export type GetAllTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTasksQuery = { __typename?: 'Query', allTasks: Array<{ __typename?: 'Task', cursor: number, dueDate?: string | null, id: number, label: string, priority: string, progress: number, status: string, taskListName: string, title: string, subtasks: Array<{ __typename?: 'Subtask', id: number, index: number, status: string, taskId: number, title: string }> } | null> };


export const UpdateSubtaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSubtask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subtaskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"edits"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditSubtaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSubtask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subtaskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"edits"},"value":{"kind":"Variable","name":{"kind":"Name","value":"edits"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<UpdateSubtaskMutation, UpdateSubtaskMutationVariables>;
export const AddSubtaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSubtask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddSubtaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSubtask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subtask"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<AddSubtaskMutation, AddSubtaskMutationVariables>;
export const DeleteSubtaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSubtask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subtaskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSubtask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subtaskId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<DeleteSubtaskMutation, DeleteSubtaskMutationVariables>;
export const GetSubtaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubtask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subtaskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subtask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subtaskId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetSubtaskQuery, GetSubtaskQueryVariables>;
export const ReorderSubtasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReorderSubtasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subtaskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newIndex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reorderSubtasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subtaskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subtaskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newIndex"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}}]}}]}}]} as unknown as DocumentNode<ReorderSubtasksMutation, ReorderSubtasksMutationVariables>;
export const GetSubtasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubtasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetSubtasksQuery, GetSubtasksQueryVariables>;
export const CreateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"task"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"task"},"value":{"kind":"Variable","name":{"kind":"Name","value":"task"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskListName"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const EditTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"edits"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"edits"},"value":{"kind":"Variable","name":{"kind":"Name","value":"edits"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskListName"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<EditTaskMutation, EditTaskMutationVariables>;
export const DeleteTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskListName"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const GetTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskListName"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<GetTaskQuery, GetTaskQueryVariables>;
export const CreateTaskListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTaskList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskList"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddTaskListInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTaskList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskList"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskList"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<CreateTaskListMutation, CreateTaskListMutationVariables>;
export const UpdateTaskListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTaskList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskListId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"edits"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EditTaskListInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskListId"}}},{"kind":"Argument","name":{"kind":"Name","value":"edits"},"value":{"kind":"Variable","name":{"kind":"Name","value":"edits"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskListMutation, UpdateTaskListMutationVariables>;
export const DeleteTaskListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTaskList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteTaskListId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTaskList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteTaskListId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<DeleteTaskListMutation, DeleteTaskListMutationVariables>;
export const GetTaskListsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTaskLists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"names"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskLists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"names"},"value":{"kind":"Variable","name":{"kind":"Name","value":"names"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<GetTaskListsQuery, GetTaskListsQueryVariables>;
export const GetAllTaskListsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTaskLists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allTaskLists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<GetAllTaskListsQuery, GetAllTaskListsQueryVariables>;
export const GetTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskListName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskListName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskListName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"taskListName"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<GetTasksQuery, GetTasksQueryVariables>;
export const GetAllTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"taskListName"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllTasksQuery, GetAllTasksQueryVariables>;