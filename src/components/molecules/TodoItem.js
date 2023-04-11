import { useState, useEffect, useRef } from "react";

import { ThemeProvider } from "../../context/useTheme";
import InputCheckBox from "../atoms/InputCheckBox";
import InputText from "../atoms/InputText";
import UserControlButton from "../atoms/Button";

// import { Row, Col } from "antd";
import { Row, Col, Alert, Space, Button } from "antd";

const TodoItem = ({ todo, deleteTodo, editTodo, completeTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.task);
  // const [deleteClicked, setDeleteClicked] = useState(false);

  const inputRef = useRef(null);
  // useRef hook creates a mutable reference that persists across component
  // renders. In this case, the useRef hook is used to create a reference to
  // the false boolean value, which can be used to track whether a particular
  // component has been "touched" or interacted with by the user.
  // const isTouched = useRef(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleInputFocus = (val) => setIsTouched(val);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = (e) => {
    e.preventDefault();
    const cleanText = text.trim();

    if (cleanText) {
      setText(cleanText);
      editTodo(todo.id, cleanText);
      setIsEditing(false);
    } else {
      handleInputFocus(true);
    }
  };

  return (
    <li>
      <ThemeProvider>
        <Row>
          <Col span={3}>
            <InputCheckBox
              checked={todo.completed}
              onChange={() => completeTodo(todo.id)}
              isDisabled={!text}
            />
          </Col>
          {isEditing ? (
            <>
              <Col span={15}>
                <InputText
                  ref={inputRef}
                  task={text}
                  onChange={(e) => setText(e.target.value)}
                  onPressEnter={handleEdit}
                  isTouched={isTouched}
                  onFocus={handleInputFocus}
                >
                  Save
                </InputText>
              </Col>
              <Col span={2}>
                <UserControlButton onClick={handleEdit} isDisabled={!text}>
                  Save
                </UserControlButton>
              </Col>
            </>
          ) : (
            <>
              <Col span={15}>{todo.task}</Col>
              <Col span={6}>
                <Row gutter={[8, 0]}>
                  <Col>
                    <UserControlButton onClick={() => setIsEditing(true)}>
                      Edit
                    </UserControlButton>
                  </Col>
                  <Col>
                    <UserControlButton onClick={() => deleteTodo(todo.id)}>
                      {/* <UserControlButton onClick={() => setDeleteClicked(true)}> */}
                      Delete
                    </UserControlButton>
                  </Col>
                </Row>
              </Col>
            </>
          )}
        </Row>
      </ThemeProvider>
      {/* add a confirmation dialog */}
      {/* {deleteClicked && (
        <Alert
          message="Note -"
          description="You are about to remove the item from the list"
          style={{ textAlign: "left", width: "400px" }}
          type="info"
          action={
            <Space direction="vertical">
              <Button size="small" type="primary">
                Proceed
              </Button>
              <Button size="small" danger type="ghost">
                Cancel
              </Button>
            </Space>
          }
          closable
        />
      )} */}
    </li>
  );
};

export default TodoItem;
