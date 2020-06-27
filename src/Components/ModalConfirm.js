import React from "react";
import { Modal, Button } from "react-bootstrap";

//  REDUX
import { useDispatch, useSelector } from "react-redux";
import { openCloseModalConfirmAction } from "../actions/ModalActions";
import { employeeDeleteActions } from "../actions/EmployeesListActions";

export default function ModalConfirmComponent(props) {
  const { employee, isOpen, setOnHide } = props;
  console.log('Modal Confirm, employee props: \n', employee);

  const dispatch = useDispatch();

  const remove = (id) => {
    dispatch(employeeDeleteActions(id));
    setOnHide();
  }

  return (
    <Modal
      show={isOpen}
      onHide={() => setOnHide()}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Eliminar Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center">¿Está seguro que desea eliminar empleado <br/> <strong>{employee?.name} <small>{employee?.lastname}</small></strong>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setOnHide()}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => remove(employee.id)}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
