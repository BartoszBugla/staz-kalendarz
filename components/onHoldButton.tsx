import React from "react";
import { Button } from "react-bootstrap";
import { useCalendar } from "../context/CalendarContext";

interface onHoldButtonProps {}
const onHoldButton: React.FC<onHoldButtonProps> = () => {
  const [state, { openOnHoldModal }] = useCalendar();
  let counter = 0;
  for (const i in state.slots) {
    const newArray = state.slots[i].filter((j) => {
      return j.onHold == true;
    });
    counter += newArray.length;
  }
  return <Button onClick={openOnHoldModal}>On hold {counter} </Button>;
};

export default onHoldButton;
