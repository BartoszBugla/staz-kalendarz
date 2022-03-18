import React from "react";
import { Container } from "react-bootstrap";
import { useCalendar } from "../../context/CalendarContext";
import ChangeMonthButton from "./changeMonthButton";
import months from "../../files/months.json";
interface CalendarHeaderProps {
  month: number;
  year: number;
}
const CalendarHeader: React.FC<CalendarHeaderProps> = (props) => {
  const [state, { nextMonth, previousMonth }] = useCalendar();

  return (
    <Container>
      <div className=" text-center d-flex  mt-2">
        <ChangeMonthButton onClick={previousMonth}> Previous</ChangeMonthButton>

        <h3 className="flex-grow-1 p-2 ">
          {months[props.month].en} {props.year}
        </h3>
        <ChangeMonthButton onClick={nextMonth}> Next</ChangeMonthButton>
      </div>
    </Container>
  );
};

export default CalendarHeader;
