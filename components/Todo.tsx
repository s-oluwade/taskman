const Todo = ({todos}: {todos: {[x: string]: any}[]}) => {
  const id = todos;

  return (
    <ul data-testid="todo">
      {todos.map((todo) =>
        todo.completed ? (
          <li key={todo.id}>
            <s>{todo.title}hello</s>
          </li>
        ) : (
          <li key={todo.id}>{todo.title}</li>
        )
      )}
    </ul>
  );
};

export default Todo;
