import { Modal } from "react-bootstrap";

interface ModalAdvisorProps {}
const bgStyle = {
  backgroundColor: "#000000",
  opacity: "0.9",
  width: "100vw",
  height: "100vh",
};
const ModalContainer: React.FC<ModalAdvisorProps> = ({ children }) => {
  return (
    <>
      <div className="position-fixed top-0 start-0" style={bgStyle}></div>
      <Modal.Dialog
        style={{ padding: "2rem !important" }}
        className="position-fixed top-50 opacity-100 start-50 translate-middle p-4"
      >
        {children}
      </Modal.Dialog>
    </>
  );
};
export default ModalContainer;
