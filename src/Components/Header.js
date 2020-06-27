import React from "react";
import { Container, Navbar } from "react-bootstrap";

import Logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <img
              src={Logo}
              alt=""
              width="30"
              height="30"
              className="d-inline-block align-top mr-4"
            />
            Prueba Fron-End
          </Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
}
