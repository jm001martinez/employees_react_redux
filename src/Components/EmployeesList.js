import React, { useState } from "react";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import ModalConfirmComponent from "./ModalConfirm";
import { Link } from "react-router-dom";

export default function EmployeesListComponent() {
  const employees = useSelector(
    (state) => state.employees.state_employees_list
  );
  const [employee, setEmployee] = useState(null);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);

  const openModalConfirm = (_employee) => {
    setIsOpenModalConfirm(true);
    setEmployee(_employee);
  };

  const closeModalConfirm = () => {
    setIsOpenModalConfirm(false);
  };

  const _renderEmployeesList = () => {
    if (employees) {
      if (employees.length) {
        return (
          <ListGroup variant="flush" className="mt-3">
            {employees.map((employee, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col xs={8} md={8}>
                    <h5>
                      {employee.name} {employee.lastname} 
                    </h5>
                    <p>{employee.email}, <small className="text-primary">{employee.identification}</small>, <small className="text-info">{employee.inss}</small></p>
                  </Col>
                  <Col xs={4} md={4}>
                    <Link to={`/${employee.id}/editar`}>
                      <Button
                        variant="link"
                        size="sm"
                        className="margin-vertical-icon"
                      >
                        Editar
                      </Button>
                    </Link>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      style={{ paddingBottom: 1, paddingTop: 1 }}
                      className="margin-vertical-icon"
                      onClick={() => openModalConfirm(employee)}
                    >
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        );
      } else {
        return (
          <Row>
            <Col xs={8} md={8}>
              <p className="text-center">No hay datos de empleados</p>
            </Col>
          </Row>
        );
      }
    }
  };

  return (
    <>
      <Row>
        <Col xs={12} md={12}>
          {_renderEmployeesList()}
        </Col>
      </Row>
      <ModalConfirmComponent
        isOpen={isOpenModalConfirm}
        setOnHide={closeModalConfirm}
        employee={employee}
      ></ModalConfirmComponent>
    </>
  );
}
