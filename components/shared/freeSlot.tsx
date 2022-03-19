import numberZeroAdder from "@helpers/numberZeroAdder";
import React from "react";
import { ListGroupItem } from "react-bootstrap";

interface FreeSlotProps {
  //   slotId: string;
  //   dayId: string;
  minute: number;
  hour: number;
  deleteSlot: () => void;
}
const FreeSlot: React.FC<FreeSlotProps> = (props) => {
  return (
    <div className="d-flex">
      <span>
        {numberZeroAdder(props.hour)} : {numberZeroAdder(props.minute)}
      </span>
      <span className="flex-grow-1"></span>

      <button
        type="button"
        onClick={props.deleteSlot}
        className="btn-close btn-sm text-center "
        aria-label="Close"
      ></button>
    </div>
  );
};

export default FreeSlot;
