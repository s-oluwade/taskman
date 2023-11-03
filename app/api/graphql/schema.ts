// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  type Task {
    id: Int!
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
    tasks: [Task]!
    task(id: Int!): Task
    subtasks(taskId: Int!): [Subtask]!
    subtask(id: Int!): Subtask
  }
  type Mutation {
    addTask(task: AddTaskInput!): Task
    deleteTask(id: Int!): [Task]
    updateTask(id: Int!, edits: EditTaskInput!): Task
    addSubtask(subtask: AddSubtaskInput!): Subtask
    deleteSubtask(id: Int!): [Subtask]
    updateSubtask(id: Int!, edits: EditSubtaskInput!): Subtask
    reorderSubtasks(subtaskId: Int!, newIndex: Int! ): [Subtask]
  }
  input AddTaskInput {
    title: String!
    label: String!
    priority: String!
    dueDate: String
  }
  input EditTaskInput {
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
