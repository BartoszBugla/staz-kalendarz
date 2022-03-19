import { useCalendar } from "../../context/CalendarContext";
import MultiChoose from "./modalMultiChoose";
import Single from "./modalSingle";
import OnHold from "./modalOnHold";
import SingleAdvisor from "./modalSingleAdvisor";
interface IProps {}
const Modal: React.FC<IProps> = () => {
  const [state] = useCalendar();
  if (state.modal.isOpened) {
    switch (state.modal.type) {
      case "choose": {
        return <MultiChoose />;
      }
      case "onHold": {
        return <OnHold />;
      }
      case "single-client": {
        return <Single />;
      }
      case "single-advisor": {
        return <SingleAdvisor />;
      }
    }
  }

  return <></>;
};
export default Modal;
