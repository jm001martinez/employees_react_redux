import {
  STATE_ADD_EMPLOYEE,
  STATE_DELETE_EMPLOYEE,
  STATE_UPDATE_EMPLOYEE,
} from "../Constants/Constants";

export const employeesAddActions = (state) => {
  return {
    type: STATE_ADD_EMPLOYEE,
    payload: state,
  };
};

export const employeeUpdateActions = (state) => {
  return {
    type: STATE_UPDATE_EMPLOYEE,
    payload: state
  }
}

export const employeeDeleteActions = (state) => {
  return {
    type: STATE_DELETE_EMPLOYEE,
    payload: state
  }
}

