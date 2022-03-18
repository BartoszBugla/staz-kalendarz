import { useCalendar } from "@context/CalendarContext";
import getDateFromId from "@helpers/getDateFromId";
import numberZeroAdder from "@helpers/numberZeroAdder";
import { Slot } from "../../types";
import React from "react";
import { ListGroup, Form, Modal, Button } from "react-bootstrap";
import { useForms } from "../../hooks/useForm";
import ModalContainer from "./modalContainer";
import UserForm from "./userForm";
interface ModalClientProps {}
const ModalClient: React.FC<ModalClientProps> = (props) => {
  const { handleInputChange, inputs } = useForms({ time: "" });
  const [state, { closeModal }] = useCalendar();
  const items: Slot[] = state.slots[state.modal.id].filter((i) => {
    return i.available == true;
  });
  const { month, day, year } = getDateFromId(state.modal.id);

  return (
    <ModalContainer>
      <Modal.Header>
        <Modal.Title>
          {day}.{month + 1}.{year}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserForm timeId={inputs.time}>
          <ListGroup
            style={{ maxHeight: "15rem", overflowY: "auto" }}
            variant="flush"
          >
            <Form.Label>Choose hour</Form.Label>
            {items.map((i) => {
              return (
                <ListGroup.Item className="d-flex" key={i.id}>
                  <span>
                    {numberZeroAdder(i.hour)} : {numberZeroAdder(i.minute)}
                  </span>
                  <span className="flex-grow-1"></span>
                  <span className="pointer">
                    {" "}
                    <Form.Check
                      required
                      type={"radio"}
                      id={`default-${"radio"}`}
                      label={`choose`}
                      name="time"
                      onChange={handleInputChange}
                      value={i.id}
                    />
                  </span>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </UserForm>
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
