import React, { useState, useEffect } from "react";
import { Row, Col, Button, Jumbotron, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import EmployeesListComponent from "../Components/EmployeesList";

export default function Home(props) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://datos.gob.es/apidata/nti/territory/Province?_sort=label&_pageSize=10&_page=0`
        );
        const json = await res.json();
        console.log(json);
        setResult(json);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, []);

  // todo:
  // Que el número de cédula, Inss y correo de los empleados sean únicos.
  // El objeto de usuario se tiene que deducir de los datos brindados anteriormente

  const _renderData = () => {
    if (!loading || result) {
      return (
        <Jumbotron>
          <h1>{result?.format}</h1>
          <p>Información de la api</p>
          {result.result.items.map((item, index) => (
            <small key={index}>{item.label}, </small>
          ))}

          <p style={{ marginTop: 20 }}>
            <Link to={`${result?.result?._about}`}>
              <Button variant="primary">Saber más</Button>
            </Link>
          </p>
        </Jumbotron>
      );
    }
  };

  return (
    <>
      {_renderData()}
      <Row>
        <Col xs={8} md={8}>
          <h1 className="text-center">Empleados</h1>
        </Col>
        <Col xs={4} md={4}>
          <Button variant="outline-primary">
            <Link to="/nuevo">Nuevo</Link>
          </Button>
        </Col>
      </Row>
      <EmployeesListComponent />
    </>
  );
}
