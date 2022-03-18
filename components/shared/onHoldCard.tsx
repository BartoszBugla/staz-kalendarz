import numberZeroAdder from "@helpers/numberZeroAdder";
import React from "react";
import { Button, Card } from "react-bootstrap";
interface OnHoldAcceptProps {
  name?: string;
  second?: string;
  email?: string;
  description?: string;
  reject: () => void;
  accept: () => void;
  date: {
    month: number;
    day: number;
    year: number;
  };
  time: { hour: number; minute: number };
}
const OnHoldAccept: React.FC<OnHoldAcceptProps> = (props) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>
          {numberZeroAdder(props.time.hour)}:
          {numberZeroAdder(props.time.minute)}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.name} {props.second}{" "}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {" "}
          {props.email}
        </Card.Subtitle>
        <Card.Text>{props.description}</Card.Text>

        <Button
          size="sm"
          variant="secondary "
          onClick={props.reject}
          className="mx-2"
        >
          Reject
        </Button>
        <Button
          variant="primary"
          onClick={props.accept}
          className="mx-2"
          size="sm"
        >
          Accept
        </Button>
      </Card.Body>
    </Card>
  );
};

export default OnHoldAccept;
