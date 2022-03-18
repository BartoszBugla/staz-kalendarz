import { CalendarContextType, Slot, Slots } from "../../types";
import advisor_slots from "../../files/advisor_slots.json";
import free_slots from "../../files/free_slots.json";
import type { Actions } from "../../types/calendarActions";
const reducer = (state: CalendarContextType, action: Actions) => {
  switch (action.type) {
    case "CHANGE_MONTH": {
      const increaser = action.payload;
      const { month, year } = state.state;
      let newMonth: number;
      let newYear: number;
      if (month + increaser > 11) {
        newMonth = 0;
        newYear = year + 1;
      } else if (month + increaser < 0) {
        newMonth = 11;
        newYear = year - 1;
      } else {
        newMonth = month + increaser;
        newYear = year;
      }

      return {
        ...state,
        state: {
          ...state.state,
          month: newMonth,
          year: newYear,
        },
      };
    }

    case "OPEN_MODAL": {
      const { id, type } = action.payload;
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpened: true,
          type,
          id: id ? id : "",
        },
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpened: false,
          type: "",
          id: "",
        },
      };
    }
    case "CHECK": {
      const include = state.state.checked.includes(action.payload);
      let newArray = [...state.state.checked, action.payload];
      if (include) {
        newArray = state.state.checked.filter((i) => i != action.payload);
      }

      return {
        ...state,
        state: {
          ...state.state,
          checked: newArray,
        },
      };
    }

    case "ADD_FREE_SLOTS": {
      const items = action.payload;
      const days = state.state.checked;
      let newSlots = {};
      for (const item of days) {
        const newArray: Slot[] = items.map((pItem): Slot => {
          //generating new global id
          //item dayId -  rest is slot indetifer
          const id = `${item}_${pItem.hour}:${pItem.minute}`;
          return {
            id: id,
            onHold: false,
            available: true,
            hour: pItem.hour,
            minute: pItem.minute,
            date: item,
          };
        });

        //if day exist in the json
        if (state.slots[item]) {
          // const merged = [...state.slots[item], ...newArray];
          // const unique = merged.filter((i, index) => {
          //   return (
          //     merged.findIndex((j) => {
          //       j.id == i.id;
          //     }) == index
          //   );
          // });
          newSlots = {
            ...newSlots,

            [item]: [...state.slots[item], ...newArray],
          };
          //else create new
        } else {
          newSlots = {
            ...newSlots,
            [item]: newArray,
          };
        }
      }

      return { ...state, slots: { ...state.slots, ...newSlots } };
    }
    case "CLEAR_SLOTS": {
      state.state.checked.forEach((id) => {
        delete state.slots[id];
      });
    }
    case "CLEAR_CHECKED": {
      return {
        ...state,
        state: { ...state.state, checked: [], isChoosing: false },
      };
    }

    case "CHOOSE_START": {
      return {
        ...state,
        state: {
          ...state.state,
          isChoosing: true,
        },
      };
    }
    case "CHOOSE_CANCEL": {
      return {
        ...state,
        state: {
          ...state.state,
          isChoosing: false,
        },
      };
    }
    case "BOOK": {
      const { slotId, dayId, name, second, email, description } =
        action.payload;
      const found = state.slots[dayId].findIndex((i) => {
        return i.id == slotId;
      });
      if (found < 0) {
        let bug: never;
        console.error("should not be here");
      }
      const newState: Slot = {
        ...state.slots[dayId][found],
        available: false,
        onHold: true,
        info: {
          description,
          name,
          second,
          email,
        },
      };
      state.slots[action.payload.dayId][found] = newState;
      return state;
    }
    case "DELETE_SLOT": {
      const { dayId, slotId } = action.payload;
      const newArray = state.slots[action.payload.dayId].filter((i) => {
        return i.id != slotId;
      });
      return {
        ...state,
        slots: { ...state.slots, [dayId]: newArray },
      };
    }
    case "ADVISOR_INIT": {
      return {
        ...state,
        slots: { ...state.slots, ...advisor_slots },
      };
    }
    case "CLIENT_INIT": {
      return {
        ...state,
        slots: { ...state.slots, ...free_slots },
      };
    }
    case "SWITCH_LOGGED": {
      return { ...state, logged: !state.logged };
    }
    case "SLOT_ACCEPT": {
      const dayId = action.payload.dayId;
      const slotId = action.payload.slotId;
      const found = state.slots[dayId].findIndex((i) => {
        return i.id, slotId;
      });
      if (found < 0) {
        console.log("some kind of error with SLOT_ACCEPT");
        return state;
      }
      state.slots[dayId][found] = {
        ...state.slots[dayId][found],
        available: false,
        onHold: false,
      };
      return state;
    }
    case "SLOT_REJECT": {
      const dayId = action.payload.dayId;
      const slotId = action.payload.slotId;
      const found = state.slots[dayId].findIndex((i) => {
        return i.id, slotId;
      });
      if (found < 0) {
        console.log("some kind of error with SLOT_REJECT");
        return state;
      }
      state.slots[dayId][found] = {
        ...state.slots[dayId][found],
        available: true,
        onHold: false,
        info: {
          name: "",
          second: "",
          email: "",
          description: "",
        },
      };
      return state;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
