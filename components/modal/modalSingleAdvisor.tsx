import { useCalendar } from "@context/CalendarContext";
import getDateFromId from "@helpers/getDateFromId";
import numberZeroAdder from "@helpers/numberZeroAdder";
import {
  getOnHoldDay,
  getFreeSlotsDay,
  getBookedDay,
} from "@helpers/slotFilters";
import React from "react";
import { ListGroup, Form, Modal, Button } from "react-bootstrap";
import { useForms } from "../../hooks/useForm";
import ModalContainer from "./modalContainer";

interface ModalClientProps {
  items: any;
}
const ModalClient: React.FC<ModalClientProps> = (props) => {
  const { handleInputChange, inputs } = useForms({ time: "" });
  const [state, { closeModal, deleteSlot }] = useCalendar();
  //   console.log(state.modal.id);
  const onHoldSlots = getOnHoldDay(state.slots, state.modal.id);
  const freeSlots = getFreeSlotsDay(state.slots, state.modal.id);
  const bookedSlots = getBookedDay(state.slots, state.modal.id);
  const { month, day, year } = getDateFromId(state.modal.id);

  return (
    <ModalContainer>
      <Modal.Header>
        <Modal.Title>
          {day}.{month + 1}.{year}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup
          style={{ maxHeight: "15rem", overflowY: "auto" }}
          variant="flush"
        >
          <Form.Label>Choose hour</Form.Label>
          {freeSlots.map((i: any) => {
            const id = `${i.hour}:${i.minute}`;
            return (
              <ListGroup.Item className="d-flex" key={i.id}>
                <span>
                  {numberZeroAdder(i.hour)} : {numberZeroAdder(i.minute)}
                </span>
                <span className="flex-grow-1"></span>

                <button
                  type="button"
                  onClick={() => deleteSlot(state.modal.id, i.id)}
                  className="btn-close btn-sm text-center "
                  aria-label="Close"
                ></button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={closeModal} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </ModalContainer>
  );
};

export default ModalClient;
