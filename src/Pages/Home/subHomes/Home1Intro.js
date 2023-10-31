import React from "react";

import HomeImage from "../../../images/home-image.jpg";
import Header from "../../../components/Header";
function Home1Intro(props) {
  return (
    <div
      style={{
        backgroundImage: `url(${HomeImage})`,
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header user={props.user} darkLogo={true} />
      <div
        style={{
          width: "1080px",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            fonstStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            color: "white",
            paddingTop: "196px",
            width: "60%",
          }}
        >
          Instant collaborations for remote teams
        </div>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "700",
            fonstStyle: "normal",
            lineHeight: "normal",
            color: "white",
            paddingTop: "22px",
            width: "45%",
          }}
        >
          All in one for your remote team chats, collaboration and track
          projects
        </div>
        <div
          style={{
            paddingTop: "70px",
            gap: "15px",
          }}
        >
          <input
            style={{
              width: "317px",
              height: "56px",
            }}
            placeholder="email"
          ></input>
          <button
            style={{
              marginLeft: "15px",
              padding: "16px 20px",
              borderRadius: "4px",
              backgroundColor: "pink",
              transitionDuration: "0.4s",
              hover: {
                backgroundColor: "green" /* Green */,
                color: "white",
              },
              cursor: "pointer",
            }}
          >
            Get early access
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home1Intro;
