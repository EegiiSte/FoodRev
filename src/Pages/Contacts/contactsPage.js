import React, { useState } from "react";

function ContactsPage(props) {
  return (
    <div>
      <div
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
          placeholder="Name"
          style={{
            width: "300px",
            height: "30px",
          }}
          type="text"
        ></input>
        <input
          placeholder="Email"
          style={{ width: "300px", height: "30px" }}
          type="text"
        ></input>
        <input
          placeholder="Message"
          style={{
            width: "300px",
            height: "200px",
          }}
          type="text"
        ></input>
      </div>
    </div>
  );
}

export default ContactsPage;
