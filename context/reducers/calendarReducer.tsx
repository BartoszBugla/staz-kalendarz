import { CalendarContextType, Slot, Slots } from "../../types";
import advisor_slots from "../../files/advisor_slots.json";
import free_slots from "../../files/free_slots.json";
const reducer = (state: CalendarContextType, action: any) => {
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
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpened: true,
          type: action.payload.type,
          id: action.payload.id,
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
      const payload = action.payload;
      const days = state.state.checked;
      let newSlots = {};
      for (const item of days) {
        const newArray: Slot[] = payload.map((pItem: Slot): Slot => {
          const id = `${item}-${pItem.hour}:${pItem.minute}`;
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
      const found = state.slots[action.payload.day].findIndex((i) => {
        return i.id == action.payload.timeId;
      });
      if (found < 0) {
        let bug: never;
        console.error("should not be here");
      }
      const newState: Slot = {
        ...state.slots[action.payload.day][found],
        available: false,
        onHold: true,
        info: {
          description: action.payload.description,
          name: action.payload.name,
          second: action.payload.name,
          email: action.payload.email,
        },
      };
      state.slots[action.payload.day][found] = newState;
      return state;
    }
    case "DELETE_SLOT": {
      const newArray = state.slots[action.payload.day].filter((i) => {
        return i.id != action.payload.id;
      });
      return {
        ...state,
        slots: { ...state.slots, [action.payload.day]: newArray },
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
      // const found = state.slots[action.payload.day].find();
      return state;
    }
    case "SLOT_REJECT": {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
