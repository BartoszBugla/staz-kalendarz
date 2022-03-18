import React from "react";

interface SlotProps {
  hour: number;
  minute: number;
}
const Slot: React.FC<SlotProps> = (props) => {
  return (
    <div className="w-100 border rounded p-1 d-flex">
      <span>
        {props.hour}:{props.minute}
      </span>
      <span className="flex-grow-1"></span>
      <span onClick={() => {}} className="pointer">
        X
      </span>
    </div>
  );
};

export default Slot;
