import React, { Children } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useCalendar } from "../../context/CalendarContext";
import { useForms } from "../../hooks/useForm";
import type { Info } from "../../types";
interface UserFormProps {
  slotId: string;
  inputs: { name: string; description: string; email: string; second: string };
  handleInputChange: () => void;
  handleSubmit: (e: any) => void;
}
const UserForm: React.FC<UserFormProps> = (props) => {
  return (
    <Form className="p-2" onSubmit={props.handleSubmit}>
      {props.children}
      <div className="d-flex">
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            name="name"
            onChange={props.handleInputChange}
            value={props.inputs.name}
            size="sm"
            placeholder="Jan"
            maxLength={64}
          />
        </Form.Group>

        <Form.Group controlId="formBasicSecondName">
          <Form.Label>Second name</Form.Label>
          <Form.Control
            maxLength={64}
            required
            name="second"
            onChange={props.handleInputChange}
            value={props.inputs.second}
            size="sm"
            placeholder="Kowalski"
          />
        </Form.Group>
      </div>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          maxLength={64}
          required
          name="email"
          type="email"
          onChange={props.handleInputChange}
          value={props.inputs.email}
          size="sm"
          placeholder="kowalski.jan@gmail.com "
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Short description</Form.Label>
        <Form.Control
          required
          name="description"
          onChange={props.handleInputChange}
          value={props.inputs.description}
          size="sm"
          as="textarea"
          maxLength={200}
          placeholder="kradziez..."
        />
        <Form.Text>Limit is 200 letters</Form.Text>
      </Form.Group>

      <Button type="submit" className="w-100">
        Send
      </Button>
    </Form>
  );
};

export default UserForm;
