import type { Slots } from "../types";
//returns object without unneccesary items
export const getAllOnHold = (slots: Slots): Slots => {
  let newObject: Slots = {};

  for (const i in slots) {
    const newItems = slots[i].filter((i) => {
      return i.onHold == true;
    });
    if (newItems.length > 0) {
      newObject = { ...newObject, [i]: newItems };
    }
  }
  return newObject;
};
export const getOnHoldDay = (slots: Slots, id: string) => {
  return slots[id].filter((i) => {
    return i.onHold == true;
  });
};

export const getAllBooked = (slots: Slots) => {
  let newObject: Slots = {};

  for (const i in slots) {
    const newItems = slots[i].filter((i) => {
      return i.available == false && i.onHold == false;
    });
    if (newItems.length > 0) {
      newObject = { ...newObject, [i]: newItems };
    }
  }
  return newObject;
};

export const getBookedDay = (slots: Slots, dayId: string) => {
  return slots[dayId].filter((i) => {
    return i.available == false && i.onHold == false;
  });
};
export const getFreeSlotsDay = (slots: Slots, dayId: string) => {
  return slots[dayId].filter((i) => {
    return i.available == true;
  });
};
export const getAllFreeSlots = (slots: Slots, dayId: string) => {
  let newObject: Slots = {};

  for (const i in slots) {
    const newItems = slots[i].filter((i) => {
      return i.available == true;
    });
    if (newItems.length > 0) {
      newObject = { ...newObject, [i]: newItems };
    }
  }
  return newObject;
};
