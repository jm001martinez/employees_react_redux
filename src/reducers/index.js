import { combineReducers } from "redux";
import ModalReducer from "./ModalReducer";
import ValidationsReducer from "./ValidationsReducer";
import EmployeesReducer from "./EmployeesReducer";

export default combineReducers({
  modals: ModalReducer,
  validations: ValidationsReducer,
  employees: EmployeesReducer,
});
