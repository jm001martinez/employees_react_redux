import { createStore } from "redux";
import reducers from "./reducers";
import {
  getStateLocalStorage,
  setStateLocalStorage,
} from "./Utils/LocalStorage";

const stateLocalStorage = getStateLocalStorage();

const store = createStore(
  reducers,
  stateLocalStorage,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  setStateLocalStorage({
    employees: store.getState().employees,
  });
});

export default store;
