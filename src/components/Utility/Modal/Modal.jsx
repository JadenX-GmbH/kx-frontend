import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalExample = (props) => {
  const { closeModal, submitModal, buttonLabel, className, title } = props;

  const close = () => {
    closeModal(false);
  };

  return (
    <div>
      <Button color="danger" onClick={close}>
        {buttonLabel}
      </Button>
      <Modal size="lg" isOpen={true} fade={false} className={className} toggle={close}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
          <Button size="sm" color="primary" onClick={submitModal}>
            Update
          </Button>
          <Button size="sm" color="secondary" onClick={close}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
