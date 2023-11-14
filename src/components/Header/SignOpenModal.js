import React, { useEffect, useState } from "react";
import ContactsPage from "../../Pages/Contact/ContactPage";
import Modal from "react-modal";
import SignIn from "../../SignIn";
import { SignInMethod } from "firebase/auth";
import SignInModal from "./SignInModal";
import "../../Pages/Product/comment/comment.css";
import SignUpModal from "./SignUpModal";
import "./SignOpenModal.css";
import { Button } from "antd";
import { useUserContext } from "../../context/UserContext";
import { SignUpAntdModal } from "../../layout/SignUpAntdModal";

function SignOpenModal(props) {
  const { user, isUserLoggedIn, darkLogo } = props;
  const [signUpModalShow, setSignUpModalShow] = useState(false);

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
    // console.log("end darj bnaaaa");
    setOpenSignModal(false);
  };
  const handleSignPage = () => {
    setOpenSignModal(true);
    // navigate("/sign-in");
  };

  return (
    <div style={{ cursor: "poiner" }}>
      <div
        style={{
          color: "white",
        }}
        onClick={handleSignPage}
      >
        Sign In
      </div>
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

                <Button
                  className="footerToSign"
                  onClick={() => {
                    setSignUpModalShow(true);
                  }}
                  type={"primary"}
                >
                  Sign up
                </Button>
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
      <SignUpAntdModal
        signUpModalShow={signUpModalShow}
        onHide={() => {
          setSignUpModalShow(false);
        }}
      />
    </div>
  );
}

export default SignOpenModal;
