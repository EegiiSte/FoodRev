import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LogoDark from "../../icons/DarkLogo";
import Logo from "../../icons/Logo";
import { signOut } from "firebase/auth";
import { myAuthentication } from "../../firebase/myFirebase";
import ContactsPage from "../../Pages/Contacts/contactsPage";
import Modal from "react-modal";
import SignModal from "./SignOpenModal";
import SignOpenModal from "./SignOpenModal";
import "./Header.css";

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

function Header(props) {
  const { darkLogo, user, isUserLoggedIn } = props;
  const [openModal, setOpenModal] = useState(false);
  const handleContactButton = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const navigate = useNavigate();
  const handleHomePage = () => {
    navigate("/");
  };
  const handleProductsPage = () => {
    navigate("/products");
  };
  const handleServicesPage = () => {
    navigate("/services");
  };
  const handleContactPage = () => {
    setOpenModal(true);
    // navigate("/sign-in");
  };

  const handleProfilePage = () => {
    navigate("/profile");
  };

  const handleSignOut = async () => {
    await signOut(myAuthentication)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {});
  };

  const navbarItems = [
    { name: "Products", onClick: handleProductsPage },
    { name: "Services", onClick: handleServicesPage },
    { name: "Contacts", onClick: handleContactButton },
    { name: "Profile", onClick: handleProfilePage },
  ];

  return (
    <div className="headerMainBox d-just-c-align-c">
      <div className="headerSecondBox">
        <div>
          {props.darkLogo ? (
            <Logo
              onClick={handleHomePage}
              style={{
                cursor: "pointer",
              }}
            />
          ) : (
            <LogoDark
              onClick={handleHomePage}
              style={{
                cursor: "pointer",
              }}
            />
          )}
        </div>
        {props.user ? (
          <div className="navbarBox d-flex just-c align-c">
            {navbarItems.map((item) => {
              return (
                <span
                  style={{
                    cursor: "pointer",
                    color: props.darkLogo ? "#ffff" : "#6D7D8B",
                  }}
                  onClick={item.onClick}
                >
                  {item.name}
                </span>
              );
            })}
            <div
              className="cursorPointer"
              onClick={handleSignOut}
              style={{
                color: darkLogo ? "#ffff" : "#6D7D8B",
              }}
            >
              Sign Out
            </div>
            <div
              className="cursorPointer helloBox"
              style={{
                color: darkLogo ? "#ffff" : "#6D7D8B",
              }}
            >
              Hello {props.user.email}
            </div>
          </div>
        ) : (
          <div className="signInModalMainbox  d-flex align-c">
            <span
              style={{
                cursor: "pointer",
                color: props.darkLogo ? "#ffff" : "#6D7D8B",
              }}
            >
              <div
                style={{
                  cursor: "pointer",
                  color: props.darkLogo ? "#ffff" : "#6D7D8B",
                }}
              >
                <SignOpenModal user={user} darkLogo={darkLogo} />
              </div>
            </span>
          </div>
        )}
      </div>
      <Modal isOpen={openModal} style={customStyles}>
        <div className="contactModalMainBox d-flex just-c align-c">
          <ContactsPage />
          <div className="sendCancelButtonBox  d-flex just-c align-c">
            <button className="sendButton" onClick={closeModal}>
              Send It
            </button>
            <button className="cancelButton" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Header;
