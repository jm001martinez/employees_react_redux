import React from "react";
import { Row, Col } from "react-bootstrap";
import FormComponent from "../Components/Form";
import { useParams } from "react-router-dom";
import { UPDATE_MODE_FORM } from "../Constants/Constants";

export default function Edit(props) {
  let { id } = useParams();

  return (
    <>
      <Row>
        <Col xs={12} md={8}>
          <h1 className="text-center">Empleados</h1>
          <FormComponent mode={UPDATE_MODE_FORM} id={id} />
        </Col>
      </Row>
    </>
  );
}
