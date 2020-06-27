import React from "react";
import { Modal, Button } from "react-bootstrap";

//  REDUX
import { useDispatch, useSelector } from "react-redux";
import { openCloseModalAction } from "../actions/ModalActions";

export default function ModalComponent(props) {
  const { children } = props;

  const dispatch = useDispatch();
  const closeModal = (state) => dispatch(openCloseModalAction(state));
  const isOpen = useSelector((state) => state.modals.state_add_modal);

  return (
    <Modal
      show={isOpen}
      onHide={() => closeModal(false)}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Nuevo empleado</Modal.Title>
      </Modal.Header>
      {children}
    </Modal>
  );
}
