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
    case "ADD_SLOT": {
      const { hour, minute, dayId } = action.payload;
      const id = `${dayId}_${hour}:${minute}`;
      let newArray = [];

      if (state.slots[dayId]) {
        newArray = [
          ...state.slots[dayId],
          {
            id: id,
            onHold: false,
            available: true,
            hour,
            minute,
            date: dayId,
          },
        ];
        const merged = [...state.slots[dayId], ...newArray];

        const unique = merged.filter((value, index, self) => {
          return self.findIndex((i) => i.id == value.id) == index;
        });
        state.slots[dayId] = unique;
      } else {
        newArray = [
          {
            id: id,
            onHold: false,
            available: true,
            hour,
            minute,
            date: dayId,
          },
        ];
        return { ...state, slots: { ...state.slots, [dayId]: newArray } };
      }

      return state;
    }
    case "ADD_FREE_SLOTS": {
      const items = action.payload;
      const days = state.state.checked;
      let newSlots = {};
      console.log(days);
      for (const date of days) {
        const newArray: Slot[] = items.map((pItem): Slot => {
          //generating new global id
          //item dayId -  rest is slot indetifer
          const id = `${date}_${pItem.hour}:${pItem.minute}`;
          return {
            id: id,
            onHold: false,
            available: true,
            hour: pItem.hour,
            minute: pItem.minute,
            date: date,
          };
        });
        //if day exist in the json
        if (state.slots[date]) {
          const merged = [...state.slots[date], ...newArray];

          const unique = merged.filter((value, index, self) => {
            return self.findIndex((i) => i.id == value.id) == index;
          });
          newSlots = { ...newSlots, [date]: unique };
        } else {
          newSlots = {
            ...newSlots,
            [date]: newArray,
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
        return i.id == slotId;
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
        return i.id == slotId;
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
      return {
        ...state,
        slots: { ...state.slots, [dayId]: [...state.slots[dayId]] },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
