import OnHoldCard from "@components/shared/onHoldCard";
import { useCalendar } from "@context/CalendarContext";
import getDateFromId from "@helpers/getDateFromId";
import numberZeroAdder from "@helpers/numberZeroAdder";
import {
  getOnHoldDay,
  getFreeSlotsDay,
  getBookedDay,
} from "@helpers/slotFilters";
import React, { useEffect, useState } from "react";
import { ListGroup, Form, Modal, Button, Navbar, Nav } from "react-bootstrap";
import { useForms } from "../../hooks/useForm";
import ModalContainer from "./modalContainer";

interface ModalClientProps {
  items: any;
}
const ModalClient: React.FC<ModalClientProps> = (props) => {
  const [state, { closeModal, deleteSlot, acceptSlot, rejectSlot }] =
    useCalendar();
  const [active, setActive] = useState("free");
  let onHoldSlots = getOnHoldDay(state.slots, state.modal.id);
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
      <Modal.Header>
        <div onClick={() => setActive("free")}>Free</div>
        <div className="vr"></div>
        <div onClick={() => setActive("onHold")}>On hold</div>
        <div className="vr"></div>
        <div onClick={() => setActive("booked")}>Booked</div>
      </Modal.Header>

      <Modal.Body>
        <ListGroup
          style={{ maxHeight: "15rem", overflowY: "scroll" }}
          variant="flush"
        >
          {active == "free" && (
            <>
              <h4> Free slots</h4>
              {freeSlots.map((i: any) => {
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
            </>
          )}

          {active == "onHold" && (
            <>
              <h4>Reservations </h4>
              {onHoldSlots.map((i) => {
                return (
                  <OnHoldCard
                    accept={() => acceptSlot(state.modal.id, i.id)}
                    reject={() => rejectSlot(state.modal.id, i.id)}
                    date={getDateFromId(state.modal.id)}
                    time={{ hour: i.hour, minute: i.minute }}
                    info={i.info}
                  />
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

export default ModalClient;
