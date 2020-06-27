import React, { useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import moment from "moment";
import MaskedField from "react-masked-field";
import {
  getId,
  getBirthDay,
  isValidEmail,
  isValidInss,
  isValidIdentification,
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
} from "../Constants/Constants";
import { openCloseModalAction } from "../actions/ModalActions";
import { Redirect, useHistory } from "react-router-dom";

export default function FormComponent(props) {
  const history = useHistory();
  const { mode, id } = props;

  const [message, setMessage] = React.useState("");
  const [employeeEdit, setEmployeeEdit] = React.useState(null);

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
        id: mode === UPDATE_MODE_FORM ? employeeEdit.id : getId(),
        name: name,
        lastname: lastname,
        email: email,
        identification: identification,
        inss: inss,
        birthday: getBirthDay(identification),
        created:
          mode === UPDATE_MODE_FORM
            ? employeeEdit.created
            : moment().format("DD/MM/YYYY"),
      };

      const position = employees.findIndex((employee) => employee.id == id);
      employees.splice(position, 1, data);
      employeeUpdate(employees);
    } else {
      const employee = {
        id: getId(),
        name: name,
        lastname: lastname,
        email: email,
        identification: identification,
        inss: inss,
        birthday: getBirthDay(identification),
        created: moment().format("DD/MM-YYYY"),
      };
      console.log("\n\nEmpleado a editar:\n", employee);
      employeeCreate(employee);
      history.push("/");
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
    };

    const { name, lastname, email, identification, inss } = formValue;
    if (name == "" || lastname == "" || identification == "" || inss == "") {
      setErrorMessage("Todos los campos son obligatorios.", STATUS_ERROR);
    } else {
      if (email == "" || !isValidEmail(email)) {
        setErrorMessage(
          "Verifique si la dirección de correo es válida.",
          STATUS_ERROR
        );
      } else {
        if (!isValidIdentification(identification)) {
          setErrorMessage("Ingrese un número de cédula válido.", STATUS_ERROR);
        } else {
          if (!isValidInss(inss)) {
            setErrorMessage("ingrese un número inss válido.", STATUS_ERROR);
          } else {
            setErrorMessage("", STATUS_SUCCESS);
            onSave();
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
          value={formValue.name}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          name="lastname"
          placeholder="Apellidos"
          value={formValue.lastname}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formValue.email}
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

      {isError && (
        <Alert variant="danger" className="mt-4">
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
