import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import EmployeesListComponent from "../Components/EmployeesList";

export default function Home(props) {
  return (
    <>
      <Row>
        <Col xs={6} md={6}>
          <h1 className="text-center">Empleados</h1>
        </Col>
        <Col xs={2} md={2}>
          <Button variant="outline-primary">
            <Link to="/nuevo">Nuevo</Link>
          </Button>
        </Col>
      </Row>
      <EmployeesListComponent />
    </>
  );
}
