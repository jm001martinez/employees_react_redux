import React from "react";
import { Container, Navbar, Button } from "react-bootstrap";

import Logo from "../assets/img/logo.png";

//  REDUX
import { useDispatch } from "react-redux";
import { openCloseModalAction } from "../actions/ModalActions";

export default function Header() {
  // Dispatch actions
  const dispatch = useDispatch();
  const openCloseModal = (state) => dispatch(openCloseModalAction(state));
  const openModal = () => {
    openCloseModal(true);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
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
      </Container>
    </Navbar>
  );
}
