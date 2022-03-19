import numberZeroAdder from "@helpers/numberZeroAdder";
import React from "react";
import { Button, Card } from "react-bootstrap";
import type { Info } from "../../types";
interface ReservedCardProps {
  info?: Info;
  date: {
    month: number;
    day: number;
    year: number;
  };
  time: { hour: number; minute: number };
}
const ReservedCard: React.FC<ReservedCardProps> = (props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {numberZeroAdder(props.time.hour)}:
          {numberZeroAdder(props.time.minute)}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.info!.name} {props!.info!.second}{" "}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {" "}
          {props.info!.email}
        </Card.Subtitle>
        <Card.Text>{props.info!.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ReservedCard;
