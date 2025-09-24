import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const onCloseModal = () => {
    console.log("Closing modal");
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1>Hi world</h1>
      <hr />
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing
        elit. Possimus, nulla accusantium voluptatem commodi
        quaerat amet est magni alias illo natus! Dolore dolor
        nobis iste! At quidem repudiandae sint eum sunt?
      </p>
    </Modal>
  );
};
