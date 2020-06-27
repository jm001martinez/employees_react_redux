import React from "react";
import { Row, Col } from "react-bootstrap";
import FormComponent from "../Components/Form";
import { CREATE_MODE_FORM } from "../Constants/Constants";

export default function New(props) {

  return (
    <>
      <Row>
        <Col xs={12} md={8}>
          <h1 className="text-center">Empleados</h1>
          <FormComponent mode={CREATE_MODE_FORM} />
        </Col>
      </Row>
    </>
  );
}
