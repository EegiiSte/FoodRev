import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { myAuthentication } from "../../firebase/myFirebase";
import LogoDark from "../../icons/DarkLogo";
import Logo from "../../icons/Logo";
import ContactModal from "../../Pages/Contact/ContactModal";
import "./Header.css";
import SignOpenModal from "./SignOpenModal";

function Header(props) {
  const { user } = useUserContext();
  const { darkLogo } = props;
  const [openModal, setOpenModal] = useState(false);
  const isAdmin = user && user.email === "elektronjaal@gmail.com";

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

  const handleAdminPage = () => {
    navigate("/admin");
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
    { name: "Contacts", onClick: handleContactButton },
    { name: "Profile", onClick: handleProfilePage },
  ];

  return (
    <div className="headerMainBox d-just-c-align-c" style={{ display: "none" }}>
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
            {isAdmin && (
              <div
                className="cursorPointer"
                onClick={handleAdminPage}
                style={{
                  color: darkLogo ? "#ffff" : "#6D7D8B",
                }}
              >
                Admin
              </div>
            )}
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
      <ContactModal user={user} closeModal={closeModal} openModal={openModal} />
    </div>
  );
}

export default Header;
