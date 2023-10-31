import React from "react";

import HomeImageMeeting from "../../../images/Home-Meeting.png";
function Home2Teamwork() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "#F5F6FA",
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            position: "absolute",

            paddingTop: "0",
            width: "465px",
            height: "363px",
            top: "50px",
            left: " 140px",
          }}
        >
          <h1
            style={{
              Font: "Mulish",
              Weight: "800",
              fontSize: "48px",
              lineHeight: "60.24px",
            }}
          >
            Your Hub for teamwork
          </h1>
          <p
            style={{
              Font: "Mulish",
              Weight: "600",
              fontSize: "18px",
              lineHeight: "30px",
            }}
          >
            Give everyone you work with—inside and outside your company—a more
            productive way to stay in sync. Respond faster with emoji, keep
            conversations focused in channels, and simplify all your
            communication into one place.
          </p>
          <p
            style={{
              Font: "Mulish",
              Weight: "600",
              fontSize: "18px",
              lineHeight: "30px",
              color: "lightblue",
            }}
          >
            Learn more <p>-</p>
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            top: "30px",
            right: "0",
            paddingTop: "0",
          }}
        >
          <img src={HomeImageMeeting} height={"705px"} alt={{}} />
        </div>
      </div>
    </div>
  );
}

export default Home2Teamwork;
