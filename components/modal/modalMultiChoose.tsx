import React, { useState } from "react";
import { Modal, Button, Form, FormLabel, ListGroup } from "react-bootstrap";
import { useCalendar } from "../../context/CalendarContext";
import ModalContainer from "./modalContainer";
import numberZeroAdder from "@helpers/numberZeroAdder";

interface ModalAdvisorProps {}

type IState = {
  hour: number;
  minute: number;
  id: string;
};
const ModalAdvisor: React.FC<ModalAdvisorProps> = () => {
  const [state, { closeModal, addFreeSlots }] = useCalendar();
  const [items, setItems] = useState<IState[]>([]);
  const [time, setTime] = useState<{ hour: number; minute: number }>({
    hour: 0,
    minute: 0,
  });
  const handleChange = (e: any) => {
    e.preventDefault();

    setTime((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const generateSelect = (incrementor: number, max: number) => {
    const arr = [];
    for (let i = 0; i < max; i = i + incrementor) {
      arr.push(
        <option key={i} value={i}>
          {numberZeroAdder(i)}
        </option>
      );
    }
    return arr;
  };
  const add = (e: any) => {
    e.preventDefault();

    setItems((prev) => {
      const id = `${time.hour}-${time.minute}`;
      const found = prev.find((i) => i.id == id);
      if (found) {
        return prev;
      } else {
        return [
          ...prev,
          {
            hour: time.hour,
            minute: time.minute,
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
        <Form>
          <div className="d-flex">
            <FormLabel>
              <span>Hour:</span>
              <Form.Select
                onChange={handleChange}
                name="hour"
                value={time.hour}
              >
                {generateSelect(1, 24)}
              </Form.Select>
            </FormLabel>

            <FormLabel>
              <span>Minute:</span>
              <Form.Select
                onChange={handleChange}
                name="minute"
                value={time.minute}
              >
                {generateSelect(5, 60)}
              </Form.Select>
            </FormLabel>
          </div>
          <Button className="w-100 mt-2" onClick={add} variant="primary">
            ADD
          </Button>
        </Form>
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
        <p className="text-muted text-sm ">
          You can enter particular time only once
        </p>
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
