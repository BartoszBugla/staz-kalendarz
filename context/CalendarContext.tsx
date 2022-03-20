import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import reducer from "./reducers/calendarReducer";
import actions from "./actions/Calendar";
import { CalendarContextType } from "../types";
import advisor_slots from "../files/advisor_slots.json";
import free_slots from "../files/free_slots.json";
const calc = () => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const firstDay = new Date(year, month, 0).getDay();
  return { month, year, firstDay };
};
const date = calc();
const initialValue: CalendarContextType = {
  logged: false,
  slots: {},
  state: {
    month: date.month,
    year: date.year,
    firstDay: date.firstDay,
    isChoosing: false,
    checked: [],
  },
  modal: {
    id: "",
    isOpened: false,
    type: "choose",
  },
};
const CalendarContext = createContext<
  [CalendarContextType, React.Dispatch<any>]
>([initialValue, () => {}]);

type Props = {
  children: ReactNode;
};
function init(initialValue: CalendarContextType) {
  return initialValue;
}
export function CalendarContextProvider({ children }: Props) {
  //@ts-ignore
  const [state, dispatch] = useReducer(reducer, initialValue, init);

  return (
    <CalendarContext.Provider value={[state, dispatch]}>
      {children}
    </CalendarContext.Provider>
  );
}
type useCalendarType = [CalendarContextType, ReturnType<typeof actions>];

export function useCalendar(): useCalendarType {
  const [state, dispatch] = useContext(CalendarContext);
  const act = actions(dispatch);
  return [state, { ...act }];
}
