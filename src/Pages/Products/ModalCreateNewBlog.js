import { addDoc, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import Modal from "react-modal";
import { blogsCollection, storage } from "../../firebase/myFirebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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
  const [file, setFile] = useState();
  const [formValues, setFormValues] = useState({
    title: "",
    text: "",
    image: "",
    file: "",
  });

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormValues({ ...formValues, [inputName]: inputValue });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(URL.createObjectURL(e.target.files[0]));
  };

  const uploadImage = async () => {
    const storageRef = ref(storage, file.name);
    const imageUrl = await uploadBytes(storageRef, file);
    const downloadImageUrl = await getDownloadURL(storageRef);

    return downloadImageUrl;
  };

  const handleSubmitButton = async () => {
    const imageUrl = await uploadImage();
    await addDoc(blogsCollection, {
      title: formValues.title,
      text: formValues.text,
      userImage: user.photoURL,
      blogImage: imageUrl,
      userName: user.displayName,
      userId: user.uid,
      file: formValues.file,
      stars: 0,
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
    // const imageUrl = uploadImage();
    // console.log(imageUrl);
  };

  return (
    <Modal isOpen={openModal} style={customStyles}>
      <div
        className="d-flex just-c align-c flex-direction-c gap-30 padding10"
        style={{
          width: "500px",
          height: "500px",
          backgroundcolor: "white",
        }}
      >
        <div
          className="gap-10 d-flex just-c"
          style={{
            width: "80%",
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
          className="gap-10 d-flex just-c align-c"
          style={{
            width: "80%",
          }}
        >
          <label>File</label>
          <input
            name="blogImage"
            onChange={handleFileChange}
            placeholder="choose file"
            type="file"
          ></input>
        </div>
        <div
          className="gap-10 d-flex just-c align-c"
          style={{
            width: "80%",
            height: "50%",
          }}
        >
          <label>Text</label>
          <textarea
            className="d-flex just-c align-c"
            rows={10}
            name="text"
            onChange={handleChange}
            placeholder="Enter your blog text here"
            style={{
              width: "80%",
              height: "80%",
            }}
          ></textarea>
        </div>
        <div
          className="d-flex just-c align-c"
          style={{
            width: "80%",
            height: "10%",
            gap: "10%",
          }}
        >
          <button
            className="borderR7 box-shadow-gray"
            onClick={handleSubmitButton}
            style={{
              width: "30%",
              height: "70%",
            }}
          >
            Submit
          </button>
          <button
            className="borderR7 box-shadow-gray"
            onClick={closeModal}
            style={{
              width: "30%",
              height: "70%",
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
