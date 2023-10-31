import { updateDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { blogsCollection } from "../../firebase/myFirebase";
import "./EditProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProduct(props) {
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
  const { openEditModal, selectedBlog, closeEditModal } = props;
  const [inputValueTitle, setInputValueTitle] = useState();
  const [inputValueText, setInputValueText] = useState();
  // console.log(selectedBlog);

  const handleInputTitle = (e) => {
    setInputValueTitle(e.target.value);
  };
  const handleInputText = (e) => {
    setInputValueText(e.target.value);
  };

  useEffect(() => {
    if (selectedBlog) {
      setInputValueTitle(selectedBlog.title);
      setInputValueText(selectedBlog.text);
    }
  }, [selectedBlog]);

  const handleCancelButton = () => {
    closeEditModal();
  };

  const handleSaveButton = async () => {
    await updateDoc(doc(blogsCollection, selectedBlog.blogId), {
      ...selectedBlog,
      text: inputValueText,
      title: inputValueTitle,
    })
      .then((res) => {
        closeEditModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal isOpen={openEditModal} style={customStyles}>
      <div
        style={{
          marginTop: "10px",

          borderRadius: "5px",
          boxShadow: "0px 0px 10px gray",
        }}
      >
        <textarea
          className="OverDisAlign"
          style={{
            borderRadius: "5px",
            width: "520px",
          }}
          rows={5}
          value={inputValueTitle}
          onChange={handleInputTitle}
        ></textarea>
        <textarea
          className="OverDisAlign"
          style={{
            borderRadius: "5px",
            width: "520px",
          }}
          rows={5}
          value={inputValueText}
          onChange={handleInputText}
        ></textarea>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          marginTop: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button className="buttonEditProduct" onClick={handleSaveButton}>
          Save
        </button>
        <button className="buttonEditProduct" onClick={handleCancelButton}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default EditProduct;
