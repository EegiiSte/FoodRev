import React from "react";

import HomeImageMeeting from "../../../images/Home-Meeting.png";
function Home2Teamwork() {
  return (
    <div
    className="width-100pr height-100vh d-flex just-c position-rel"
    >
      <div
      className="width-100pr d-flex position-rel just-space-between "
        style={{
          backgroundColor: "#F5F6FA",
        }}
      >
        <div
        className="position-abs"
          style={{
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
        className="position-abs"
          style={{
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
