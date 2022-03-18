import React from "react";
import { Button } from "react-bootstrap";

interface ChangeMonthButtonProps {
  onClick: () => void;
}
const ChangeMonthButton: React.FC<ChangeMonthButtonProps> = (props) => {
  return (
    <Button style={{ width: "6rem" }} onClick={props.onClick}>
      {props.children}
    </Button>
  );
};

export default ChangeMonthButton;
