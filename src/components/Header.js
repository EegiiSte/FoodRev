import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LogoDark from "../icons/DarkLogo";
import Logo from "../icons/Logo";

import { signOut } from "firebase/auth";
import { myAuthentication } from "../firebase/myFirebase";
import ContactsPage from "../Pages/Contacts/contactsPage";
import Modal from "react-modal";

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
  const handleContactsPage = () => {
    navigate("/contacts");
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
    <div
      style={{
        width: "100%",
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        height: "40px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "1080px",
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
              onClick={handleSignOut}
              style={{
                cursor: "pointer",
                color: props.darkLogo ? "#ffff" : "#6D7D8B",
              }}
            >
              Sign Out
            </div>
            <div
              style={{
                paddingLeft: "20px",
                cursor: "pointer",
                color: props.darkLogo ? "#ffff" : "#6D7D8B",
                fontSize: "14px",
              }}
            >
              Hello {props.user.email}
            </div>
          </div>
        ) : (
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                cursor: "pointer",
                color: props.darkLogo ? "#ffff" : "#6D7D8B",
              }}
            >
              Sign in
            </span>
          </div>
        )}
      </div>
      <Modal isOpen={openModal} style={customStyles}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "500px",
            height: "500px",
            backgroundcolor: "white",
            flexDirection: "column",
          }}
        >
          <ContactsPage />
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <button
              style={{
                width: "311px",
                height: "30px",
                border: "2px solid white",
                borderRadius: "5px",
                backgroundColor: "pink",
                marginBottom: "10px",
              }}
              onClick={closeModal}
            >
              Send It
            </button>
            <button
              style={{
                width: "311px",
                height: "30px",
                border: "2px solid white",
                borderRadius: "5px",
                backgroundColor: "pink",
                marginBottom: "10px",
              }}
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Header;
