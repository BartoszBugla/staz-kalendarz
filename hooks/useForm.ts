import { useState } from "react";

export const useForms: any = (initialState: {}) => {
  const [inputs, setInputs] = useState<any>(initialState);

  const handleInputChange = (event: any) => {
    event.persist();

    if (event.target.type === "checkbox") {
      setInputs((inputs: any) => ({
        ...inputs,
        [event.target.name]: event.target.checked,
      }));
    } else {
      setInputs((inputs: any) => ({
        ...inputs,
        [event.target.name]: event.target.value,
      }));
    }
  };

  return {
    handleInputChange,
    inputs,
    setInputs,
  };
};
