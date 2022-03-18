export interface CalendarContextType {
  logged: boolean;
  state: State;
  modal: Modal;
  slots: Slots;
}
export type Slots = { [key: string]: Slot[] };
export interface Slot {
  id: string;
  date: string;
  hour: number;
  minute: number;
  onHold: boolean;
  available: boolean;
  info?: Info;
}
export type Info = {
  name: string;
  second: string;
  email: string;
  description: string;
};
interface State {
  month: number;
  year: number;
  firstDay: number;
  isChoosing: boolean;
  checked: string[];
}
interface Modal {
  isOpened: false;
  id: string;
  type: "choose" | "single-client" | "single-advisor" | "onHold";
}
