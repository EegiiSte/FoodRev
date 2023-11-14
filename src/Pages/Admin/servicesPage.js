import React from "react";
import Header from "../../components/Header/Header";

function ServicesPage(props) {
  return (
    <div
      className="d-flex just-start flex-direction-c align-c"
      style={{
        backgroundImage: "#F5F6FA",
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
      }}
    >
      <Header user={props.user} />
      ServicesPage
    </div>
  );
}

export default ServicesPage;
