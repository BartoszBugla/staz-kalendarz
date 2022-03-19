import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useCalendar } from "../context/CalendarContext";
interface LoginButtonProps {
  init: boolean;
}
const LoginButton: React.FC<LoginButtonProps> = (props) => {
  const [state, { switchLogged, init }] = useCalendar();
  useEffect(() => {
    init(props.init);
  }, []);
  return (
    <Button onClick={switchLogged}>
      {" "}
      {state.logged ? "SIGN OUT" : "SIGN IN"}{" "}
    </Button>
  );
};

export default LoginButton;
