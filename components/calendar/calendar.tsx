import React from "react";
import { Row, Container } from "react-bootstrap";
import TitleRow from "./calendarTitleRow";
import CalendarItem from "./calendarItem";
import CalendarHeader from "./calendarHeader";
import { useCalendar } from "../../context/CalendarContext";
import ButtonsList from "./butttonsList";
import {
  getBookedDay,
  getFreeSlotsDay,
  getOnHoldDay,
} from "@helpers/slotFilters";

interface IProps {}

const Calendar: React.FC<IProps> = () => {
  const [state, { init }] = useCalendar();
  const displayedDate = state.state;
  const firstDay = new Date(
    displayedDate.year,
    displayedDate.month,
    0
  ).getDay();
  const monthLength = new Date(
    displayedDate.year,
    displayedDate.month + 1,
    0
  ).getDate();

  const currentDate = new Date();

  let date = 1;
  const generateRow = (row: number) => {
    const array = [];

    for (let i = 0; i < 7; i++) {
      //empty fields before 1
      if (row === 1 && firstDay > i)
        array.push(<CalendarItem isEmpty key={Math.random()} />);
      //empty fields at the end
      else if (date > monthLength)
        array.push(<CalendarItem isEmpty key={Math.random()} />);
      else {
        //check current day
        let isCurrentDay = false;
        if (
          currentDate.getMonth() == displayedDate.month &&
          currentDate.getDate() == date &&
          currentDate.getFullYear() == displayedDate.year
        ) {
          isCurrentDay = true;
        }
        let id = `${displayedDate.year}-${displayedDate.month}-${date}`;

        let checked = state.state.checked.includes(id);
        let found = Object.keys(state.slots).find((i) => i == id);
        //status
        let freeSlotsCount = 0;
        let onHoldCount = 0;
        let bookedCount = 0;
        if (found) {
          const freeSlots = getFreeSlotsDay(state.slots, id);
          freeSlotsCount = freeSlots.length;
          if (state.logged) {
            const onHoldSlots = getOnHoldDay(state.slots, id);
            onHoldCount = onHoldSlots.length;
            const bookedSlots = getBookedDay(state.slots, id);
            bookedCount = bookedSlots.length;
          }
        }
        let active;
        let milisecondsThis = new Date(
          displayedDate.year,
          displayedDate.month,
          date + 1
        ).getTime();
        let milisecondsCurrent = currentDate.getTime();
        if (milisecondsThis < milisecondsCurrent) {
          active = false;
        } else {
          active = true;
        }

        array.push(
          <CalendarItem
            onHoldCount={onHoldCount}
            freeSlotsCount={freeSlotsCount}
            bookedCount={bookedCount}
            checked={checked}
            isCurrentDay={isCurrentDay}
            day={date}
            month={displayedDate.month}
            year={displayedDate.year}
            key={id}
            id={id}
            active={active}
          />
        );
        date++;
      }
    }
    return array;
  };

  return (
    <>
      <CalendarHeader year={displayedDate.year} month={displayedDate.month} />
      <Container className="position-relative" style={{ padding: "0.5rem" }}>
        <TitleRow />
        <Row className="g-0">{generateRow(1)}</Row>
        <Row className="g-0">{generateRow(2)}</Row>
        <Row className="g-0">{generateRow(3)}</Row>
        <Row className="g-0">{generateRow(4)}</Row>
        <Row className="g-0">{generateRow(5)}</Row>
        <Row className="g-0">{generateRow(6)}</Row>

        <ButtonsList />
      </Container>
    </>
  );
};

export default Calendar;
