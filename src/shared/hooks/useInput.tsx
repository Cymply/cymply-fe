import { useState } from "react";
type TInputType = string;

const useInput = (initialValue: TInputType) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.trim());
  };

  return { value, onChange };
};

export default useInput;
