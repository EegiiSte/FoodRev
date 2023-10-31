import { addDoc, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import Modal from "react-modal";
import { blogsCollection } from "../../firebase/myFirebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
function ModalCreateNewBlog(props) {
  const { openModal, closeModal, user } = props;
  const [formValues, setFormValues] = useState({
    title: "",
    text: "",
    image: "",
    stars: "",
  });
  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormValues({ ...formValues, [inputName]: inputValue });
  };

  const handleSubmitButton = async () => {
    await addDoc(blogsCollection, {
      title: formValues.title,
      text: formValues.text,
      userImage: user.photoURL,
      blogImage: formValues.image,
      userName: user.displayName,
      userId: user.uid,
      stars: formValues.stars,
    })
      .then((res) => {
        toast.success("Post created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setFormValues({ title: "", text: "", image: "", starts: "" });

        closeModal();
      })
      .catch((err) => {
        toast.warn("Post not created !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(err);
      });
  };

  return (
    <Modal isOpen={openModal} style={customStyles}>
      <div
        style={{
          width: "500px",
          height: "500px",
          backgroundcolor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "30px",
          padding: "10px",
        }}
      >
        <div
          style={{
            width: "80%",
            // border: "1px solid red",
            gap: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <label>Title</label>
          <input
            name="title"
            onChange={handleChange}
            placeholder="Enter your blog title here"
          ></input>
        </div>
        <div
          style={{
            width: "80%",
            // border: "1px solid green",
            gap: "10px",
            display: "flex",
            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <label>Stars</label>
          <input
            name="stars"
            onChange={handleChange}
            placeholder="stars"
            type="number"
          ></input>
        </div>
        <div
          style={{
            width: "80%",
            height: "50%",
            // border: "1px solid blue",
            gap: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label>Text</label>
          <input
            name="text"
            onChange={handleChange}
            placeholder="Enter your blog text here"
            style={{
              width: "80%",
              height: "80%",
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
            }}
          ></input>
        </div>
        <div
          style={{
            width: "80%",
            height: "10%",
            // border: "1px solid red",
            gap: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onClick={handleSubmitButton}
            style={{
              width: "30%",
              height: "70%",
              borderRadius: "7px",
              boxShadow: "0px 5px 10px gray",
            }}
          >
            Submit
          </button>
          <button
            onClick={closeModal}
            style={{
              width: "30%",
              height: "70%",
              borderRadius: "7px",
              boxShadow: "0px 5px 10px gray",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalCreateNewBlog;
