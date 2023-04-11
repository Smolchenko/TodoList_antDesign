import { Checkbox, ConfigProvider } from "antd";

const InputCheckBox = ({ checked, onChange, isDisabled = false }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#99A799"
        }
      }}
    >
      <Checkbox checked={checked} onChange={onChange} disabled={isDisabled} />
    </ConfigProvider>
  );
};

export default InputCheckBox;
