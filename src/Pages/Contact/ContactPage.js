import { Button } from "antd";
import { addDoc, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/UserContext";
import { contactCollection } from "../../firebase/myFirebase";
import { LayoutMain } from "../../layout/LayoutMain";

function ContactPage(props) {
  const { closeModal } = props;
  const { user } = useUserContext();

  const [contactFormValues, setContactFormValues] = useState({
    name: user.displayName,
    email: user.email,
    message: "",
  });
  // console.log(contactFormValues);
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContactFormValues({ ...contactFormValues, [name]: value });
  };

  const handleSendIt = async () => {
    await addDoc(contactCollection, {
      name: contactFormValues.name,
      email: contactFormValues.email,
      message: contactFormValues.message,
      userImage: user.photoURL,
      timeStamp: serverTimestamp(),
      userName: user.displayName,
      userId: user.uid,
    })
      .then((res) => {
        toast.success("Your message sent!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setContactFormValues({ name: "", email: "", message: "" });
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <LayoutMain>
      <div
        className=" d-flex align-c flex-direction-c just-c"
        style={{ height: "calc(100vh - 64px - 60px)" }}
      >
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div style={{ fontSize: "20px" }}>Get In Touch</div>
          <div style={{ fontSize: "12px" }}>We're here for you </div>
          <input
            name="name"
            value={contactFormValues.name}
            onChange={handleInput}
            placeholder="Name"
            style={{
              width: "300px",
              height: "30px",
            }}
            type="text"
          />
          <input
            name="email"
            value={contactFormValues.email}
            onChange={handleInput}
            placeholder="Email"
            style={{ width: "300px", height: "30px" }}
            type="text"
          />
          <textarea
            rows={10}
            name="message"
            value={contactFormValues.message}
            onChange={handleInput}
            placeholder="Message"
            style={{
              width: "300px",
              height: "200px",
            }}
            type="text"
          ></textarea>
        </div>
        <div className="sendCancelButtonBox  d-flex just-c align-c">
          <Button
            type="primary"
            shape="around"
            className="sendButton"
            onClick={handleSendIt}
          >
            Send It
          </Button>
        </div>
      </div>
    </LayoutMain>
  );
}

export default ContactPage;
