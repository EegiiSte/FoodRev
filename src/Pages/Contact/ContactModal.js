import React from "react";
import Modal from "react-modal";
import ContactsPage from "./ContactPage";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  },
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.8)",
  },
};
function ContactModal(props) {
  const { openModal, closeModal } = props;
  return (
    <Modal isOpen={openModal} style={customStyles}>
      <div className="contactModalMainBox d-flex just-c align-c">
        <ContactsPage closeModal={closeModal} />
      </div>
    </Modal>
  );
}

export default ContactModal;
