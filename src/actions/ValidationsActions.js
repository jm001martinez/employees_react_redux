import { STATE_FORM_ERROR } from "../Constants/Constants";

export const validationsFormErrorAction = (state) => {
  return {
    type: STATE_FORM_ERROR,
    payload: state,
  };
};
