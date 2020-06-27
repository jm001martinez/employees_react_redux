import { STATE_ADD_MODAL } from "../Constants/Constants";

export const openCloseModalAction = (state) => {
  return {
    type: STATE_ADD_MODAL,
    payload: state,
  };
};