import { Button, ConfigProvider } from "antd";
import { useTheme } from "../../context/useTheme";

const UserControlButton = ({ onClick, isDisabled = false, children }) => {
  // currently useful only for Add and Save buttons that have matching text inputs
  const { getColor } = useTheme();
  const colorPrimary = getColor(children);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary
        }
      }}
    >
      <Button type="primary" onClick={onClick} disabled={isDisabled}>
        {isDisabled ? "Pending" : children}
      </Button>
    </ConfigProvider>
  );
};

export default UserControlButton;
