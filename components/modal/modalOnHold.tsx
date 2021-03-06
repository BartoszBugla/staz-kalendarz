import getDateFromId from "@helpers/getDateFromId";
import { getAllOnHold } from "@helpers/slotFilters";
import React from "react";
import { useCalendar } from "@context/CalendarContext";
import ModalContainer from "./modalContainer";
import OnHoldAccept from "@components/shared/onHoldCard";
import numberZeroAdder from "@helpers/numberZeroAdder";
import { Info, Slot } from "../../types";
import { Modal, Button, ListGroup } from "react-bootstrap";

// import { useCalendar } from "../context/CalendarContext";
interface IProps {}
const OnHoldModal: React.FC<IProps> = ({ children }) => {
  const [state, { closeModal, acceptSlot, rejectSlot }] = useCalendar();

  const filtered = getAllOnHold(state.slots);

  const renderElements = () => {
    const arr = [];
    for (const i in filtered) {
      const { year, month, day } = getDateFromId(i);
      arr.push(
        <ListGroup key={i}>
          <h3>
            {numberZeroAdder(day)}.{numberZeroAdder(month + 1)}
          </h3>

          {filtered[i].map((j: Slot) => {
            if (!j.info) {
              return "something went wrong ";
            } else {
              return (
                <OnHoldAccept
                  key={`${j.id}`}
                  date={getDateFromId(i)}
                  time={{ minute: j.minute, hour: j.hour }}
                  info={j.info}
                  accept={() => {
                    console.log(i, j.id);
                    acceptSlot(i, j.id);
                  }}
                  reject={() => rejectSlot(i, j.id)}
                />
              );
            }
          })}
        </ListGroup>
      );
    }
    return arr;
  };
  return (
    <ModalContainer>
      <Modal.Header>
        <Modal.Title>Reservations on hold </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "30rem" }} className="overflow-auto  ">
        {renderElements()}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </ModalContainer>
  );
};
export default OnHoldModal;
