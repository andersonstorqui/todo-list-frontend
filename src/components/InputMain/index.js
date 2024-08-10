import { Input } from "./style";

const InputComponents = ({ type, placeholder, value, name, onChange }) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    />
  );
};

export default InputComponents;
