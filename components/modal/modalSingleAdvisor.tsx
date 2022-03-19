import FreeSlot from "@components/shared/freeSlot";
import OnHoldCard from "@components/shared/onHoldCard";
import ReservedCard from "@components/shared/reservedCard";
import { useCalendar } from "@context/CalendarContext";
import getDateFromId from "@helpers/getDateFromId";
import numberZeroAdder from "@helpers/numberZeroAdder";
import type { Slot } from "../../types";
import {
  getOnHoldDay,
  getFreeSlotsDay,
  getBookedDay,
} from "@helpers/slotFilters";
import React, { useEffect, useState } from "react";
import { ListGroup, Form, Modal, Button, Navbar, Nav } from "react-bootstrap";
import { useForms } from "../../hooks/useForm";
import ChooseHour from "./chooseHour";
import ModalContainer from "./modalContainer";

interface ModalClientProps {}
// const NavItem = () => {};
const ModalAdvisor: React.FC<ModalClientProps> = (props) => {
  const [active, setActive] = useState("free");
  const [ghostCounter, setGhostCounter] = useState(0);
  //custom hooks
  const [state, { closeModal, deleteSlot, acceptSlot, rejectSlot, addSlot }] =
    useCalendar();

  const { inputs, handleInputChange } = useForms({ hour: 0, minute: 0 });
  //filters
  let onHoldSlots: Slot[] = [];
  let freeSlots: Slot[] = [];
  let bookedSlots: Slot[] = [];
  if (state.slots[state.modal.id]) {
    onHoldSlots = getOnHoldDay(state.slots, state.modal.id);
    freeSlots = getFreeSlotsDay(state.slots, state.modal.id);
    bookedSlots = getBookedDay(state.slots, state.modal.id);
  }

  const { month, day, year } = getDateFromId(state.modal.id);

  const add = (e: any) => {
    setGhostCounter(ghostCounter + 1);
    addSlot(state.modal.id, inputs);
  };

  // useEffect(() => {}, [state.slots[state.modal.id]]);
  // const add = React.useCallback(() => addSlot(state.modal.id, inputs), []);
  return (
    <ModalContainer>
      <Modal.Header>
        <Modal.Title>
          {day}.{month + 1}.{year}
        </Modal.Title>
      </Modal.Header>
      <Modal.Header>
        <div
          className="pointer"
          style={{ color: active == "free" ? "blue" : "black" }}
          onClick={() => setActive("free")}
        >
          Free {freeSlots.length}
        </div>
        <div className="vr"></div>
        <div
          className="pointer"
          style={{ color: active == "onHold" ? "blue" : "black" }}
          onClick={() => setActive("onHold")}
        >
          On hold {onHoldSlots.length}
        </div>
        <div className="vr"></div>
        <div
          className="pointer"
          style={{ color: active == "booked" ? "blue" : "black" }}
          onClick={() => setActive("booked")}
        >
          Booked {bookedSlots.length}
        </div>
      </Modal.Header>

      <Modal.Body>
        <ListGroup
          style={{ maxHeight: "25rem", overflowY: "scroll" }}
          variant="flush"
        >
          {active == "free" && (
            <>
              <ChooseHour
                time={inputs}
                handleChange={handleInputChange}
                add={add}
              />
              <h4> Free slots</h4>
              {freeSlots.map((i) => {
                return (
                  <ListGroup.Item key={i.id}>
                    <FreeSlot
                      minute={i.minute}
                      hour={i.hour}
                      deleteSlot={() => deleteSlot(state.modal.id, i.id)}
                    />
                  </ListGroup.Item>
                );
              })}
            </>
          )}

          {active == "onHold" && (
            <>
              <h4>Reservations </h4>
              {onHoldSlots.map((i) => {
                return (
                  <ListGroup.Item key={i.id}>
                    <OnHoldCard
                      accept={() => {
                        setGhostCounter(ghostCounter + 1);
                        acceptSlot(state.modal.id, i.id);
                      }}
                      reject={() => {
                        setGhostCounter(ghostCounter + 1),
                          rejectSlot(state.modal.id, i.id);
                      }}
                      date={getDateFromId(state.modal.id)}
                      time={{ hour: i.hour, minute: i.minute }}
                      info={i.info}
                    />
                  </ListGroup.Item>
                );
              })}
            </>
          )}
          {active == "booked" && (
            <>
              <h4>Bookings </h4>
              {bookedSlots.map((i) => {
                return (
                  <ListGroup.Item key={i.id}>
                    {" "}
                    <ReservedCard
                      date={getDateFromId(state.modal.id)}
                      time={{ hour: i.hour, minute: i.minute }}
                      info={i.info}
                    />
                  </ListGroup.Item>
                );
              })}
            </>
          )}
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

export default ModalAdvisor;
