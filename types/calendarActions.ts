import { ModalTypes } from "./";
export type Actions =
  | {
      type: "SLOT_ACCEPT" | "SLOT_REJECT" | "DELETE_SLOT";
      payload: { slotId: string; dayId: string };
    }
  | {
      type:
        | "CLOSE_MODAL"
        | "CLIENT_INIT"
        | "ADVISOR_INIT"
        | "SWITCH_LOGGED"
        | "CHOOSE_CANCEL"
        | "CHOOSE_START"
        | "CLEAR_CHECKED"
        | "CLEAR_SLOTS"
        | "LOGIN"
        | "LOGOUT";
    }
  | {
      type: "CHECK";
      payload: any;
    }
  | {
      type: "CHANGE_MONTH";
      payload: number;
    }
  | {
      type: "ADD_FREE_SLOTS";
      payload: {
        hour: number;
        minute: number;
      }[];
    }
  | {
      type: "BOOK";
      payload: {
        description: string;
        name: string;
        second: string;
        email: string;
        dayId: string;
        slotId: string;
      };
    }
  | {
      type: "ADD_SLOT";
      payload: {
        hour: number;
        minute: number;
        dayId: string;
      };
    }
  | {
      type: "OPEN_MODAL";
      payload: { type: ModalTypes; id?: string };
    };
