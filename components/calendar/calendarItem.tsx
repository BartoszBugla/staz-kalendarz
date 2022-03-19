import React, { useEffect, useState } from "react";
import { Col, FormCheck, Form } from "react-bootstrap";
import { useCalendar } from "../../context/CalendarContext";
import CircleList from "./circleList";
interface CalendarItemProps {
  isEmpty?: false;
  isCurrentDay: boolean;
  day: number;
  year: number;
  month: number;
  id: string;
  checked: boolean;
  freeSlotsCount: number;
  onHoldCount: number;
  active: boolean;
  bookedCount: number;
}
interface none {
  isEmpty: true;
}
const style = {
  minHeight: "100%",
  height: "6rem",
};
const CalendarItem: React.FC<CalendarItemProps | none> = (props) => {
  //puste pole
  if (props.isEmpty) {
    return (
      <Col>
        <div style={style} className="border p-2"></div>
      </Col>
    );
  }
  //przeszle pole
  if (!props.active) {
    return (
      <Col>
        <div style={style} className="border p-2 text-muted opacity-50 ">
          {props.day}
        </div>
      </Col>
    );
  }
  //
  const [state, { check, openModalSingle, openModalSingleAdvisor }] =
    useCalendar();

  const handleClick = () => {
    if (state.state.isChoosing) {
      check(props.id);
    } else if (!state.logged && props.freeSlotsCount > 0) {
      openModalSingle(props.id);
    } else if (
      state.logged &&
      (props.freeSlotsCount > 0 ||
        props.bookedCount > 0 ||
        props.onHoldCount > 0)
    ) {
      openModalSingleAdvisor(props.id);
    }
  };
  const handleChange = () => {};
  return (
    <Col
      style={{
        backgroundColor:
          props.freeSlotsCount > 0 ? "rgba(133, 200, 138,0.75)" : "",
        border: props.isCurrentDay ? "1px solid black" : "",
        position: "relative",
      }}
      className="pointer"
    >
      <div style={style} className="border p-2 " onClick={handleClick}>
        {props.day}

        {props.day && state.state.isChoosing && (
          <Form.Check
            type={"checkbox"}
            id={`default-checkbox`}
            checked={props.checked}
            onChange={handleChange}
            style={{
              position: "absolute",
              right: "0.4rem",
              top: "0.4rem",
            }}
          />
        )}
        <CircleList
          free={props.freeSlotsCount}
          booked={props.bookedCount}
          onHold={props.onHoldCount}
        />
      </div>
    </Col>
  );
};

export default CalendarItem;
