import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { ThemeProvider } from "./context/useTheme";
import Title from "./components/atoms/Title";
import TodoForm from "./components/organisms/TodoForm";
import TodoList from "./components/organisms/TodoList";
import FooterComponent from "./components/atoms/Footer";

import "./styles.css";

export default function App() {
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

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (err) {
      console.error(err);
    }
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: uuidv4(),
      task: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <Title>Bullet Journal</Title>
      <main>
        <ThemeProvider>
          <TodoForm addTodo={addTodo} />
        </ThemeProvider>
        <TodoList todos={todos} setTodos={setTodos} />
      </main>
      <FooterComponent />
    </div>
  );
}
