import React from "react";
import { Button } from "react-bootstrap";
import { useCalendar } from "../context/CalendarContext";
import Circle from "./shared/circle";

interface onHoldButtonProps {}
const OnHoldButton: React.FC<onHoldButtonProps> = () => {
  const [state, { openOnHoldModal }] = useCalendar();
  let counter = 0;
  for (const i in state.slots) {
    const newArray = state.slots[i].filter((j) => {
      return j.onHold == true;
    });
    counter += newArray.length;
  }
  return (
    <Button className="d-flex" onClick={openOnHoldModal}>
      <span className="px-1">On hold </span>
      {counter > 0 && <Circle color="orange" count={counter} />}
    </Button>
  );
};

export default OnHoldButton;
