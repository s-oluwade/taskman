// import {render, screen, cleanup } from '@testing-library/react';
// import Todo from '../components/Todo';

const {render, screen:scrn, cleanup} = require('@testing-library/react');
// const { default: TodosPage } = require("@/app/todos/page.tsx");
import TodosPage from "@/app/todos/page";

test('should render completed todo', () => {
    // ARRANGE
    render(<TodosPage />);

    // ACT
    // const todoElement = scrn.getByTestId('todo');
    const todoElement = scrn.getByText(/hello/i);
    // const todoElement = scrn.getByRole('h1');
    // const todoElement = scrn.findByRole('h1');

    // ASSERT
    expect(todoElement).toBeInTheDocument();
    // expect(todoElement).toHaveTextContent('wash dishes');
})

// test('should render non-completed todo', () => {
//     // ARRANGE
//     render(<TodosPage />);

//     // ACT
//     // const todoElement = scrn.getByTestId('todo-2');
//     const todoElement = scrn.getByRole('h1');

//     // ASSERT
//     expect(todoElement).toBeInTheDocument();
//     // expect(todoElement).toHaveTextContent('clean room');
// })
