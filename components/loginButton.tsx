import React from "react";
import { Button } from "react-bootstrap";
import { useCalendar } from "../context/CalendarContext";
interface LoginButtonProps {}
const LoginButton: React.FC<LoginButtonProps> = () => {
  const [state, { switchLogged }] = useCalendar();
  return (
    <Button onClick={switchLogged}>
      {" "}
      {state.logged ? "SIGN OUT" : "SIGN IN"}{" "}
    </Button>
  );
};

export default LoginButton;
