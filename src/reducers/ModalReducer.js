import { STATE_ADD_MODAL } from "../Constants/Constants";

const initialStateModalAdd = {
  state_modal: false,
};

export default function (state = initialStateModalAdd, actions) {
  switch (actions.type) {
    case STATE_ADD_MODAL:
      return {
        ...state,
        state_add_modal: actions.payload,
      };

    default:
      return state;
  }
}
