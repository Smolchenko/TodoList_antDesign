import { forwardRef } from "react";
import { Input, ConfigProvider, Tooltip } from "antd";

import { useTheme } from "../../context/useTheme";

const InputText = forwardRef(
  ({ task, onChange, onPressEnter, isTouched, onFocus, children }, ref) => {
    // currently useful only for Add and Save buttons that have matching text inputs
    const { getColor } = useTheme();
    const colorPrimary = getColor(children);

    const isBordered = children === "Add" ? false : true;
    const shouldCommentOnEmpty = !task && children !== "Add" && isTouched;
    const inputAddFormat = {
      borderRadius: 0,
      borderTopStyle: "none",
      borderLeftStyle: "none",
      borderRightStyle: "none",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderColor: "#FFF",
      borderBottomColor: colorPrimary
    };

    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary,
            colorText: colorPrimary
          }
        }}
      >
        <Tooltip
          title={shouldCommentOnEmpty && "Please enter a task"}
          open={shouldCommentOnEmpty}
          placement="top"
          color={"#D0C9C0"}
          key={task.id}
        >
          <Input
            ref={ref}
            placeholder="Write a task"
            value={task}
            onChange={onChange}
            onPressEnter={onPressEnter}
            onFocus={() => onFocus(true)}
            onBlur={() => onFocus(false)}
            // onBlur is the opposite of onFocus in React. It's triggered when an
            // element loses focus, such as when the user clicks outside of the
            // input field or tabs away from it.
            allowClear
            bordered={isBordered}
            style={children === "Add" ? inputAddFormat : {}}
            status={shouldCommentOnEmpty && "error"}
          />
        </Tooltip>
      </ConfigProvider>
    );
  }
);

export default InputText;
