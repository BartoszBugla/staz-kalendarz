//here is list of every action
import type { Dispatch } from "react";
import type { Actions } from "../../types/calendarActions";
function actions(dispatch: Dispatch<Actions>) {
  const nextMonth = () => {
    dispatch({
      type: "CHANGE_MONTH",
      payload: +1,
    });
  };

  const previousMonth = () => {
    dispatch({
      type: "CHANGE_MONTH",
      payload: -1,
    });
  };

  const chooseStart = () => {
    dispatch({
      type: "CHOOSE_START",
    });
  };
  const chooseEnd = () => {
    dispatch({
      type: "CHOOSE_START",
    });
    dispatch({ type: "CLEAR_CHECKED" });
  };

  const openModalChoose = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { type: "choose" },
    });
  };
  const openModalSingle = (id: string) => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { type: "single-client", id },
    });
  };
  const openOnHoldModal = () => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { type: "onHold" },
    });
  };
  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL",
    });
  };
  const check = (data: string) => {
    dispatch({
      type: "CHECK",
      payload: data,
    });
  };
  type SlotPayload = {
    hour: number;
    minute: number;
  };

  const addFreeSlots = (data: SlotPayload[]) => {
    dispatch({
      type: "ADD_FREE_SLOTS",
      payload: data,
    });
    dispatch({
      type: "CLOSE_MODAL",
    });
    dispatch({
      type: "CLEAR_CHECKED",
    });
  };
  const clearSlots = () => {
    dispatch({
      type: "CLEAR_SLOTS",
    });
    dispatch({
      type: "CLEAR_CHECKED",
    });
  };
  const init = (isLogged: boolean) => {
    if (isLogged) {
      dispatch({ type: "ADVISOR_INIT" });
    } else {
      dispatch({ type: "CLIENT_INIT" });
    }
  };
  type Book = {
    description: string;
    name: string;
    second: string;
    email: string;
    dayId: string;
    slotId: string;
  };
  const book = (data: Book) => {
    dispatch({
      type: "BOOK",
      payload: data,
    });
    dispatch({
      type: "CLOSE_MODAL",
    });
  };
  const switchLogged = () => {
    dispatch({ type: "SWITCH_LOGGED" });
  };
  const openModalSingleAdvisor = (id: string) => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { type: "single-advisor", id },
    });
  };
  const deleteSlot = (dayId: string, slotId: string) => {
    dispatch({
      type: "DELETE_SLOT",
      payload: { dayId: dayId, slotId },
    });
  };
  const acceptSlot = (dayId: string, slotId: string) => {
    dispatch({
      type: "SLOT_ACCEPT",
      payload: { dayId, slotId },
    });
  };
  const rejectSlot = (dayId: string, slotId: string) => {
    dispatch({
      type: "SLOT_REJECT",
      payload: { dayId, slotId },
    });
  };
  return {
    acceptSlot,
    rejectSlot,
    nextMonth,
    openModalSingleAdvisor,
    book,
    previousMonth,
    dispatchCalendar: dispatch,
    chooseStart,
    chooseEnd,
    openModalSingle,
    openModalChoose,
    openOnHoldModal,
    closeModal,
    check,
    deleteSlot,

    addFreeSlots,
    clearSlots,
    switchLogged,
    init,
  };
}
export default actions;
