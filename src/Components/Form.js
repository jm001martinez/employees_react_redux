import React, { useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import moment from "moment";
import MaskedField from "react-masked-field";
import {
  getId,
  getBirthDay,
  isValidEmail,
  isValidInss,
  isValidIdentification,
  exist,
} from "../Utils/Validations";

//  REDUX
import { useDispatch, useSelector } from "react-redux";
import { validationsFormErrorAction } from "../actions/ValidationsActions";
import {
  employeesAddActions,
  employeeUpdateActions,
} from "../actions/EmployeesListActions";
import {
  STATUS_ERROR,
  STATUS_SUCCESS,
  UPDATE_MODE_FORM,
  VERIFY_UNIQUE_ID_VALUE,
  VERIFY_UNIQUE_EMAIL_VALUE,
  VERIFY_UNIQUE_INSS_VALUE,
} from "../Constants/Constants";
import { useHistory } from "react-router-dom";

export default function FormComponent(props) {
  const history = useHistory();
  const { mode, id } = props;

  const [message, setMessage] = React.useState("");
  const [employeeEdit, setEmployeeEdit] = React.useState(null);
  const [showAlert, setShowAlert] = React.useState(false);
  const [editionMode, setEditionMode] = React.useState(false);

  const [formValue, setFormaValue] = React.useState({
    name: "",
    lastname: "",
    email: "",
    identification: "",
    inss: "",
    birthday: "",
  });

  //  Dispatch
  const dispatch = useDispatch();
  const employeeCreate = (state) => dispatch(employeesAddActions(state));
  const employeeUpdate = (state) => dispatch(employeeUpdateActions(state));
  const validationsFormError = (state) =>
    dispatch(validationsFormErrorAction(state));

  const isError = useSelector((state) => state.validations.state_form_error);
  const employees = useSelector(
    (state) => state.employees.state_employees_list
  );

  useEffect(() => {
    if (mode === UPDATE_MODE_FORM) {
      setEditionMode(true);
      const _employee = employees.find((employee) => employee.id == id);
      setEmployeeEdit(_employee);
      setFormaValue({
        name: _employee.name,
        lastname: _employee.lastname,
        email: _employee.email,
        identification: _employee.identification,
        inss: _employee.inss,
        birthday: _employee.birthday,
      });
    }
  }, [mode]);

  const onSave = () => {
    const { name, lastname, email, identification, inss } = formValue;

    if (mode === UPDATE_MODE_FORM) {
      const data = {
        id: editionMode ? employeeEdit.id : getId(),
        name: name,
        lastname: lastname,
        email: email,
        identification: identification.replace(/_/g, ""),
        inss: inss.replace(/_/g, ""),
        birthday: getBirthDay(identification),
        created: editionMode
          ? employeeEdit.created
          : moment().format("DD/MM/YYYY"),
      };

      const position = employees.findIndex(
        (employee) => employee.id == employeeEdit.id
      );
      employees.splice(position, 1, data);
      employeeUpdate(employees);
    } else {
      const employee = {
        id: getId(),
        name: name,
        lastname: lastname,
        email: email,
        identification: identification.replace(/_/g, ""),
        inss: inss.replace(/_/g, ""),
        birthday: getBirthDay(identification),
        created: moment().format("DD/MM-YYYY"),
      };
      employeeCreate(employee);
    }
    history.push("/");
  };

  const onChange = ($event) => {
    setFormaValue({
      ...formValue,
      [$event.target.name]: $event.target.value,
    });
  };

  const onSubmit = ($event) => {
    $event.preventDefault();
    setFormaValue({
      ...formValue,
      [$event.target.name]: $event.target.value,
    });

    const setErrorMessage = (_message, _status) => {
      validationsFormError(_status);
      setMessage(_message);
      setShowAlert(true);
    };

    const { name, lastname, email, identification, inss } = formValue;
    if (
      name === "" ||
      lastname === "" ||
      identification === "" ||
      inss === ""
    ) {
      setErrorMessage("Todos los campos son obligatorios.", STATUS_ERROR);
    } else {
      if (email === "" || !isValidEmail(email)) {
        setErrorMessage(
          "Verifique si la dirección de correo es válida.",
          STATUS_ERROR
        );
      } else {
        if (
          exist(
            editionMode ? employeeEdit : formValue,
            VERIFY_UNIQUE_EMAIL_VALUE,
            employees,
            editionMode
          )
        ) {
          setErrorMessage(
            "El correo que intenta ingresar, ya está registrado.",
            STATUS_ERROR
          );
        } else {
          if (!isValidIdentification(identification)) {
            setErrorMessage(
              "Ingrese un número de cédula válido.",
              STATUS_ERROR
            );
          } else {
            if (
              exist(
                editionMode ? employeeEdit : formValue,
                VERIFY_UNIQUE_ID_VALUE,
                employees,
                editionMode
              )
            ) {
              setErrorMessage(
                "El número de cédula que intenta ingresar, ya está registrado.",
                STATUS_ERROR
              );
            } else {
              if (!isValidInss(inss)) {
                setErrorMessage("Ingrese un número inss válido.", STATUS_ERROR);
              } else {
                if (
                  exist(
                    editionMode ? employeeEdit : formValue,
                    VERIFY_UNIQUE_INSS_VALUE,
                    employees,
                    editionMode
                  )
                ) {
                  setErrorMessage(
                    "El número INSS que intenta ingresar, ya está registrado.",
                    STATUS_ERROR
                  );
                } else {
                  /**
                   * validations ready,  save data in storage
                   */
                  setErrorMessage("", STATUS_SUCCESS);
                  onSave();
                }
              }
            }
          }
        }
      }
    }
  };

  return (
    <Form className="m-3" onChange={onChange} onSubmit={onSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          name="name"
          placeholder="Nombres"
          defaultValue={formValue.name}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          name="lastname"
          placeholder="Apellidos"
          defaultValue={formValue.lastname}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="email"
          name="email"
          placeholder="Correo electrónico"
          defaultValue={formValue.email}
        />
      </Form.Group>

      <Form.Group>
        <MaskedField
          mask="999-999999-9999a"
          placeholder="Cedula de identidad"
          name="identification"
          className="inputformcontrol"
          value={formValue.identification}
        />
      </Form.Group>

      <Form.Group>
        <MaskedField
          mask="9999999-9"
          placeholder="Número INSS"
          name="inss"
          className="inputformcontrol"
          value={formValue.inss}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Guardar
      </Button>

      {isError && showAlert && (
        <Alert
          variant="danger"
          className="mt-4"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {message}
        </Alert>
      )}
    </Form>
  );
}

/** 
    ○ Nombres.
    ○ Apellidos.
    ○ Correo.
    ○ Cédula (Formato: 000-000000-0000Y).
    ○ Número INSS.
    ○ Fecha de nacimiento (Se tiene que extraer de la cédula).
 */
