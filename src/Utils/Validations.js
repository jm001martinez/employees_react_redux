import {
  VERIFY_UNIQUE_ID_VALUE,
  VERIFY_UNIQUE_INSS_VALUE,
  VERIFY_UNIQUE_EMAIL_VALUE,
  IDENTIFICATION_LENGTH,
  INSS_LENGTH,
} from "../Constants/Constants";

export const getId = () => {
  return Math.round(Math.abs(Math.random()) * (1000 - 1) + 1);
};

export const exist = (formValue, type, collection, editionMode) => {
  let exist = false;

  switch (type) {
    case VERIFY_UNIQUE_EMAIL_VALUE:
      if (collection.length) {
        exist = collection.some((employee) => {
          if (editionMode) {
            return (
              employee.email == formValue.email && employee.id != formValue.id
            );
          } else {
            return employee.email == formValue.email;
          }
        });
      } else {
        return false;
      }
      break;

    case VERIFY_UNIQUE_ID_VALUE:
      if (collection.length) {
        exist = collection.some((employee) => {
          if (editionMode) {
            return (
              employee.identification == formValue.identification &&
              employee.id != formValue.id
            );
          } else {
            return employee.identification == formValue.identification;
          }
        });
      } else {
        return false;
      }
      break;

    case VERIFY_UNIQUE_INSS_VALUE:
      if (collection.length) {
        exist = collection.some((employee) => {
          if (editionMode) {
            return (
              employee.inss == formValue.inss && employee.id != formValue.id
            );
          } else {
            return employee.inss == formValue.inss;
          }
        });
      } else {
        return false;
      }
      break;

    default:
      return exist;
  }

  return exist;
};

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

  return `${day}/${month}/${year}`;
};
export const isValidEmail = (value) => {
  const email = value.replace("_", "");
  const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
  return emailPattern.test(email);
};

export const isValidIdentification = (value) => {
  let identification = value.replace(/_/g, "");
  if (isNumber(identification.substring(identification.length - 1)))
    identification = identification.substring(0, identification.length - 1);

  return identification.length === IDENTIFICATION_LENGTH;
};

export const isValidInss = (value) => {
  let inss = value.replace(/_/g, "");
  if (inss.length == INSS_LENGTH + 1) inss = inss.substring(0, inss.length - 1);

  return inss.length === INSS_LENGTH;
};

const isNumber = (n) => {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
};
