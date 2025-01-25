import Todo from "@/components/Todo";

const TodosPage = () => {
    const todos = [{ id: 1, title: 'wash dishes', completed: false }, { id: 2, title: 'clean room', completed: true }]

    return (
        <div>
            <h1 data-testid="todo" className="uppercase">Todos</h1>
            <Todo todos={todos}/>
        </div>
    )
}

export default TodosPage;