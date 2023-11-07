import { updateDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  blogsCollection,
  commentCollection,
} from "../../../firebase/myFirebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditCommentModal(props) {
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

  const { openEditModal, selectedComment, closeEditModal } = props;
  const [inputValue, setInputValue] = useState();

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (selectedComment) {
      setInputValue(selectedComment.comment);
    }
  }, [selectedComment]);

  const handleCancelButton = () => {
    setInputValue(selectedComment);
    closeEditModal();
  };

  const handleSaveButton = async () => {
    await updateDoc(doc(commentCollection, selectedComment.commentId), {
      ...selectedComment,
      comment: inputValue,
    })
      .then((res) => {
        toast.success("Comment edited successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        closeEditModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal isOpen={openEditModal} style={customStyles}>
      <div className="marginTop10 borderR5 box-shadow-gray">
        <textarea
          className="borderR5 d-flex align-start"
          style={{
            width: "520px",
            overflow: "scroll",
          }}
          rows={5}
          value={inputValue}
          onChange={handleInput}
        ></textarea>
      </div>
      <div className="d-flex flex-direction-row gap-20 marginTop10 align-c just-c">
        <button
          style={{
            cursor: "pointer",
            width: "60px",
            height: "20px",
          }}
          onClick={handleSaveButton}
        >
          Save
        </button>
        <button
          style={{
            cursor: "pointer",
            width: "60px",
            height: "20px",
          }}
          onClick={handleCancelButton}
        >
          Cancel
        </button>
      </div>
      <ToastContainer />
    </Modal>
  );
}

export default EditCommentModal;
