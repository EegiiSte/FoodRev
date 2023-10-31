import React from "react";
import MaskGruopImage2 from "../../../images/Mask-group2.png";
import CalendarImage from "../../../images/calendar.jpg";
import CalendarImage2 from "../../../images/Rectangle 646.svg";
function Home4() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
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
            top: "10px",
            left: " 135px",
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
            Simple task management
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
            top: "0px",
            right: "127px",
          }}
        >
          <img src={MaskGruopImage2} height={"567px"} alt={{}} />
        </div>
        <div
          style={{
            position: "absolute",
            top: "82px",
            right: "370px",
          }}
        >
          <img src={CalendarImage2} width={"271px"} height={"303px"} alt={{}} />
        </div>
        <div
          style={{
            position: "absolute",
            top: "88px",
            right: "404px",
          }}
        >
          <img src={CalendarImage} width={"203px"} height={"289px"} alt={{}} />
        </div>
      </div>
    </div>
  );
}

export default Home4;
