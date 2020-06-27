import { combineReducers } from "redux";
import ValidationsReducer from "./ValidationsReducer";
import EmployeesReducer from "./EmployeesReducer";

export default combineReducers({
  validations: ValidationsReducer,
  employees: EmployeesReducer,
});
