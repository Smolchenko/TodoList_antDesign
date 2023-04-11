import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useTodoActions = () => {
  const [todos, setTodos] = useState(defaultDataInject);

  function defaultDataInject() {
    try {
      const storedTodos = localStorage.getItem("todos");
      return storedTodos
        ? JSON.parse(storedTodos)
        : [
            { id: uuidv4(), task: "Clean the dishes", completed: false },
            { id: uuidv4(), task: "Shop for groceries", completed: true },
            { id: uuidv4(), task: "Eat breakfast", completed: false }
          ];
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  const addTodo = (text) => {
    const newTodo = {
      id: uuidv4(),
      task: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const editTodo = (id, text) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: text };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  return { addTodo, completeTodo, deleteTodo, editTodo };
};

export default useTodoActions;
