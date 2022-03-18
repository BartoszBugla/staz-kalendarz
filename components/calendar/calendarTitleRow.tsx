import React from "react";
import { Row, Col } from "react-bootstrap";
import days from "../../files/days.json";
interface CalendarTitleRowProps {}

const CalendarTitleRow: React.FC<CalendarTitleRowProps> = () => {
  return (
    <Row className="weekdays-row text-mute g-0">
      {days.map((item) => {
        return <Col key={item.en.short}>{item.en.short}</Col>;
      })}
    </Row>
  );
};

export default CalendarTitleRow;
