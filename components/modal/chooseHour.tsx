import numberZeroAdder from "@helpers/numberZeroAdder";
import React from "react";
import { Form, Button } from "react-bootstrap";

interface ChooseHourProps {
  handleChange: (e: any) => void;
  time: {
    hour: number;
    minute: number;
  };
  add: (e: any) => void;
}
const ChooseHour: React.FC<ChooseHourProps> = (props) => {
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
  return (
    <Form>
      <div className="d-flex">
        <Form.Label>
          <span>Hour:</span>
          <Form.Select
            onChange={props.handleChange}
            name="hour"
            value={props.time.hour}
          >
            {generateSelect(1, 24)}
          </Form.Select>
        </Form.Label>

        <Form.Label>
          <span>Minute:</span>
          <Form.Select
            onChange={props.handleChange}
            name="minute"
            value={props.time.minute}
          >
            {generateSelect(5, 60)}
          </Form.Select>
        </Form.Label>
      </div>
      <Button className="w-100 mt-2" onClick={props.add} variant="primary">
        ADD
      </Button>
      <p className="text-muted text-sm ">
        You can enter particular time only once
      </p>
    </Form>
  );
};

export default ChooseHour;
