import React, { useState } from "react";
import ContactsPage from "../../Pages/Contacts/contactsPage";
import Modal from "react-modal";
import SignIn from "../../SignIn";
import { SignInMethod } from "firebase/auth";
import SignInModal from "./SignInModal";
import "../../Pages/product/comment/comment.css";
import SignUpModal from "./SignUpModal";
import "./SignOpenModal.css";

function SignOpenModal(props) {
  const { user, isUserLoggedIn, darkLogo } = props;

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

  const [openSignModal, setOpenSignModal] = useState(false);

  const [changeToSignUpSignIn, setChangeToSignUpSignIn] = useState(true);

  const handleChangeToSignUp = () => {
    setChangeToSignUpSignIn(false);
  };
  const handleChangeToSignIn = () => {
    setChangeToSignUpSignIn(true);
  };

  const closeSignModal = () => {
    console.log("end darj bnaaaa");
    setOpenSignModal(false);
  };
  const handleSignPage = () => {
    setOpenSignModal(true);
    // navigate("/sign-in");
  };

  return (
    <div style={{ cursor: "poiner" }}>
      <div onClick={handleSignPage}>Sign In</div>
      <Modal isOpen={openSignModal} style={customStyles}>
        <div className="toChangeModalBox  d-flex just-c align-c" style={{}}>
          {changeToSignUpSignIn ? (
            <div>
              <SignInModal user={user} />
            </div>
          ) : (
            <div>
              <SignUpModal user={user} />
            </div>
          )}

          <div className="signInSignUpBox  d-flex just-c" style={{}}>
            {changeToSignUpSignIn ? (
              <div className="footerBottomBox">
                <h6 className="notiwords"> Don't have an account</h6>
                <button className="footerToSign" onClick={handleChangeToSignUp}>
                  Sign up
                </button>
              </div>
            ) : (
              <div className="footerBottomBox">
                <h6 className="notiwords">Have an account</h6>
                <button className="footerToSign" onClick={handleChangeToSignIn}>
                  Sign In
                </button>
              </div>
            )}
          </div>
          <div className="cancelButtonBox d-flex just-c " style={{}}>
            <button className="cancelBotton borderR5" onClick={closeSignModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SignOpenModal;
