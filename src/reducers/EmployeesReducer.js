import {
  STATE_ADD_EMPLOYEE,
  STATE_UPDATE_EMPLOYEE,
  STATE_DELETE_EMPLOYEE,
} from "../Constants/Constants";

const initialState = {
  state_employees_list: [],
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case STATE_ADD_EMPLOYEE:
      return {
        ...state,
        state_employees_list: [...state.state_employees_list, actions.payload],
      };

    case STATE_UPDATE_EMPLOYEE:
      return {
        ...state,
        state_employees_list: actions.payload
      };
      
    case STATE_DELETE_EMPLOYEE:
      return {
        ...state,
        state_employees_list: state.state_employees_list.filter(employee => employee.id !== actions.payload)
      }

    default:
      return state;
  }
}
