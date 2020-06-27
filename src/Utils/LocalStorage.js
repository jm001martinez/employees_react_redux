import { EMPLOYEES_LIST_STORAGE } from "../Constants/Constants";

export const getStateLocalStorage = () => {
  const employees_list_storage = localStorage.getItem(EMPLOYEES_LIST_STORAGE);
  if (employees_list_storage == null) return undefined;
  return JSON.parse(employees_list_storage);
};

export const setStateLocalStorage = (state) => {
    localStorage.setItem(EMPLOYEES_LIST_STORAGE, JSON.stringify(state))
}
