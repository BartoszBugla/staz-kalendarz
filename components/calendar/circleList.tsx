import Circle from "@components/shared/circle";
import React from "react";
import { Container, Stack, Row, Col } from "react-bootstrap";

interface CircleListProps {
  free: number;
  booked: number;
  onHold: number;
}

const CircleList: React.FC<CircleListProps> = (props) => {
  return (
    <Container style={{ bottom: "0.4rem" }} className="position-absolute" fluid>
      <Row>
        {props.free > 0 && (
          <Col sm={1}>
            <Circle count={props.free} color="green" />
          </Col>
        )}
        {props.onHold > 0 && (
          <Col sm={1}>
            <Circle count={props.onHold} color="orange" />
          </Col>
        )}
        {props.booked > 0 && (
          <Col sm={1}>
            <Circle count={props.booked} color="red" />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CircleList;
