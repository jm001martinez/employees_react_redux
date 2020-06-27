import React from 'react'; 
import moment from "moment";

export const getId = () => {
    return Math.round(Math.abs(Math.random()) * (1000 - 1) + 1);
  
}
export const getBirthDay = (identification) => {
  const string = identification.split("-")[1];
  const day = string.substring(0, 2);
  const month = string.substring(2, 4);
  const _year = string.substring(4, 6);

  // validate if this was born before 2000
  let year;
  let current_year = new Date().getFullYear().toString().substring(2, 4);

  if (_year < parseInt(current_year)) year = `20${_year}`;
  else year = `19${_year}`;

  return `${day}/${month}/${year}`
};

export const isValidEmail = (value) => {
  const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
  return emailPattern.test(value);
};

export const isValidIdentification = (value) => {
  return true;
};

export const isValidInss = (value) => {
  return true;
};
