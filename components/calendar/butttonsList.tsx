import { useCalendar } from "@context/CalendarContext";
import React from "react";
import { Button, Stack } from "react-bootstrap";
import OnHoldButton from "../onHoldButton";
interface ButtonsListProps {}
const ButtonsList: React.FC<ButtonsListProps> = (props) => {
  const [state, { clearSlots, openModalChoose, chooseStart, chooseEnd }] =
    useCalendar();

  if (state.logged && state.state.isChoosing) {
    return (
      <Stack className="mt-2" direction="horizontal" gap={3}>
        <Button variant="secondary" onClick={chooseEnd}>
          Cancel
        </Button>

        <Button onClick={clearSlots} variant="danger">
          Delete free slots
        </Button>
        <Button variant="success" onClick={openModalChoose}>
          Create new slots{" "}
        </Button>
      </Stack>
    );
  } else if (state.logged && !state.state.isChoosing) {
    return (
      <Stack className="mt-2" direction="horizontal" gap={3}>
        <Button onClick={chooseStart}>Choose </Button>
        <OnHoldButton />
      </Stack>
    );
  }
  return <></>;
};

export default ButtonsList;
