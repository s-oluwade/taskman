// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  type TaskList {
    id: Int!
    userId: String
    name: String # will be randomly generated if undefined
    tasks: [Task]!
  }
  type Task {
    id: Int!
    taskListName: String!
    title: String!
    label: String!
    priority: String!
    dueDate: String
    status: String!
    progress: Int!
    cursor: Int!
    subtasks: [Subtask!]!
  }
  type Subtask {
    id: Int!
    index: Int!
    taskId: Int!
    title: String!
    status: String!
    task: Task!
  }
  type Query {
    allTaskLists: [TaskList]!
    taskLists(names: [String]!): [TaskList]!
    taskList(name: String!): TaskList
    allTasks: [Task]!
    tasks(taskListName: String!): [Task]!
    task(id: Int!): Task
    subtasks(taskId: Int!): [Subtask]!
    subtask(id: Int!): Subtask
  }
  type Mutation {
    createTaskList(taskList: AddTaskListInput!): TaskList
    deleteTaskList(id: Int!): [TaskList]
    updateTaskList(id: Int!, edits: EditTaskListInput!): TaskList
    addTask(task: AddTaskInput!): Task
    deleteTask(id: Int!): [Task]
    updateTask(id: Int!, edits: EditTaskInput!): Task
    addSubtask(subtask: AddSubtaskInput!): Subtask
    deleteSubtask(id: Int!): [Subtask]
    updateSubtask(id: Int!, edits: EditSubtaskInput!): Subtask
    reorderSubtasks(subtaskId: Int!, newIndex: Int! ): [Subtask]
  }
  input AddTaskListInput {
    userId: Int
    name: String
  }
  input EditTaskListInput {
    userId: Int!
  }
  input AddTaskInput {
    taskListName: String!
    title: String!
    label: String!
    priority: String!
    dueDate: String
  }
  input EditTaskInput {
    taskListName: String
    title: String
    label: String
    priority: String
    dueDate: String
    status: String
    progress: Int
    cursor: Int
  }
  input AddSubtaskInput {
    taskId: Int!
    title: String!
  }
  input EditSubtaskInput {
    title: String
    status: String
  }
`;
