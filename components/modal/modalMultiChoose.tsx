import React, { useState } from "react";
import { Modal, Button, Form, FormLabel, ListGroup } from "react-bootstrap";
import { useCalendar } from "../../context/CalendarContext";
import ModalContainer from "./modalContainer";
import numberZeroAdder from "@helpers/numberZeroAdder";
import ChooseHour from "./chooseHour";
import { useForms } from "@hooks/useForm";

interface ModalAdvisorProps {}

type IState = {
  hour: number;
  minute: number;
  id: string;
};
const ModalAdvisor: React.FC<ModalAdvisorProps> = () => {
  const [state, { closeModal, addFreeSlots }] = useCalendar();
  const [items, setItems] = useState<IState[]>([]);
  const { inputs, handleInputChange } = useForms({ hour: 0, minute: 0 });
  const add = (e: any) => {
    e.preventDefault();
    setItems((prev) => {
      //local id!!!!!
      //use only across local component
      const id = `${inputs.hour}-${inputs.minute}`;
      const found = prev.find((i) => i.id == id);
      if (found) {
        return prev;
      } else {
        return [
          ...prev,
          {
            hour: inputs.hour,
            minute: inputs.minute,
            id: id,
          },
        ];
      }
    });
    // setTime({ minute: time.minute, hour: time.hour + 1 });
  };
  const deleteSlot = (id: string) => {
    setItems((i) => {
      return i.filter((j) => {
        return id != j.id;
      });
    });
  };
  return (
    <ModalContainer>
      <Modal.Header closeButton>
        <Modal.Title>Set terms </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ChooseHour time={inputs} handleChange={handleInputChange} add={add} />
        <ListGroup
          style={{ maxHeight: "20rem", overflowY: "scroll" }}
          variant="flush"
          className="mt-2"
        >
          {items.map((i) => {
            return (
              <ListGroup.Item className="d-flex" key={i.id}>
                <span>
                  {numberZeroAdder(i.hour)} : {numberZeroAdder(i.minute)}
                </span>
                <span className="flex-grow-1"></span>

                <button
                  type="button"
                  onClick={() => deleteSlot(`${i.id}`)}
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
        <Button variant="success" onClick={() => addFreeSlots(items)}>
          Confirm
        </Button>
      </Modal.Footer>
    </ModalContainer>
  );
};

export default ModalAdvisor;
