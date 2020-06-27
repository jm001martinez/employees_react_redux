import { STATE_FORM_ERROR } from "../Constants/Constants";

const initialState = {
  state_form_error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STATE_FORM_ERROR:
      return {
        ...state,
        state_form_error: action.payload,
      };

    default:
      return state;
  }
}
