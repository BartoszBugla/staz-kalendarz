import numberZeroAdder from "@helpers/numberZeroAdder";
import { Info } from "../../types";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useCalendar } from "@context/CalendarContext";
interface IProps {
  info?: Info;
  reject: () => void;
  accept: () => void;
  date: {
    month: number;
    day: number;
    year: number;
  };
  time: { hour: number; minute: number };
  // dayId: string;
  // slotId: string;
}
const OnHoldCard: React.FC<IProps> = (props) => {
  const [show, setShow] = useState(true);

  if (!show) {
    return <div></div>;
  }
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {numberZeroAdder(props.time.hour)}:
          {numberZeroAdder(props.time.minute)}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.info!.name} {props.info!.second}{" "}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {" "}
          {props.info!.email}
        </Card.Subtitle>
        <Card.Text>{props.info!.description}</Card.Text>

        <Button
          size="sm"
          variant="secondary "
          onClick={() => {
            props.reject();
            setShow(false);
          }}
          className="mx-2"
        >
          Reject
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            props.accept();
            setShow(false);
          }}
          className="mx-2"
          size="sm"
        >
          Accept
        </Button>
      </Card.Body>
    </Card>
  );
};

export default OnHoldCard;
