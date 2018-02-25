import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Tutorial = ({ isOpen, onClose }) => {
  return (
      <Modal isOpen={isOpen} toggle={isOpen}>
        <ModalHeader toggle={isOpen}>How to play</ModalHeader>
        <ModalBody>
          <p>Click on the Maze Number to choose a mase, default is 1.</p>
          <p>Drag commands from the Command List to the Instruction List.</p>
          <p>Press Update to share the new commands to the App.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={onClose}>Got it!</Button>
        </ModalFooter>
      </Modal>
  );
};

export default Tutorial;