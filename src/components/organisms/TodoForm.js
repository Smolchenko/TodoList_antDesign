import { useState, useRef } from "react";

import InputText from "../atoms/InputText";
import UserControlButton from "../atoms/Button";

const TodoForm = ({ addTodo }) => {
  const [task, setTask] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputRef = useRef(null);
  // const isTouched = useRef(false);

  const handleInputFocus = (boolVal) => {
    setIsTouched(boolVal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanText = task.trim();

    if (cleanText) {
      addTodo(cleanText);
      setTask("");
    }
  };

  return (
    <form className="addtask">
      <InputText
        ref={inputRef}
        task={task}
        onChange={(e) => setTask(e.target.value)}
        onPressEnter={handleSubmit}
        isTouched={isTouched}
        onFocus={handleInputFocus}
      >
        Add
      </InputText>
      <UserControlButton onClick={handleSubmit}>Add</UserControlButton>
    </form>
  );
};

export default TodoForm;
