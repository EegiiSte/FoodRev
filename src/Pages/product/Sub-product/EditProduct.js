import { updateDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { blogsCollection, storage } from "../../../firebase/myFirebase";
import "./EditProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
  const { openEditModal, closeEditModal, blogData } = props;
  const [inputValueTitle, setInputValueTitle] = useState();
  const [inputValueText, setInputValueText] = useState();

  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const uploadImage = async () => {
    const storageRef = ref(storage, file.name);
    const downloadImageUrl = await getDownloadURL(storageRef);

    return downloadImageUrl;
  };

  const handleInputTitle = (e) => {
    setInputValueTitle(e.target.value);
  };
  const handleInputText = (e) => {
    setInputValueText(e.target.value);
  };

  useEffect(() => {
    if (blogData) {
      setInputValueTitle(blogData.title);
      setInputValueText(blogData.text);
    }
  }, [blogData]);

  const handleCancelButton = () => {
    closeEditModal();
  };

  const handleSaveButton = async () => {
    const imageUrl = await uploadImage();
    await updateDoc(doc(blogsCollection, blogData.blogId), {
      ...blogData,
      text: inputValueText,
      title: inputValueTitle,
      blogImage: imageUrl,
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
        className="d-flex flex-direction-c"
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
        <div>
          <img
            src={blogData.blogImage}
            alt={"blodDataImage"}
            width="200px"
            // height="150px"
          />
          <span>change to</span>
          <img
            // src={imageUrl}
            alt={"blodDataImage"}
            width="200px"
            // height="150px"
          />
        </div>
        <input
          name="blogImage"
          onChange={handleFileChange}
          placeholder="choose file"
          type="file"
        ></input>
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
